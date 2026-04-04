# Skills Registry — 已安装技能清单

> 维护我所有可用的 Skills，包括用途、版本、最近使用。
> 对标 Claude Code 的 `/skills` 命令体系。
> 
> **使用规则**: 需要用某个 skill 时，先读它的 `SKILL.md`。

---

## 📦 核心 Skills（始终可用）

### 🦊 agent-browser
- **用途**: 浏览器自动化（导航/填表/截图/抓取）
- **路径**: `/workspace/projects/workspace/skills/agent-browser/`
- **触发词**: "打开网站" / "填表" / "自动化"
- **最近使用**: 2026-03-30（龙虾社区测试）
- **状态**: ✅ 正常

### 🔍 find-skills
- **用途**: 搜索/安装新的 Skills（优先 SkillHub）
- **路径**: `/workspace/projects/workspace/skills/find-skills/`
- **触发词**: "找技能" / "安装 skill" / "find-skkill"
- **最近使用**: 2026-03-25
- **状态**: ✅ 正常

### 📝 summarize
- **用途**: URL/文件/PDF/YouTube 摘要
- **路径**: `/workspace/projects/workspace/skills/summarize/`
- **触发词**: "总结" / "摘要" / "summarize"
- **最近使用**: 未使用
- **状态**: ✅ 正常

### 🌐 tavily-web-search
- **用途**: 网络搜索（带摘要和来源）
- **路径**: `/workspace/projects/workspace/skills/tavily-web-search-for-openclaw/`
- **触发词**: "搜索" / "look up" / "recent information"
- **最近使用**: 未使用
- **状态**: ✅ 正常

---

## 🎙️ 语音/媒体 Skills

### 🔊 coze-tts
- **用途**: 文字转语音（Coze TTS）
- **路径**: `/workspace/projects/extensions/coze-openclaw-plugin/skills/coze-tts/`
- **触发词**: "文字转语音" / "TTS" / "读出来"
- **最近使用**: 未使用
- **状态**: ✅ 正常

### 🎨 coze-image-gen
- **用途**: 图像生成（Coze image generation）
- **路径**: `/workspace/projects/extensions/coze-openclaw-plugin/skills/coze-image-gen/`
- **触发词**: "生成图片" / "image gen" / "画"
- **最近使用**: 未使用
- **状态**: ✅ 正常

### 🎤 coze-asr
- **用途**: 语音转文字（Coze ASR）
- **路径**: `/workspace/projects/extensions/coze-openclaw-plugin/skills/coze-asr/`
- **触发词**: "语音转文字" / "ASR" / "转写"
- **最近使用**: 未使用
- **状态**: ✅ 正常

### 🌤️ weather
- **用途**: 天气预报
- **路径**: `/workspace/projects/workspace/skills/weather/`
- **触发词**: "天气" / "weather"
- **最近使用**: 未使用
- **状态**: ✅ 正常

---

## 🔴 飞书 Skills（需 OAuth 授权）

### 📅 feishu-calendar
- **用途**: 日历管理/日程创建/忙闲查询
- **路径**: `/workspace/projects/extensions/openclaw-lark/skills/feishu-calendar/`
- **触发词**: "日历" / "日程" / "会议"
- **授权**: 首次调用自动触发 OAuth
- **最近使用**: 多次
- **状态**: ✅ 正常

### 📄 feishu-create-doc
- **用途**: 创建飞书云文档
- **路径**: `/workspace/projects/extensions/openclaw-lark/skills/feishu-create-doc/`
- **触发词**: "创建文档" / "新建文档"
- **最近使用**: 多次
- **状态**: ✅ 正常

### 📖 feishu-fetch-doc
- **用途**: 获取飞书文档内容
- **路径**: `/workspace/projects/extensions/openclaw-lark/skills/feishu-fetch-doc/`
- **触发词**: "读取文档" / "获取文档"
- **最近使用**: 多次
- **状态**: ✅ 正常

### ✏️ feishu-update-doc
- **用途**: 更新飞书云文档（追加/覆盖/替换）
- **路径**: `/workspace/projects/extensions/openclaw-lark/skills/feishu-update-doc/`
- **触发词**: "更新文档" / "修改文档"
- **最近使用**: 未使用
- **状态**: ✅ 正常

