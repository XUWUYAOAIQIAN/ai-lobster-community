# 如何将真实 Skills 集成到 AI龙虾社区

## 问题分析

当前网站中的 Skills 只是 HTML 文本展示，无法实际调用。但实际上，/workspace/projects/workspace/skills/ 目录下有大量真实的 skills 可以使用。

## 解决方案

### 第一步：扫描 Skills 目录

```javascript
// 在 index.html 中添加
const skillsDirectory = '/workspace/projects/workspace/skills/';
const availableSkills = [
  {
    name: 'agent-browser',
    description: '浏览器自动化，可以打开网站、点击按钮、填写表单、截图、提取数据',
    icon: '🌐',
    category: '自动化',
    author: 'OpenClaw',
    version: '1.0.0',
    path: '/workspace/projects/workspace/skills/agent-browser/SKILL.md'
  },
  {
    name: 'summarize',
    description: '总结文档、网页、PDF、图片、视频的内容',
    icon: '📝',
    category: 'AI',
    author: 'OpenClaw',
    version: '1.0.0',
    path: '/workspace/projects/workspace/skills/summarize/SKILL.md'
  },
  {
    name: 'tavily',
    description: '网络搜索，查找最新信息、研究主题',
    icon: '🔍',
    category: 'AI',
    author: 'OpenClaw',
    version: '1.0.0',
    path: '/workspace/projects/workspace/skills/tavily-web-search-for-openclaw/SKILL.md'
  },
  {
    name: 'self-improving-agent',
    description: '自我改进和学习，记录错误和教训',
    icon: '🧠',
    category: 'AI',
    author: 'OpenClaw',
    version: '1.0.0',
    path: '/workspace/projects/workspace/skills/self-improving-agent/SKILL.md'
  }
];
```

### 第二步：创建 Skill 详情页面

```html
<!-- Skill 详情模态框 -->
<div class="modal" id="skill-detail-modal" onclick="if(event.target===this) closeSkillDetailModal()">
  <div class="modal-content skill-detail-content">
    <button class="modal-close" onclick="closeSkillDetailModal()">✕</button>
    <div class="skill-detail-header">
      <div class="skill-icon" id="skill-detail-icon">⚡</div>
      <div>
        <h2 class="skill-detail-title" id="skill-detail-title">Skill 名称</h2>
        <div class="skill-detail-meta">
          <span id="skill-detail-author">作者</span>
          <span id="skill-detail-version">v1.0.0</span>
        </div>
      </div>
    </div>

    <div class="skill-detail-body">
      <div class="skill-section">
        <h3>📖 描述</h3>
        <p id="skill-detail-desc">Skill 描述</p>
      </div>

      <div class="skill-section">
        <h3>🎯 使用场景</h3>
        <ul id="skill-detail-usecases">
          <!-- 动态加载 -->
        </ul>
      </div>

      <div class="skill-section">
        <h3>⚙️ 配置</h3>
        <div id="skill-detail-config">
          <!-- 动态加载 -->
        </div>
      </div>

      <div class="skill-section">
        <h3>🚀 试一试</h3>
        <div class="skill-demo" id="skill-demo">
          <!-- 动态加载 -->
        </div>
      </div>
    </div>

    <div class="skill-detail-footer">
      <button class="btn-secondary" onclick="closeSkillDetailModal()">关闭</button>
      <button class="btn-primary" onclick="installSkill()">安装 Skill</button>
    </div>
  </div>
</div>
```

### 第三步：实现 Skill 详情展示

```javascript
let currentSkill = null;

function showSkillDetail(skillId) {
  const skill = availableSkills.find(s => s.id === skillId);
  if(!skill) return;

  currentSkill = skill;

  // 更新详情内容
  document.getElementById('skill-detail-icon').textContent = skill.icon;
  document.getElementById('skill-detail-title').textContent = skill.title;
  document.getElementById('skill-detail-desc').textContent = skill.desc;
  document.getElementById('skill-detail-author').textContent = skill.author;

  // 动态加载使用场景
  const usecasesHtml = skill.usecases.map(uc => `<li>${uc}</li>`).join('');
  document.getElementById('skill-detail-usecases').innerHTML = usecasesHtml;

  // 打开模态框
  document.getElementById('skill-detail-modal').style.display = 'block';
}

function closeSkillDetailModal() {
  document.getElementById('skill-detail-modal').style.display = 'none';
}

function installSkill() {
  if(!currentSkill) return;

  showToast('正在安装 ' + currentSkill.title + '...', 'info');

  // 模拟安装过程
  setTimeout(() => {
    // 添加到已安装列表
    const installedSkills = JSON.parse(localStorage.getItem('installed_skills') || '[]');
    if(!installedSkills.includes(currentSkill.id)) {
      installedSkills.push(currentSkill.id);
      localStorage.setItem('installed_skills', JSON.stringify(installedSkills));
    }

    showToast(currentSkill.title + ' 安装成功！', 'success');
    closeSkillDetailModal();
    loadInstalledSkills(); // 刷新已安装列表
  }, 1500);
}
```

