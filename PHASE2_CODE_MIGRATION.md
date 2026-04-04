# 龙虾社区后端化 — 阶段 2：前端对接

> 依赖：阶段 1 完成（Supabase 项目已创建，Keys 已获取）
> 本文件：完整的代码改造方案，由 AI Agent 执行

---

## 📊 localStorage 数据 → Supabase 表映射

| localStorage Key | Supabase 表 | 备注 |
|-----------------|------------|------|
| `lobster_users` | `profiles` | 用户资料（对应 auth.users） |
| `sessionStorage lobster_user` | Supabase Auth | 会话状态 |
| `forum_posts` | `posts` + `profiles` JOIN | 帖子 |
| `liked_posts` | `post_likes` | 独立 likes 表 |
| `user_course_progress` | `course_progress` | 学习进度 |
| `completed_courses` | `course_progress` | 同上（字段区分） |
| `notifications` | `notifications` | 通知 |
| `installed_skills` | `user_skills` | 用户安装的技能 |
| `theme` | `localStorage` | 保留（无迁移必要） |
| `openclaw_installed` | `localStorage` | 保留（无迁移必要） |

---

## 🗄️ 补充表结构

### post_likes（点赞表）

```sql
CREATE TABLE post_likes (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);
```

### notifications（通知表）

```sql
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,  -- 'like' | 'comment' | 'system' | 'achievement'
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### user_skills（用户技能表）

```sql
CREATE TABLE user_skills (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
  installed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, skill_id)
);
```

---

## 📝 需要在 Supabase Dashboard 执行的 SQL

在 **SQL Editor** 中依次执行：

```sql
-- ========== profiles 表 ==========
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar TEXT DEFAULT '🧑‍💻',
  bio TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles viewable by owner" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Profiles updatable by owner" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- ========== skills 表 ==========
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  tags TEXT[],
  author TEXT DEFAULT 'Community',
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 5.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS：公开读取
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Skills are public" ON skills FOR SELECT USING (true);
CREATE POLICY "Skills insert" ON skills FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ========== posts 表 ==========
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts are public" ON posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can post" ON posts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update own posts" ON posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON posts FOR DELETE USING (auth.uid() = user_id);

-- ========== comments 表 ==========
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comments are public" ON comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can comment" ON comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- ========== post_likes 表 ==========
CREATE TABLE post_likes (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Likes are public" ON post_likes FOR SELECT USING (true);
CREATE POLICY "Users can like" ON post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON post_likes FOR DELETE USING (auth.uid() = user_id);

-- ========== notifications 表 ==========
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- ========== course_progress 表 ==========
CREATE TABLE course_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL,
  progress INTEGER DEFAULT 0,
  current_chapter INTEGER DEFAULT 1,
  total_duration INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  last_study_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own progress" ON course_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own progress" ON course_progress FOR ALL USING (auth.uid() = user_id);

-- ========== user_skills 表 ==========
CREATE TABLE user_skills (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
  installed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, skill_id)
);

ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own skills" ON user_skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own skills" ON user_skills FOR ALL USING (auth.uid() = user_id);

-- ========== 自动创建 profile 的 trigger ==========
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========== 初始化示例 skills 数据 ==========
INSERT INTO skills (name, description, icon, tags, author, downloads, rating) VALUES
('OpenClaw Skills', 'OpenClaw 技能市场，发现和使用 AI 助手扩展能力', '🛠️', ARRAY['openclaw', 'ai', '工具'], 'OpenClaw', 1250, 4.8),
('Feishu Calendar', '飞书日历集成，在对话中管理日程和会议', '📅', ARRAY['feishu', '日历', '日历'], 'OpenClaw', 890, 4.6),
('Browser Automation', '浏览器自动化，AI 操控网页和表单', '🌐', ARRAY['browser', '自动化', '网页'], 'OpenClaw', 760, 4.7),
('Web Search', '网络搜索，获取实时信息和最新资讯', '🔍', ARRAY['search', 'web', '信息'], 'OpenClaw', 1100, 4.5);
```

---

## 🎨 前端改造代码

### 1. 添加 Supabase SDK（HTML 中添加）

在 `</body>` 前添加：

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
// ========== Supabase 初始化 ==========
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
</script>
```

### 2. Auth 辅助函数

