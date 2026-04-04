# MEMORY.md - 长期记忆

> 这是我的长期记忆库。从每日日记中提炼的核心内容。
> 相当于人类的"内隐知识"——不需要每次都重新学习。
> 
> **安全原则**: 仅在主要对话（私聊飞书）中加载，**不在群聊中暴露**。

---

## 🧑 关于吾屿老徐

- 正在开发一个 **AI 龙虾社区**（AI Skill 社区平台）
- 项目地址: https://github.com/XUWUYAOAIQIAN/ai-lobster-community
- 演示地址: https://xuwuyaoaiqian.github.io/ai-lobster-community/
- 喜欢深夜开发（00:00 后）
- 行动力强，经常有具体的项目想法
- 使用飞书与我沟通

---

## 🦞 AI 龙虾社区项目

### 项目背景
将 OpenClaw 的 Skills 系统包装成一个社区平台，让用户可以浏览、体验 Skills 功能。初始版本是"空壳"，经过多个阶段迭代完善。

### 技术栈
- 单文件 HTML（index.html）
- 原生 CSS + JavaScript
- localStorage 做数据持久化
- GitHub Pages 部署
- OpenClaw Skills 做真实功能集成

### 四个开发阶段（2026-03-31 全部完成）
1. **阶段一**: 真实 Skills 集成（8个 Skills 数据）
2. **阶段二**: 用户系统（注册/登录/资料）
3. **阶段三**: 社交功能（点赞/评论/发帖）
4. **阶段四**: 学习系统（学院/课程/成就）

### 项目代码量
- 总计约 4,649 行代码
- 14 个 Git commits

---

## 🔧 技术经验

### OpenClaw Skills 集成
- Skills 放在 `/workspace/projects/workspace/skills/` 目录
- 每个 Skill 有 `SKILL.md` 定义触发词和用法
- 使用 `read` 工具读取 SKILL.md 后执行
- `find-skills` Skill 用于搜索/安装新 Skills

### 飞书集成
- 飞书日历: `feishu_calendar_event` 创建日程
- 飞书文档: `feishu_create_doc` 创建云文档
- 飞书消息: `message` 工具发送
- OAuth 授权在首次调用时自动触发

### Browser 自动化
- 使用 `agent-browser` skill
- 遇到登录墙时停止，提供 VNC 链接让用户登录
- 登录完成后继续任务

### Git 工作流
- 在 `/workspace/projects/workspace` 下开发
- git add → git commit → git push
- 子目录项目（如 ai-lobster-community）单独管理 git

---

## 📚 已掌握的技能

### 我的 Skills（已安装）
- `agent-browser` - 浏览器自动化
- `find-skills` - 搜索安装 Skills
- `self-improving-agent` - 自我改进（失败记录/纠正/经验沉淀）
- `skillhub-preference` - SkillHub 偏好
- `summarize` - URL/文件摘要
- `tavily-web-search-for-openclaw` - 网络搜索
- `weather` - 天气预报
- `coze-tts` - 文字转语音
- `coze-image-gen` - 图像生成
- `coze-asr` - 语音转文字
- `feishu-*` 系列 - 飞书全家桶

### Skills 触发规律
- 飞书日历相关 → 先读 `feishu-calendar` SKILL.md
- 飞书多维表格 → 先读 `feishu-bitable` SKILL.md
- 飞书文档读写 → 先读 `feishu-fetch-doc` / `feishu-update-doc`
- 创建文档 → `feishu-create-doc`
- 搜索 Skills → `find-skills`

---

## 🚨 系统限制

- **9000 端口禁止使用**（系统服务占用）
- **supervisord 禁止 kill**（管理 gateway 进程）
- **systemd 不可用**，Gateway 用脚本管理
  - 启动: `sh /workspace/projects/scripts/start.sh`
  - 重启: `sh /workspace/projects/scripts/restart.sh`
  - 停止: `sh /workspace/projects/scripts/stop.sh`

---

## 💡 重要决策记录

### 2026-03-31: 龙虾社区架构决策
- 决定用 localStorage 而非后端 → 降低复杂度，适合静态托管
- 决定单文件 HTML → 便于 GitHub Pages 部署
- 决定集成真实 Skills 而非模拟 → 提供真实价值

### 2026-04-04: 架构学习
- 向我介绍了 Claude Code 开源架构
- 开始建立 MEMORY.md、CLAUDE.md 等结构
- 标志着从"开发执行"到"系统化沉淀"的转变

---

## 🎓 从失败中学到的

1. **测试要实际跑**: 用 agent-browser 做真实测试比看代码更重要
2. **分阶段交付**: 四个阶段比一口气做完更可控
3. **文档即代码**: 项目文档帮助理解决策背景
4. **本地测试优先**: GitHub Pages 有3-5分钟延迟

---

## 📌 待做/跟进

- [x] 龙虾社区后端化方案评估完成
- [ ] 龙虾社区后端化实施（Supabase，待老徐确认开始）
- [ ] 持续学习更好的 Agent 架构模式
- [ ] 完善 USER.md（补充更多用户偏好）

---

*最后更新: 2026-04-04*
*维护频率: 每次主要对话后更新*