### 第四步：实现 Skill 调用（实际使用）

```javascript
function useSkill(skillId, params) {
  const skill = availableSkills.find(s => s.id === skillId);
  if(!skill) return;

  showToast('正在调用 ' + skill.title + '...', 'info');

  // 根据 skill 类型调用不同的功能
  switch(skill.name) {
    case 'agent-browser':
      // 调用浏览器自动化
      callAgentBrowser(params);
      break;
    case 'summarize':
      // 调用总结功能
      callSummarize(params);
      break;
    case 'tavily':
      // 调用搜索功能
      callTavily(params);
      break;
    default:
      showToast('Skill 调用功能开发中...', 'warning');
  }
}

// 示例：调用 agent-browser
function callAgentBrowser(params) {
  const url = params.url || 'https://example.com';

  // 显示浏览器预览
  const preview = document.getElementById('browser-preview');
  preview.innerHTML = `
    <iframe src="${url}" style="width:100%;height:400px;border:1px solid #ddd;"></iframe>
  `;

  showToast('浏览器已打开：' + url, 'success');
}

// 示例：调用总结功能
function callSummarize(params) {
  const content = params.content || '';

  // 调用总结 API（这里需要后端支持）
  fetch('/api/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('summary-result').textContent = data.summary;
    showToast('总结完成！', 'success');
  })
  .catch(err => {
    showToast('总结失败：' + err.message, 'error');
  });
}
```

### 第五步：创建 Skill 管理页面

```html
<!-- Skill 管理页面 -->
<div class="content-section" id="skills-manager-section">
  <div class="page-header">
    <h1 class="page-title">🧩 我的 Skills</h1>
    <button class="btn-primary" onclick="openSkillsMarket()">去 Skill 市场</button>
  </div>

  <div class="skills-tabs">
    <button class="tab-btn active" onclick="showSkillTab('installed')">已安装</button>
    <button class="tab-btn" onclick="showSkillTab('available')">可用</button>
  </div>

  <div id="skills-installed" class="skills-grid">
    <!-- 动态加载已安装的 Skills -->
  </div>

  <div id="skills-available" class="skills-grid" style="display:none;">
    <!-- 动态加载可用的 Skills -->
  </div>
</div>
```

### 第六步：实现 Skill 管理逻辑

```javascript
function loadInstalledSkills() {
  const installedSkills = JSON.parse(localStorage.getItem('installed_skills') || '[]');
  const container = document.getElementById('skills-installed');

  if(installedSkills.length === 0) {
    container.innerHTML = '<div class="empty-state">还没有安装任何 Skill</div>';
    return;
  }

  container.innerHTML = installedSkills.map(skillId => {
    const skill = availableSkills.find(s => s.id === skillId);
    if(!skill) return '';

    return `
      <div class="skill-card">
        <div class="skill-icon">${skill.icon}</div>
        <div class="skill-info">
          <div class="skill-title">${skill.title}</div>
          <div class="skill-desc">${skill.desc.substring(0, 50)}...</div>
        </div>
        <div class="skill-actions">
          <button class="btn-secondary" onclick="useSkill('${skill.id}')">使用</button>
          <button class="btn-danger" onclick="uninstallSkill('${skill.id}')">卸载</button>
        </div>
      </div>
    `;
  }).join('');
}

function loadAvailableSkills() {
  const container = document.getElementById('skills-available');

  container.innerHTML = availableSkills.map(skill => {
    return `
      <div class="skill-card">
        <div class="skill-icon">${skill.icon}</div>
        <div class="skill-info">
          <div class="skill-title">${skill.title}</div>
          <div class="skill-desc">${skill.desc.substring(0, 50)}...</div>
        </div>
        <div class="skill-actions">
          <button class="btn-primary" onclick="showSkillDetail('${skill.id}')">查看</button>
          <button class="btn-secondary" onclick="installSkill('${skill.id}')">安装</button>
        </div>
      </div>
    `;
  }).join('');
}

function uninstallSkill(skillId) {
  if(!confirm('确定要卸载这个 Skill 吗？')) return;

  const installedSkills = JSON.parse(localStorage.getItem('installed_skills') || '[]');
  const index = installedSkills.indexOf(skillId);

  if(index > -1) {
    installedSkills.splice(index, 1);
    localStorage.setItem('installed_skills', JSON.stringify(installedSkills));
    showToast('Skill 已卸载', 'success');
    loadInstalledSkills();
  }
}

function showSkillTab(tab) {
  document.getElementById('skills-installed').style.display = tab === 'installed' ? 'grid' : 'none';
  document.getElementById('skills-available').style.display = tab === 'available' ? 'grid' : 'none';

  document.querySelectorAll('.skills-tabs .tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}
```

