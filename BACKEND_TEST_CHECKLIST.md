# 后端化测试清单

> 2026-04-04 测试龙虾社区后端化功能
> Supabase Project: https://kzcyyttbncxsflosjcyu.supabase.co

---

## 📋 测试前准备

### 1. 确认 Supabase 项目正常

访问：https://kzcyyttbncxsflosjcyu.supabase.co

检查以下内容：
- [ ] 项目状态显示为 **Active**
- [ ] **Authentication** → **Users** 页面（初始应为空）
- [ ] **Table Editor** 中有这些表：
  - `profiles`（用户资料）
  - `posts`（帖子）
  - `post_likes`（点赞）
  - `comments`（评论）
  - `course_progress`（学习进度）
  - `skills`（技能示例数据）

### 2. 访问 GitHub Pages

访问：https://xuwuyaoaiqian.github.io/ai-lobster-community/

---

## 🧪 测试步骤

### 测试 1：注册新账号

| 步骤 | 操作 | 预期结果 | Supabase 验证 |
|------|------|---------|---------------|
| 1.1 | 点击导航栏的 🔑 按钮 | 打开登录弹窗 | - |
| 1.2 | 切换到"注册"标签 | 显示注册表单 | - |
| 1.3 | 填写：用户名、邮箱、密码 | 表单验证通过 | - |
| 1.4 | 点击"注册"按钮 | 显示"注册成功！请登录" | 查看 `Authentication` → `Users`，应出现新用户 |
| 1.5 | 切换回"登录"标签 | 显示登录表单 | - |
| 1.6 | 输入邮箱和密码 | - | - |
| 1.7 | 点击"登录"按钮 | 显示"登录成功！欢迎回来" | 查看 `profiles` 表，应自动创建 profile |

**✅ 成功标志**：
- 用户出现在 `auth.users` 表
- Profile 自动创建在 `profiles` 表
- 导航栏显示用户头像和用户名

---

### 测试 2：发帖

| 步骤 | 操作 | 预期结果 | Supabase 验证 |
|------|------|---------|---------------|
| 2.1 | 切换到"论坛"页面 | 显示帖子列表 | - |
| 2.2 | 点击"发表新帖"按钮 | 打开发帖弹窗 | - |
| 2.3 | 填写标题和内容 | - | - |
| 2.4 | 点击"发表"按钮 | 显示"帖子发表成功！" | 查看 `posts` 表，应出现新帖子 |

**✅ 成功标志**：
- 帖子出现在论坛列表
- 帖子作者显示你的用户名和头像
- `posts` 表中有新记录

---

### 测试 3：点赞

| 步骤 | 操作 | 预期结果 | Supabase 验证 |
|------|------|---------|---------------|
| 3.1 | 点击帖子的 👍 按钮 | 按钮变为 ❤️，点赞数+1 | 查看 `post_likes` 表，应有一条记录 |
| 3.2 | 再次点击（取消点赞） | 按钮变回 👍，点赞数-1 | 查看 `post_likes` 表，记录应消失 |

**✅ 成功标志**：
- 点赞按钮状态实时切换
- `post_likes` 表中有记录（点赞时）或无记录（取消时）
- `posts` 表的 `likes_count` 字段同步更新

---

### 测试 4：发表评论

| 步骤 | 操作 | 预期结果 | Supabase 验证 |
|------|------|---------|---------------|
| 4.1 | 点击帖子进入详情 | 显示帖子详情和评论区 | - |
| 4.2 | 在评论框输入内容 | - | - |
| 4.3 | 点击"发表评论" | 显示"评论发表成功！" | 查看 `comments` 表，应出现新评论 |

**✅ 成功标志**：
- 评论立即出现在帖子详情页
- 评论显示你的用户名和头像
- `comments` 表中有新记录
- 帖子评论数 +1

---

### 测试 5：学习课程

