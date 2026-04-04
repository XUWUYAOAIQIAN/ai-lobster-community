# 龙虾社区后端化 — 阶段 1：数据建模

> 2026-04-04 开始实施
> 本阶段目标：完成 Supabase 项目创建 + 数据库表设计

---

## 🎯 阶段目标

- [ ] 创建 Supabase 项目
- [ ] 创建 6 张核心数据表
- [ ] 配置 Auth（邮箱登录）
- [ ] 配置 RLS（行级安全策略）
- [ ] 获取 API Keys

---

## 📋 你需要做的事（10 分钟）

### Step 1: 注册 Supabase

1. 打开 https://supabase.com
2. 点击 "Start your project"
3. 用 **GitHub 账号登录**（最快，推荐）
4. 或用邮箱注册

### Step 2: 创建新项目

1. 点击 "New Project"
2. 填写：
   - **Organization**: 选择你的 GitHub Organization 或 Personal
   - **Name**: `ai-lobster-community`（或你喜欢的名字）
   - **Database Password**: 生成一个强密码，**保存好**
   - **Region**: 选择离中国最近的 `Northeast Asia (Tokyo)` 或 `Southeast Asia (Singapore)`
3. 点击 "Create new project"
4. ⏳ 等待 2 分钟，项目创建完成

### Step 3: 获取 API Keys

1. 进入项目 Dashboard
2. 点击左侧 **Settings** → **API**
3. 找到以下信息，**复制保存**：

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...（一大串）
```

⚠️ **anon key 是公开的，可以放在前端代码中**
⚠️ **service role key 是私密的，不要暴露**

### Step 4: 开启 Email 登录

1. 点击左侧 **Authentication** → **Providers**
2. 找到 **Email**，点击启用
3. 确认以下设置：
   - ✅ Enable Email Signup
   - ✅ Enable Email Confirmations（可选，开启邮箱验证更安全）

---

## 🗄️ 数据库表设计

项目创建好后，我来帮你创建以下 6 张表：

### 1. users（用户表）

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT DEFAULT '🧑‍💻',
  bio TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. skills（技能表）

```sql
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
```

### 3. posts（帖子表）

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. comments（评论表）

```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5. course_progress（学习进度表）

```sql
CREATE TABLE course_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL,
  progress INTEGER DEFAULT 0,
  current_chapter INTEGER DEFAULT 1,
  last_study_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);
```

### 6. achievements（成就表）

```sql
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);
```

---

## 🔐 RLS 安全策略

每张表需要配置行级安全（RLS），确保用户只能操作自己的数据：

### users 表
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 任何人都可以创建账号
CREATE POLICY "Anyone can sign up" ON users FOR INSERT WITH CHECK (true);

-- 用户只能查看自己的 profile
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);

-- 用户只能更新自己的 profile
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
```

### posts 表
```sql
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 登录用户可以发帖
CREATE POLICY "Logged in users can create posts" ON posts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 任何人都可以查看帖子
CREATE POLICY "Anyone can view posts" ON posts FOR SELECT USING (true);

-- 用户只能修改自己的帖子
CREATE POLICY "Users can update own posts" ON posts FOR UPDATE USING (auth.uid() = user_id);

-- 用户只能删除自己的帖子
CREATE POLICY "Users can delete own posts" ON posts FOR DELETE USING (auth.uid() = user_id);
```

（comments / course_progress / achievements 的 RLS 类似）

---

## ⏭️ 完成后

完成以上步骤后告诉我：
1. ✅ Supabase 项目已创建
2. ✅ Project URL 和 anon key 已保存
3. ✅ Email 登录已开启

然后我进入 **阶段 2：前端对接**，帮你完成代码改造。

---

*阶段 1 由老徐手动操作（Supabase Dashboard）*
*阶段 2 由 AI Agent 完成代码改造*