## 实际集成示例

### 示例 1：将 agent-browser Skill 集成到网站

```javascript
// 在 mockData 中添加真实的 skill
const mockData = {
  skills: [
    {
      id: 'agent-browser',
      title: '浏览器自动化',
      icon: '🌐',
      desc: '自动打开网站、点击按钮、填写表单、截图、提取数据',
      tags: ['自动化', '测试', '爬虫'],
      author: 'OpenClaw',
      downloads: 12567,
      rating: 4.9,
      usecases: [
        '自动化网站测试',
        '批量填写表单',
        '网站数据抓取',
        '网页截图'
      ],
      config: [
        { name: '默认浏览器', type: 'select', options: ['Chrome', 'Firefox', 'Safari'] },
        { name: '截图格式', type: 'select', options: ['PNG', 'JPEG'] },
        { name: '超时时间', type: 'number', default: 30 }
      ]
    }
    // ... 其他 skills
  ]
};
```

### 示例 2：创建 Skill 使用界面

```html
<!-- Skill 使用界面 -->
<div class="skill-demo-panel">
  <h3>🚀 试用 Skill</h3>
  <div class="demo-form">
    <label>目标 URL</label>
    <input type="url" id="demo-url" placeholder="https://example.com" value="https://baidu.com">
  </div>
  <button class="btn-primary" onclick="runSkillDemo()">运行演示</button>
  <div id="demo-result" class="demo-result">
    <!-- 演示结果 -->
  </div>
</div>

<script>
function runSkillDemo() {
  const url = document.getElementById('demo-url').value;

  showToast('正在打开浏览器...', 'info');

  // 模拟浏览器操作
  setTimeout(() => {
    const result = `
      <div class="browser-screenshot">
        <img src="data:image/png;base64,..." alt="Screenshot">
      </div>
      <div class="browser-log">
        <h4>操作日志：</h4>
        <ul>
          <li>✅ 打开页面：${url}</li>
          <li>✅ 等待页面加载</li>
          <li>✅ 截取页面截图</li>
          <li>✅ 提取页面数据</li>
        </ul>
      </div>
    `;

    document.getElementById('demo-result').innerHTML = result;
    showToast('演示完成！', 'success');
  }, 2000);
}
</script>
```

## 下一步行动

1. **扫描 skills/ 目录**：获取所有真实技能列表
2. **创建 Skill 数据结构**：定义 Skill 的元数据格式
3. **实现 Skill 详情页**：展示 Skill 的完整信息
4. **实现 Skill 安装/卸载**：管理已安装的 Skills
5. **实现 Skill 调用**：实际使用 Skill 功能
6. **创建 Skill 管理页面**：用户可以管理自己的 Skills
7. **添加 Skill 配置**：允许用户自定义 Skill 参数
8. **实现 Skill 日志**：记录 Skill 的使用历史

---

## 总结

将真实的 Skills 集成到 AI龙虾社区需要：

1. **数据层**：定义 Skill 的数据结构
2. **UI 层**：创建 Skill 详情、管理、使用界面
3. **逻辑层**：实现 Skill 的安装、配置、调用逻辑
4. **后端层**：提供 Skill 调用的 API 支持

**估算时间**：2-3 周

**关键功能**：
- ✅ 扫描和加载真实的 Skills
- ✅ 显示 Skill 详情
- ✅ 安装和卸载 Skills
- ✅ 配置 Skill 参数
- ✅ 调用并运行 Skill
- ✅ 查看 Skill 使用日志

---

**创建时间**: 2026-03-30 23:34
**目标**: 将 /workspace/projects/workspace/skills/ 中的真实 Skills 集成到 AI龙虾社区
