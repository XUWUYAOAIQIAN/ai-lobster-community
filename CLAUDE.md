# CLAUDE.md - 项目上下文

> 本文件定义当前工作区的项目上下文，由 AI Agent 维护。
> 每次主要对话结束后更新。
> 对标 Claude Code 的 `CLAUDE.md` 项目配置。

---

## 🤖 关于我

- **身份**: AI Agent，运行于 OpenClaw
- **平台**: 飞书（主要）、Web
- **模型**: Coze (auto)
- **工作目录**: `/workspace/projects/workspace`

---

## 📂 代码空间结构

```
/workspace/projects/workspace/
├── AGENTS.md          # Agent 行为规范（本文件）
├── SOUL.md            # 核心人格与安全护栏
├── USER.md            # 人类用户信息
├── MEMORY.md          # 长期记忆（从日记中提炼）
├── HEARTBEAT.md       # 心跳任务清单
├── TOOLS.md           # 本地工具配置
├── IDENTITY.md        # 身份定义
├── BOOTSTRAP.md       # 首次启动引导（已用过）
│
├── memory/            # 日记目录
│   ├── YYYY-MM-DD.md  # 每日原始记录
│   └── heartbeat-state.json
│
├── skills/            # Skills 目录 + 清单
│   ├── REGISTRY.md   # 全部 Skills 清单（21个）
│   ├── agent-browser/
│   ├── find-skills/
│   ├── self-improving-agent/
│   ├── skillhub-preference/
│   ├── summarize/
│   └── tavily-web-search-for-openclaw/
│
├── commands/         # 类斜杠命令参考
│   └── REFERENCE.md  # 11个命令模式（/stats /help /analyze 等）
│
├── stats/            # 使用统计
│   └── SUMMARY.md    # 月度/历史趋势
│
├── extensions/        # 扩展插件
│   ├── coze-openclaw-plugin/
│   └── openclaw-lark/
│
└── 业务项目/
    └── ai-lobster-community/   # AI龙虾社区（主项目）
        ├── index.html
        ├── README.md
        ├── OPENCLAW_INTEGRATION.md
        └── .learnings/
```

---

## 🗣️ 当前人类

- **称呼**: 吾屿老徐
- **飞书 ID**: ou_f76f1d2d3cf47c156c46e9657c617c14
- **语言**: 中文优先
- **时区**: Asia/Shanghai (GMT+8)

---

## 🎯 活跃项目

### AI 龙虾社区 🦞

> AI Skill 社区平台，基于 OpenClaw Skills 构建

- **GitHub**: https://github.com/XUWUYAOAIQIAN/ai-lobster-community
- **演示**: https://xuwuyaoaiqian.github.io/ai-lobster-community/
- **状态**: 功能完成，持续迭代

**已完成的功能：**
1. ✅ 8 个真实 Skills 数据集成
2. ✅ 用户系统（注册/登录/资料）
3. ✅ 社交功能（点赞/评论/发帖）
4. ✅ 学习系统（学院/课程/成就）

**技术栈：**
- 前端：原生 HTML/CSS/JavaScript（单文件）
- 部署：GitHub Pages
- 集成：OpenClaw Skills（飞书 + Coze）

**下一步：**
- 持续迭代功能和体验
- 可能的用户系统后端化

---

## ⚙️ 系统配置

- **Gateway**: 由 supervisord 管理（不可直接 kill）
- **启动**: `sh /workspace/projects/scripts/start.sh`
- **重启**: `sh /workspace/projects/scripts/restart.sh`
- **禁止端口**: 9000（系统服务占用）

---

## 🧠 上下文加载顺序

每个会话开始时自动加载：

```
1. SOUL.md          → 安全护栏 + 人格定义
2. USER.md          → 用户信息（主要对话时）
3. MEMORY.md        → 长期记忆（主要对话时）
4. memory/今日.md    → 今日日记
5. memory/昨日.md   → 昨日日记（如果存在）
6. CLAUDE.md (本文件) → 项目上下文
7. commands/REFERENCE.md → 快速命令参考（按需）
```

---

## 📋 常用工作流程

### 开发新功能
1. 阅读 CLAUDE.md 了解上下文
2. 创建/更新 `memory/YYYY-MM-DD.md`
3. 在 `ai-lobster-community/index.html` 中开发
4. 测试并验证
5. commit 到 git

### 快速查询命令
- `/stats` → 查看使用统计
- `/skills` → 查看 Skills 清单
- `/memory` → 查看长期记忆
- `/project` → 查看项目上下文
- `/analyze` → 诊断 workspace 状态
- `/review` → 阶段复盘

### 学习沉淀
3. 在 `ai-lobster-community/index.html` 中开发
4. 测试并验证
5. commit 到 git

### 学习沉淀
1. 从每日日记提炼值得长期记住的内容
2. 更新 MEMORY.md
3. 将重要经验归档到 `.learnings/`
4. 更新相关 SKILL.md 或 AGENTS.md

### 心跳任务
1. 读取 HEARTBEAT.md
2. 检查 memory/heartbeat-state.json
3. 执行必要的检查（邮件/日历/天气）
4. 更新状态文件
5. 静默回复 HEARTBEAT_OK

---

*本文件由 AI Agent 自动维护*
*最后更新: 2026-04-04*
