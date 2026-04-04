# AI Agent 架构模式 — 从 Claude Code 学习

> 2026-04-04 学习自: https://github.com/iZiTTMarvin/Claude-code-open
> 由吾屿老徐引导，AI Agent 沉淀

---

## 🏛️ 十大核心架构模式

### 1. CLAUDE.md — 项目上下文层

**问题**: Agent 每次会话都"失忆"，需要重新理解项目。

**Claude Code 方案**:
```markdown
# 项目说明
- 技术栈: Next.js + PostgreSQL
- 重要文件: src/app/
- 编码规范: ESLint + Prettier
```

**我的落地**: ✅ 已创建 `/workspace/projects/workspace/CLAUDE.md`

**适用场景**: 任何需要项目级上下文的工作。

---

### 2. MEMORY.md — 长期记忆层

**问题**: 日记是原始流水账，重要信息被淹没。

**Claude Code 方案**: `memdir/` 持久化记忆目录 + 智能压缩对话历史。

**我的落地**: ✅ 已创建 `/workspace/projects/workspace/MEMORY.md`，从日记中提炼：
- 用户画像
- 项目决策记录
- 技术经验
- 失败教训

**原则**: 仅在主对话加载，不进群聊。

---

### 3. 多入口架构 (Entrypoints)

**问题**: CLI / MCP / SDK / Remote 需要不同入口。

**Claude Code 方案**:
```
src/
├── entrypoints/
│   ├── cli.tsx        # 命令行入口
│   ├── mcp.ts         # MCP 协议入口
│   └── sdk.ts         # SDK 入口
```

**我的现状**: OpenClaw 本身已是多入口（飞书/CLI/Web），我的 workspace 暂无此需求，但值得在 AGENTS.md 中说明"入口优先级"。

---

### 4. 工具层 (Tools) vs 命令层 (Commands)

**问题**: 工具和命令混在一起，难以扩展。

**Claude Code 方案**: 严格分离
- `tools/`: 30+ 内置工具（文件读写/Shell/搜索等）
- `commands/`: 70+ 斜杠命令（`/commit`, `/model`, `/help` 等）

**我的现状**:
- 工具 → Skills 系统（`/workspace/projects/workspace/skills/`）
- 命令 → 尚未建立斜杠命令体系

**可以改进**: 在 workspace 中实现简单的命令注册表：
```
/analyze  → 分析当前项目状态
/summary  → 生成会话摘要
/project  → 显示项目上下文
```

---

### 5. 权限粒度控制

**问题**: "能否执行 X"需要明确规则，而非笼统的"安全"。

**Claude Code 方案**:
```json
{
  "allowedTools": [
    "BashTool(git *)",
    "FileEditTool",
    "FileReadTool"
  ]
}
```
- `default`: 敏感操作需确认
- `auto`: 自动批准安全操作
- `bypass`: 跳过所有检查

**我的现状**: SOUL.md 覆盖了安全护栏，但可以更显式：
- 在 `TOOLS.md` 中添加"权限矩阵"
- 明确哪些工具需要二次确认

---

### 6. 多智能体编排 (Swarm)

**问题**: 复杂任务需要多个 AI 协同。

**Claude Code 方案**:
- `TeamCreateTool` / `TeamDeleteTool` — 创建/解散团队
- `SendMessageTool` — 团队成员间通信
- Tmux / iTerm2 作为多 agent 后端

**我的现状**:
- OpenClaw 支持 `sessions_spawn` 启动子 agent
- 尚未建立多 agent 协作模式

**适用场景**:
- 同时处理多个独立任务（"帮我同时查天气和日历"）
- 复杂任务分解（主 agent 规划 + 子 agent 执行）

---

### 7. 上下文管理 (Context Compression)

**问题**: 对话历史越来越长，token 费用飙升。

**Claude Code 方案**:
- 自动压缩长对话
- `CLAUDE.md` 提供项目级上下文（不变的信息不用反复说）
- 分离"会话历史"和"项目知识"

**我的现状**:
- MEMORY.md → 项目知识（长期）
- memory/YYYY-MM-DD.md → 会话历史（日记）
- CLAUDE.md → 项目上下文（本次新增）

---

### 8. Skills 系统（我的优势）

**Claude Code**: `Skills/` 目录 + `/skills` 命令管理

**我的 Skills 现状**:
```
skills/
├── agent-browser/       ✅ 浏览器自动化
├── find-skills/        ✅ 搜索安装
├── self-improving-agent/ ✅ 失败记录
├── skillhub-preference/ ✅ 偏好
├── summarize/          ✅ 摘要
└── tavily/             ✅ 搜索
```

**可以增强**:
- 维护一个 `skills/REGISTRY.md` 清单（每个 skill 的用途、版本、最后使用）
- 为高频任务添加专属 skill

---

### 9. 多 API 提供商支持

**Claude Code 方案**:
- Anthropic 官方 / AWS Bedrock / Google Vertex / Azure Foundry
- 环境变量切换 `CLAUDE_CODE_USE_BEDROCK=1`

**我的现状**: 通过 OpenClaw + Coze 支持多模型（已在 CLAUDE.md 记录）

**意义**: 架构上支持"可插拔的 AI 提供商"，降低单一依赖风险。

---

### 10. 远程会话 (Remote Sessions)

**Claude Code**: WebSocket / SSE 支持远程会话

**我的现状**: OpenClaw 已支持飞书作为渠道，天然是远程的

**可以增强**: 通过 `sessions_spawn` 实现跨设备任务延续

---

## 📊 架构成熟度自评

| 维度 | Claude Code | 我的 Workspace | 差距 |
|------|------------|----------------|------|
| 项目上下文 | CLAUDE.md | CLAUDE.md ✅ | 已对齐 |
| 长期记忆 | MEMORY.md | MEMORY.md ✅ | 已对齐 |
| 工具系统 | 30+ 工具 | 20+ Skills ✅ | 接近 |
| 命令体系 | 70+ 斜杠命令 | 0 ❌ | 需建设 |
| 权限控制 | 细粒度规则 | SOUL.md 覆盖 ✅ | 可细化 |
| 多 Agent | Swarm 编排 | sessions_spawn ✅ | 基础可 |
| 使用统计 | 遥测系统 | 无 ❌ | 低优先级 |
| 远程会话 | WebSocket | 飞书渠道 ✅ | 已满足 |
| MCP 支持 | 完整客户端 | OpenClaw 内置 ✅ | 已满足 |

---

## 🎯 下一步行动

### 本次已落地 ✅
- [x] 创建 CLAUDE.md（项目上下文）
- [x] 创建 MEMORY.md（长期记忆）
- [x] 沉淀架构模式文档

### 值得以后做
- [ ] `skills/REGISTRY.md` — Skills 清单管理
- [ ] `commands/` — 斜杠命令注册表
- [ ] `TOOLS.md` 权限矩阵细化
- [ ] `stats/` — 本地使用统计
- [ ] 多 agent 协作流程文档

---

*学习来源: https://github.com/iZiTTMarvin/Claude-code-open*
*沉淀日期: 2026-04-04*
