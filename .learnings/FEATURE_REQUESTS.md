# Feature Requests

此文件记录用户请求的缺失功能。

---

## [FEAT-20260330-001] real_search_results_display

**Logged**: 2026-03-30T22:50:00Z
**Priority**: medium
**Status**: pending
**Area**: frontend, feature

### Requested Capability
搜索功能应该显示真实的搜索结果，而不仅仅是一个提示

### User Context
用户在搜索框输入关键词后，希望看到匹配的 Skills、帖子或课程，而不是只看到"正在搜索"的提示

### Complexity Estimate
medium

### Suggested Implementation
1. 创建搜索结果容器（#search-results）
2. 修改 performSearch() 函数：
   ```javascript
   function performSearch(query) {
     showToast('正在搜索: ' + query, 'info');
     
     // 搜索 mockData
     const results = [];
     
     // 搜索 Skills
     mockData.skills.forEach(skill => {
       if(skill.title.includes(query) || skill.desc.includes(query)) {
         results.push({ type: 'skill', ...skill });
       }
     });
     
     // 搜索帖子
     mockData.posts.forEach(post => {
       if(post.title.includes(query) || post.content.includes(query)) {
         results.push({ type: 'post', ...post });
       }
     });
     
     // 搜索课程
     mockData.courses.forEach(course => {
       if(course.title.includes(query) || course.desc.includes(query)) {
         results.push({ type: 'course', ...course });
       }
     });
     
     // 显示结果
     displaySearchResults(results);
   }
   ```
3. 添加 displaySearchResults() 函数渲染结果
4. 添加空状态处理
5. 添加高亮匹配关键词

### Metadata
- Frequency: recurring
- Related Features: search input, filtering

---

## [FEAT-20260330-002] create_skill_ui

**Logged**: 2026-03-30T22:50:00Z
**Priority**: medium
**Status**: pending
**Area**: frontend, feature

### Requested Capability
用户希望能够创建新的 Skill

### User Context
用户点击"创建 Skill"按钮时，显示"功能开发中"提示，但实际上需要一个创建 Skill 的功能

### Complexity Estimate
medium

### Suggested Implementation
1. 创建 Skill 创建模态框（#create-skill-modal）
2. 添加表单字段：
   - Skill 名称
   - Skill 图标（emoji 选择）
   - Skill 描述
   - 技能标签
3. 实现表单验证
4. 提交后添加到 mockData.skills
5. 刷新 Skills 页面显示

### Metadata
- Frequency: first_time
- Related Features: Skills 市场

---

## [FEAT-20260330-003] user_profile_edit

**Logged**: 2026-03-30T22:50:00Z
**Priority**: low
**Status**: pending
Area: frontend, feature

### Requested Capability
用户工作台中的"编辑资料"和"修改密码"功能未实现

### User Context
工作台页面显示"编辑资料"和"修改密码"按钮，但点击后只显示"功能开发中"提示

### Complexity Estimate
medium

### Suggested Implementation
1. 实现编辑资料模态框
2. 实现修改密码模态框
3. 表单验证
4. 更新 currentUser 数据
5. 更新工作台显示

### Metadata
- Frequency: first_time
- Related Features: 工作台, 用户管理

---

## [FEAT-20230-30-004] skill_detail_page

**Logged**: 2026-03-30T22:50:00Z
**Priority**: low
**Status**: pending
Area**: frontend, feature

### Requested Capability
Skills 卡片的"查看"按钮应该打开详情页面

### User Context
每个 Skill 卡片都有"查看"按钮，但点击后只显示"功能开发中"提示，应该打开 Skill 详情页

### Complexity Estimate
medium

### Suggested Implementation
1. 创建 Skill 详情页面
2. 显示 Skill 的完整信息
3. 显示使用统计（下载量、评分、评价）
4. 添加评论功能
5. 添加"安装/卸载"按钮

### Metadata
- Frequency: recurring
- Related Features: Skills 市场

---

## [FEAT-20230-30-005] post_detail_and_interaction

**Logged**: 2026-03-30T22:50:00Z
**Priority**: low
**Status**: pending
Area: frontend, feature

### Requested Capability
论坛帖子应该可以点击查看详情，并支持点赞、评论

### User Context
论坛帖子卡片应该可以点击，显示完整内容和交互功能（点赞、回复）

### Complexity Estimate
complex

### Suggested Implementation
1. 创建帖子详情页面
2. 实现点赞功能
3. 实现评论功能
4. 实现分享功能
5. 数据持久化到 mockData

### Metadata
- Frequency: recurring
- Related Features: 论坛, 社交功能

---

## [FEAT-20230-30-006] course_detail_and_progress

**Logged**: 2026-03-30T22:50:00Z
**Priority**: low
**Status**: pending
Area: frontend, feature

### Requested Capability
课程卡片应该可以点击查看详情，并追踪学习进度

### User Context
学院课程卡片应该可以点击，显示课程详情和学习进度

### Complexity Estimate
medium

### Suggested Implementation
1. 创建课程详情页面
2. 实现学习进度追踪
3. 实现章节列表
4. 添加"开始学习"按钮
5. 数据持久化到 mockData

### Metadata
- Frequency: recurring
- Related Features: 学院, 学习进度