```javascript
// ========== Auth 函数 ==========

// 注册
async function signUp(email, password, username) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } }
  });
  return { data, error };
}

// 登录
async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) return { error };
  
  // 获取用户 profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();
  
  // 保存到 sessionStorage
  sessionStorage.setItem('lobster_user', JSON.stringify({
    id: data.user.id,
    username: profile.username,
    email: profile.email,
    avatar: profile.avatar || '🧑‍💻'
  }));
  
  return { data, profile };
}

// 登出
async function signOut() {
  await supabase.auth.signOut();
  sessionStorage.removeItem('lobster_user');
  showSection('home');
  updateHeaderAuth();
}

// 监听登录状态变化
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    loadUserProfile(session.user.id);
  } else {
    sessionStorage.removeItem('lobster_user');
  }
});
```

### 3. 数据操作函数

```javascript
// ========== 数据操作函数 ==========

// 获取帖子列表
async function loadPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (username, avatar),
      post_likes (user_id)
    `)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('加载帖子失败:', error);
    return [];
  }
  
  return data.map(post => ({
    ...post,
    author: post.profiles?.username || '匿名用户',
    avatar: post.profiles?.avatar || '👤',
    comments: [],
    likes: post.likes_count || 0,
    replies: post.comments_count || 0,
    isLiked: post.post_likes?.some(p => p.user_id === getCurrentUserId())
  }));
}

// 发帖
async function createPost(title, content) {
  const userId = getCurrentUserId();
  if (!userId) { alert('请先登录'); return false; }
  
  const { error } = await supabase
    .from('posts')
    .insert({ user_id: userId, title, content });
  
  if (!error) {
    await loadPosts();
    closeCreatePost();
    return true;
  }
  alert('发帖失败: ' + error.message);
  return false;
}

// 点赞/取消点赞
async function toggleLike(postId) {
  const userId = getCurrentUserId();
  if (!userId) { alert('请先登录'); return false; }
  
  const { data: existing } = await supabase
    .from('post_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .single();
  
  if (existing) {
    // 取消点赞
    await supabase.from('post_likes').delete().eq('id', existing.id);
    await supabase.from('posts').update({ likes_count: supabase.sql`likes_count - 1` }).eq('id', postId);
  } else {
    // 点赞
    await supabase.from('post_likes').insert({ post_id: postId, user_id: userId });
    await supabase.from('posts').update({ likes_count: supabase.sql`likes_count + 1` }).eq('id', postId);
  }
  
  await loadPosts();
}

// 评论
async function addComment(postId, content) {
  const userId = getCurrentUserId();
  if (!userId) { alert('请先登录'); return false; }
  
  await supabase.from('comments').insert({
    post_id: postId,
    user_id: userId,
    content
  });
  
  // 更新评论数
  await supabase.from('posts').update({
    comments_count: supabase.sql`comments_count + 1`
  }).eq('id', postId);
  
  await showPostDetail(postId);
}

// 学习进度保存
async function saveCourseProgress(courseId, progress, currentChapter) {
  const userId = getCurrentUserId();
  if (!userId) return;
  
  await supabase.from('course_progress').upsert({
    user_id: userId,
    course_id: courseId,
    progress,
    current_chapter: currentChapter,
    last_study_at: new Date().toISOString(),
    completed_at: progress >= 100 ? new Date().toISOString() : null
  }, {
    onConflict: 'user_id,course_id'
  });
}
```

---

## ⚠️ 注意事项

1. **分步实施**: 先改造 Auth → 再改造帖子/点赞 → 最后改造学习进度
2. **保留 localStorage 兜底**: 初期可保留 localStorage 作为"离线模式"，Supabase 失败时降级
3. **实时订阅**: 可在帖子列表页加 `supabase.channel()` 实时监听新帖子（可选功能）
4. **种子数据**: skills 表需要先插入示例数据（见上方 SQL）

---

## ✅ 迁移检查清单

阶段 2 完成后逐一确认：

- [ ] `</body>` 前添加 Supabase SDK
- [ ] 替换 `signUp()` / `signIn()` / `signOut()` 函数
- [ ] Auth 状态监听生效
- [ ] `loadPosts()` 从 Supabase 读取
- [ ] `createPost()` 写入 Supabase
- [ ] `toggleLike()` 读写 Supabase likes 表
- [ ] `addComment()` 写入 Supabase
- [ ] `saveCourseProgress()` 写入 Supabase
- [ ] 旧 localStorage 数据保留（可选迁移脚本）
- [ ] GitHub Pages 测试通过

---

*本文件是完整代码改造方案，阶段 1 完成后由 AI Agent 执行*
