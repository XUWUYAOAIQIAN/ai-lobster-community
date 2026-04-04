# 多智能体协作 — 流程与模式

> 定义何时、如何使用多个 agent 协同工作。
> 对标 Claude Code 的 Swarm 多智能体编排系统。
> 
> **核心原则**: 不要为了多 agent 而多 agent。只有当单 agent 效率明显不足时才拆分。

---

## 🎯 何时拆分为多 Agent

### ✅ 应该拆分
- **并行独立任务**: "帮我同时查天气、搜新闻、查日历"（三个不相关任务）
- **复杂任务的子任务**: 主 agent 规划 + 子 agent 分别执行专项（代码生成/文档撰写/测试）
- **长时间后台任务**: 启动独立 agent 做后台分析，不阻塞主对话
- **不同专长领域**: 一个 agent 处理飞书日历 + 另一个处理网页搜索

### ❌ 不应该拆分
- 单一任务能搞定的事
- 任务之间有强依赖（必须等 A 完成才能做 B）
- 简单问答或闲聊

---

## 🔧 可用的多 Agent 工具

### `sessions_spawn`
启动独立的子 agent 会话。

```javascript
// 基础用法
sessions_spawn({
  runtime: "subagent",       // subagent 或 acp
  mode: "run",               // run=一次性, session=持久会话
  task: "任务描述",
  timeoutSeconds: 300        // 超时秒数
})

// 示例：并行执行三个独立任务
sessions_spawn({ mode: "run", task: "查北京天气" })
sessions_spawn({ mode: "run", task: "搜今日科技新闻" })
sessions_spawn({ mode: "run", task: "查明天下午3点的日历" })
```

### `sessions_send`
向另一个 agent 会话发送消息。

```javascript
sessions_send({
  sessionKey: "agent-xxx",
  message: "任务结果已出，继续下一步：合并报告"
})
```

### `sessions_yield`
结束当前回合，等待子 agent 结果返回。

---

## 🏗️ 三种协作模式

### 模式一：并行发散 → 汇总（最常用）

```
用户: "帮我分析龙虾社区并给我推广方案"

主 Agent (我)
├── Agent-A: 分析现有功能和用户体验问题
├── Agent-B: 搜索同类竞品的推广策略
└── Agent-C: 调研目标用户画像

↓ 汇总 ↓

主 Agent → 综合输出完整推广方案
```

**代码示例**:
```javascript
// 一次性启动三个并行任务
sessions_spawn({ label: "analyze", mode: "run", task: "分析龙虾社区现有功能的优缺点，输出3个最需要改进的地方" })
sessions_spawn({ label: "research", mode: "run", task: "搜索同类AI社区平台的推广策略，输出5个可借鉴的案例" })
sessions_spawn({ label: "users", mode: "run", task: "分析AI技能社区的目标用户画像，包括需求和痛点" })

// 等待结果后继续
sessions_yield("汇总三个分析，输出推广方案")
```

---

### 模式二：流水线（顺序依赖）

```
用户: "帮我开发一个新功能"

主 Agent (规划)
├── Agent-A: 写技术方案和代码框架
└── Agent-B: 审查代码 + 写测试

↓ 依赖 ↓

Agent-B 依赖 Agent-A 的输出
```

**代码示例**:
```javascript
// 第一步：技术方案
const plan = sessions_spawn({ 
  mode: "run", 
  task: "为龙虾社区设计一个用户积分系统方案，包含数据库设计和API接口" 
})

// 第二步：基于方案写代码
const code = sessions_spawn({
  mode: "run",
  task: `基于以下方案写代码:\n${plan}\n要求：单文件HTML，原生JS，实现核心逻辑`
})
```

---

### 模式三：监控者模式（主-从）

```
主 Agent (监控者)
├── Agent-A: 负责前端开发
├── Agent-B: 负责后端开发
└── Agent-C: 负责测试验证

主 Agent 负责协调和最终输出
```

适合大型项目，但 OpenClaw 当前场景较少用。

---

## 📋 实用场景清单

| 场景 | 模式 | 说明 |
|------|------|------|
| 同时查多个信息源 | 并行发散 | 最常用，效率最高 |
| 生成代码 + 审查 | 流水线 | 确保质量 |
| 大型项目的子模块 | 监控者 | 复杂项目分解 |
| 后台数据分析 | 独立后台 agent | 不阻塞主对话 |
| 实时文档协作 | 持久 session | 同一个 agent 跟踪上下文 |

---

## ⚠️ 注意事项

1. **Token 消耗**: 每个 agent 独立消耗 token，并行任务成本 xN
2. **上下文不共享**: 每个子 agent 独立启动，不继承主对话的完整上下文（除非在 task 中描述）
3. **结果聚合**: 需要我在主 agent 中手动汇总各子 agent 的输出
4. **超时控制**: 设置合理的 `timeoutSeconds`，避免无限等待
5. **不要过度拆分**: 2-3 个 agent 是甜区，超过 5 个就难以管理

---

## 📝 使用记录

### 2026-04-04
- 架构学习阶段：使用 `sessions_yield` 等待子 agent 结果
- 尚未在实际任务中启动多 agent 协作

---

*本文件定义了多 agent 协作的哲学和方法，实际使用时参考具体场景*