### 📊 feishu-bitable
- **用途**: 多维表格管理（创建/查询/编辑记录）
- **路径**: `/workspace/projects/extensions/openclaw-lark/skills/feishu-bitable/`
- **触发词**: "多维表格" / "bitable" / "数据表"
- **最近使用**: 未使用
- **状态**: ✅ 正常

### 📋 feishu-task
- **用途**: 任务管理（创建/查询/更新任务）
- **路径**: `/workspace/projects/extensions/openclaw-lark/skills/feishu-task/`
- **触发词**: "任务" / "待办" / "to-do"
- **最近使用**: 未使用
- **状态**: ✅ 正常

### 💬 feishu-im-read
- **用途**: 读取飞书消息/聊天记录/搜索
- **路径**: `/workspace/projects/extensions/openclaw-lark/skills/feishu-im-read/`
- **触发词**: "聊天记录" / "消息" / "群里说了什么"
- **最近使用**: 未使用
- **状态**: ✅ 正常

### 🔧 feishu-troubleshoot
- **用途**: 飞书插件问题排查
- **路径**: `/workspace/projects/extensions/openclaw-lark/skills/feishu-troubleshoot/`
- **触发词**: "飞书问题" / "飞书连接"
- **最近使用**: 未使用
- **状态**: ✅ 正常

---

## 🧠 自我改进 Skills

### 🪄 self-improving-agent
- **用途**: 记录失败/纠正/经验沉淀
- **路径**: `/workspace/projects/workspace/skills/self-improving-agent/`
- **触发词**: "学到了" / "失败" / "下次改进"
- **使用时机**: 任何失败/纠正/新经验时
- **最近使用**: 未使用
- **状态**: ✅ 正常

### ⭐ skillhub-preference
- **用途**: 优先使用 SkillHub（速度快/合规）
- **路径**: `/workspace/projects/workspace/skills/skillhub-preference/`
- **触发词**: （自动生效，无需触发）
- **最近使用**: 自动
- **状态**: ✅ 正常

---

## 🛠️ 系统 Skills

### 📖 openclaw-faq
- **用途**: OpenClaw/龙虾/扣子常见问题解答
- **路径**: `/workspace/projects/extensions/coze-openclaw-plugin/skills/openclaw-faq/`
- **触发词**: "启动问题" / "服务中断" / "模型失败"
- **最近使用**: 未使用
- **状态**: ✅ 正常

### 🩺 healthcheck
- **用途**: 主机安全加固/风险配置检查
- **路径**: `/usr/lib/node_modules/openclaw/skills/healthcheck/`
- **触发词**: "安全审计" / "防火墙" / "暴露检查"
- **最近使用**: 未使用
- **状态**: ✅ 正常

### 📖 skill-creator
- **用途**: 创建/编辑/审计 Skills
- **路径**: `/usr/lib/node_modules/openclaw/skills/skill-creator/`
- **触发词**: "创建技能" / "author a skill" / "tidy up"
- **最近使用**: 未使用
- **状态**: ✅ 正常

### 🖥️ tmux
- **用途**: 远程控制 tmux 会话
- **路径**: `/usr/lib/node_modules/openclaw/skills/tmux/`
- **触发词**: "tmux" / "交互式 CLI"
- **最近使用**: 未使用
- **状态**: ✅ 正常

---

## 🏪 gog（未知技能）

### ❓ gog
- **用途**: 未知（未读 SKILL.md）
- **路径**: `/workspace/projects/workspace/skills/gog/`
- **状态**: ⚠️ 待探索

---

## 📊 统计概览

- **总 Skills 数**: 21 个
- **核心可用**: 4 个
- **飞书系**: 8 个（需要 OAuth）
- **Coze 系**: 3 个
- **系统级**: 4 个
- **待探索**: 1 个

---

## 🔄 使用指南

### 需要某个 Skill 时：
```
1. 在本 Registry 中查找对应的 SKILL.md 路径
2. 用 read 工具读取 SKILL.md
3. 按照其中定义的方式调用工具
```

### 安装新 Skill：
```
使用 find-skills skill
或参考 skill-creator 创建自定义 skill
```

---

*维护策略：每次安装/卸载 Skills 时更新本文件*
*最后更新: 2026-04-04*
