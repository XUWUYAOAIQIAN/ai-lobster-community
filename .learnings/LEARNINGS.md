# Learnings Log

此文件记录从错误、纠正和改进中学到的经验。

---

## [LRN-20260330-001] initial_audit

**Logged**: 2026-03-30T22:43:50Z
**Priority**: high
**Status**: in_progress
**Area**: frontend, testing

### Summary
对 AI龙虾社区网站进行全面自查测试，发现真实存在的问题

### Details
用户要求不要任何吹捧，实打实解决问题。需要使用 agent-browser 实际测试网站的各个功能和页面。

### Suggested Action
使用 agent-browser 全面测试以下方面：
1. 所有页面是否能正常访问和渲染
2. 所有按钮和交互是否正常工作
3. 移动端响应式是否正常
4. 数据加载和状态管理是否正确
5. 表单验证和错误处理是否有效
6. 动画和过渡效果是否流畅
7. 兼容性问题

### Metadata
- Source: user_feedback
- Related Files: index.html
- Tags: testing, qa, audit

### Resolution
- **Resolved**: 2026-03-30T22:50:00Z
- **Notes**: 完成全面测试，发现以下问题需要修复

---

## [ERR-20260330-001] login_password_validation

**Logged**: 2026-03-30T22:47:00Z
**Priority**: high
**Status**: pending
**Area**: frontend, validation

### Summary
登录表单密码验证失败，密码少于6位时没有显示错误提示

### Error
```
测试输入 6 位密码 "test123"，应该通过验证
测试输入 5 位密码 "test12"，应该显示错误但实际没有
检查 document.getElementById('password-error') 显示为空
```

### Context
- 登录模态框：#auth-modal
- 密码输入框：#auth-password
- 错误提示元素：#password-error
- handleAuth() 函数中有验证逻辑：if(password.length < 6)

### Root Cause
验证逻辑执行了，但错误提示元素的文本内容为空，可能是：
1. 元素选择器错误
2. 错误提示逻辑中的赋值语句有问题
3. CSS 样式导致元素不可见

### Suggested Fix
检查 handleAuth() 函数中密码验证部分的代码：
```javascript
if(password.length < 6) {
  document.getElementById('password-error').textContent = '密码至少需要6位';
  return;
}
```
验证元素ID是否正确，以及错误提示元素是否有 CSS display:none

### Metadata
- Reproducible: yes
- Related Files: index.html
- Priority: high - 影响用户体验

---

## [ERR-20260330-002] mobile_search_visible

**Logged**: 2026-03-30T22:49:00Z
**Priority**: low
**Status**: pending
**Area**: frontend, responsive

### Summary
移动端视图中搜索框仍然显示，应该隐藏

### Error
```
viewport: 375x812
.nav-search 显示为 block，应该为 none
```

### Context
- CSS 响应式断点：@media (max-width: 768px)
- 期望行为：搜索框隐藏，显示移动端菜单按钮

### Root Cause
CSS 媒体查询规则可能没有正确设置或优先级问题

### Suggested Fix
检查 CSS 中的响应式规则：
```css
@media (max-width: 768px) {
  .nav-search { display: none; }
}
```
确认优先级和特异性是否正确

### Metadata
- Reproducible: yes
- Related Files: index.html
- Priority: low - 不影响核心功能，但影响用户体验

---

## [LRN-20260330-002] openclaw_install_steps_hidden

**Logged**: 2026-03-30T22:48:00Z
**Priority**: medium
**Status**: pending
**Area**: frontend, logic

### Summary
OpenClaw 页面中，安装步骤默认隐藏，需要点击"开始检测"后才会显示

### Details
用户访问 OpenClaw 页面时：
- 环境检测步骤可见
- 安装步骤默认隐藏（display: none）
- 配置步骤默认隐藏（display: none）

这种设计符合预期（渐进式展示），但可能让用户困惑

### Suggested Action
考虑添加一个提示或引导，告诉用户需要先进行环境检测：
```html
<div class="hint">请先完成环境检测，然后继续安装</div>
```
或者默认显示所有步骤但禁用未激活的步骤