| 步骤 | 操作 | 预期结果 | Supabase 验证 |
|------|------|---------|---------------|
| 5.1 | 切换到"学院"页面 | 显示课程列表 | - |
| 5.2 | 点击任意课程 | 打开课程详情 | - |
| 5.3 | 点击"开始学习" | 显示"学习开始！" | 查看 `course_progress` 表，应创建新记录 |
| 5.4 | 再次进入课程详情 | 显示"继续学习"按钮 | 查看 `course_progress` 表，`progress` 应为 10 |
| 5.5 | 点击"继续学习"多次 | 进度每次 +10 | 查看 `course_progress` 表，`progress` 逐渐增加 |
| 5.6 | 直到进度达到 100% | 显示"课程完成！" | 查看 `course_progress` 表，`completed_at` 字段有值 |

**✅ 成功标志**：
- 课程进度实时保存
- 刷新页面进度不丢失
- 完成后可以重新学习

---

### 测试 6：多设备登录（可选）

| 步骤 | 操作 | 预期结果 |
|------|------|---------|
| 6.1 | 在浏览器 A 登录 | 显示登录状态 |
| 6.2 | 在浏览器 B（或另一个标签）用同一账号登录 | 两个浏览器都显示登录状态 |
| 6.3 | 在浏览器 A 发帖 | 帖子在浏览器 B 也能看到 |
| 6.4 | 在浏览器 A 学习课程 | 进度在浏览器 B 也能看到 |

**✅ 成功标志**：
- 数据在多个设备间同步
- 任何设备的数据变更都实时反映

---

## 🔍 常见问题排查

### 问题 1：注册失败，显示"该邮箱已被注册"

**可能原因**：邮箱已注册过

**解决方案**：
- 在 Supabase Dashboard 的 `Authentication` → `Users` 中删除该用户
- 或使用新邮箱注册

---

### 问题 2：登录后显示"用户资料加载失败"

**可能原因**：Profile 表未自动创建

**解决方案**：
```sql
-- 在 Supabase SQL Editor 中执行
INSERT INTO profiles (id, username, email)
SELECT id, email, email
FROM auth.users
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE profiles.id = auth.users.id
);
```

---

### 问题 3：发帖失败，显示错误信息

**可能原因**：
1. 未登录
2. 表格字段名不匹配
3. RLS 策略配置错误

**解决方案**：
1. 确认已登录
2. 检查 Supabase 的 `posts` 表字段名是否为：`id, user_id, title, content, likes_count, comments_count, created_at`
3. 检查 RLS 策略是否正确配置

---

### 问题 4：点赞数不更新

**可能原因**：SQL 原子更新语法错误

**解决方案**：
确认 Supabase 版本支持 `supabase.sql` 语法，或改用：
```javascript
// 方案 1：先读取再更新
const { data } = await supabase.from('posts').select('likes_count').eq('id', postId).single();
await supabase.from('posts').update({ likes_count: data.likes_count + 1 }).eq('id', postId);

// 方案 2：使用 RPC（自定义函数）
// 在 SQL Editor 中创建：
CREATE OR REPLACE FUNCTION increment_likes(post_id INTEGER) RETURNS void AS $$
BEGIN
  UPDATE posts SET likes_count = likes_count + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

// 在代码中调用：
await supabase.rpc('increment_likes', { post_id: postId });
```

---

### 问题 5：课程进度不保存

**可能原因**：`onConflict` 配置错误

**解决方案**：
确认 Supabase 表定义中有 `UNIQUE(user_id, course_id)` 约束

---

## 📊 测试结果记录

| 测试项 | 结果 | 问题描述 |
|--------|------|---------|
| 注册 | ⬜ 待测 | - |
| 登录 | ⬜ 待测 | - |
| 发帖 | ⬜ 待测 | - |
| 点赞 | ⬜ 待测 | - |
| 评论 | ⬜ 待测 | - |
| 学习课程 | ⬜ 待测 | - |
| 多设备同步 | ⬜ 待测 | - |

---

## ✅ 测试完成后

完成所有测试后：
1. 将上表的"⬜ 待测"改为"✅ 通过"或"❌ 失败"
2. 如有失败，在"问题描述"中记录详细错误
3. 将结果反馈给我，我会帮你修复问题

---

*测试日期：2026-04-04*
*测试人员：吾屿老徐*