### Metadata
- Source: testing
- Related Files: index.html (#openclaw-section)
- Priority: medium - 改进用户体验

---

## [LRN-20260330-003] page_scrolling_not_smoothing

**Logged**: 2026-03-30T22:50:00Z
**Priority**: low
**Status**: pending
**Area**: frontend, ux

### Summary
页面切换时的滚动行为不够平滑

### Details
setPage() 函数中使用了：
```javascript
window.scrollTo({ top: 0, behavior: 'smooth' });
```
但在某些浏览器中可能不支持 smooth 滚动，或者滚动距离太短感觉不到效果

### Suggested Action
添加更多视觉反馈，或者在页面顶部添加"回到顶部"按钮

### Metadata
- Source: testing
- Related Files: index.html
- Priority: low - 体验优化

---

## [LRN-20260330-004] toast_animation_not_complete

**Logged**: 2026-03-30T22:50:00Z
**Priority**: low
**Status**: pending
Area: frontend, animation

### Summary
Toast 消息的退出动画（slideOut）可能在实际使用中不够明显

### Details
CSS 定义了 slideOut 动画，但：
1. 动画时间只有 0.3 秒，可能太快
2. Toast 容器没有限制高度，可能导致布局问题
3. 多个 Toast 同时出现时会重叠

### Suggested Action
考虑：
1. 增加 Toast 动画时间到 0.5 秒
2. 限制 Toast 容器最大高度
3. 为 Toast 添加堆叠效果
4. 添加 Toast 队列管理

### Metadata
- Source: testing
- Related Files: index.html
- Priority: low - 体验优化

---

## [LRN-20260330-005] search_function_mock_only

**Logged**: 2026-03-30T22:50:00Z
**Priority**: medium
**Status**: pending
Area: frontend, feature

### Summary
搜索功能只显示提示"正在搜索: xxx"，没有实际搜索结果展示

### Details
performSearch() 函数目前只显示 Toast，没有实际的搜索逻辑：
```javascript
function performSearch(query) {
  showToast('正在搜索: ' + query, 'info');
  // 实际搜索逻辑可以在这里实现
}
```

### Suggested Action
添加真实的搜索功能：
1. 从 mockData 中搜索匹配的标题和描述
2. 显示搜索结果页面
3. 支持按类型过滤（Skills/帖子/课程）
4. 添加搜索历史

### Metadata
- Source: testing
- Related Files: index.html
- performSearch()
- Priority: medium - 功能不完整

---

## [LRN-20260330-006] create_skill_function_missing

**Logged**: 2026-03-30T22:50:00
**Priority**: medium
**Status**: pending
Area: frontend, feature

### Summary
"创建 Skill" 功能只显示"功能开发中"提示，没有实际实现

### Details
showCreateSkillModal() 函数：
```javascript
function showCreateSkillModal() {
  showToast('创建 Skill 功能开发中...', 'warning');
}
```

### Suggested Action
实现创建 Skill 功能：
1. 创建 Skill 模态框
2. 表单：标题、描述、图标、标签
3. 提交后添加到 mockData.skills
4. 刷新 Skills 页面显示

### Metadata
- Source: testing
- Related Files: index.html, showCreateSkillModal()
- Priority: medium - 功能不完整

---

## [LRN-20260330-007] openclaw_dashboard_not_accessible

**Logged**: 2026-20260330T22:49:00Z
**Priority**: medium
Status: pending
Area: frontend, logic

### Summary
OpenClaw 配置面板页面（#openclaw-dashboard-section）无法直接访问

### Details
尝试通过 setPage('openclaw-dashboard') 访问时失败：
- setPage() 函数中只有 5 个页面：home, skills, forum, learn, profile
- OpenClaw 相关页面（openclaw, openclaw-dashboard）未在导航中

### Root Cause
setPage() 函数中没有 openclaw 和 openclaw-dashboard 的处理逻辑

### Suggested Fix
在 setPage() 函数中添加 OpenClaw 页面的切换逻辑：
```javascript
// OpenClaw 相关页面
if(page === 'openclaw') {
  // 根据安装状态显示向导或面板
  if(localStorage.getItem('openclaw_installed') === 'true') {
    page = 'openclaw-dashboard';
  }
}
```

### Metadata
- Source: testing
- Related Files: index.html, setPage()
- Priority: medium - 功能受限

---

## [LRN-20260330-008] mock_data_hardcoded

**Logged**: 2026-03-30T22:50:00Z
**Priority**: low
**Status**: pending
Area: frontend, architecture

### Summary
所有数据都是硬编码在 mockData 对象中，无法真实持久化

### Details
Skills、帖子、课程、通知等数据都在 JavaScript 中硬编码：
```javascript
const mockData = {
  skills: [...],
  posts: [...],
  courses: [...],
  notifications: [...]
};
```

### Suggested Action
为真实部署准备：
1. 设计后端 API 接口规范
2. 实现数据加载函数（fetch 替代硬编码）
3. 添加错误处理和加载状态
4. 实现本地缓存策略

### Metadata
- Source: testing
- Related Files: index.html, mockData
- Priority: low - 架构改进
