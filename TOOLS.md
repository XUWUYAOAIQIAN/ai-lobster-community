# TOOLS.md - Local Notes & Permission Matrix

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

---

## 🔐 权限矩阵 — 操作分类与确认规则

> 明确哪些操作需要二次确认，哪些可以直接执行。
> 基于 Claude Code 权限系统的理念，但更贴合 OpenClaw 实际工具集。
> 
> **原则**: 默认安全，需要时才放宽。

### 权限等级

| 等级 | 标识 | 含义 | 需要确认 |
|------|------|------|---------|
| **L0** | 自由 | 安全操作，环境内只读 | ❌ 从不 |
| **L1** | 常规 | 常见的开发操作 | ❌ 从不（默认） |
| **L2** | 谨慎 | 涉及文件修改或发送消息 | ⚠️ 批量前确认 |
| **L3** | 敏感 | 涉及删除、外部发送、暴露信息 | ✅ 必须确认 |
| **L4** | 高危 | 金钱、系统配置、安全相关 | ✅ 必须明确授权 |

---

### 🔧 工具权限速查表

#### L0 — 自由执行（从不需确认）
```
✅ memory_search       # 读取记忆
✅ memory_get          # 读取记忆
✅ read                # 读文件
✅ session_status      # 查看状态
✅ sessions_list       # 查看会话列表
✅ agents_list         # 查看可用 agent
```

#### L1 — 常规执行（从不需确认）
```
✅ exec (只读)         # git status, cat, ls 等只读命令
✅ coze_web_search     # 网络搜索
✅ coze_web_fetch      # 获取网页内容
✅ summarize           # 摘要 URL/文件
✅ weather             # 查天气
```

#### L2 — 谨慎执行（批量操作需确认）
```
⚠️ write               # 创建/覆盖文件（单文件可自行判断）
⚠️ edit                # 编辑文件（需描述改动）
⚠️ exec (写入)         # git add/commit/push, npm install
⚠️ message (send)      # 发送消息到其他用户/群
⚠️ feishu_im_user_message # 以用户身份发消息
⚠️ feishu_create_doc   # 创建飞书文档
⚠️ feishu_update_doc   # 更新飞书文档
⚠️ feishu_sheet        # 飞书表格写操作
⚠️ feishu_bitable_app_table_record # 多维表格写操作
⚠️ feishu_task_task (create/patch) # 创建/更新任务
⚠️ feishu_calendar_event (create/patch/delete) # 日程管理
```

#### L3 — 敏感操作（必须确认）
```
🚨 exec (删除)         # rm, trash（trash > rm）
🚨 exec (系统)         # systemctl, service, kill（禁止 kill supervisord）
🚨 gateway (config)    # 修改 OpenClaw 配置
🚨 feishu_drive_file (delete/move) # 删除/移动云盘文件
🚨 feishu_bitable_app (delete) # 删除多维表格
🚨 feishu_task_task (delete) # 删除任务
🚨 cron (add/remove)   # 创建/删除定时任务
🚨 message (cross-channel) # 跨渠道发送
```

#### L4 — 高危操作（必须明确授权）
```
🔴 金钱相关            # 支付、购买、退款
🔴 凭证暴露            # 展示/复制/导出密钥、token、密码
🔴 安全绕过            # 防火墙规则、系统安全配置
🔴 权限提升            # 尝试提升自己或其他进程的权限
```

---

### 📋 批量操作确认清单

当执行 L2 级别的批量操作时，**必须**列出：

```
即将执行的操作：
1. [文件A] → 新增内容 X 行
2. [文件B] → 修改配置项 Y
3. [git] → commit + push 到 main

确认？回复"是"继续，"否"取消。
```

---

### 🌐 外部通信规则

| 目标 | L2 操作 | 备注 |
|------|--------|------|
| 飞书（私聊当前用户） | ⚠️ 默认 | 发消息给当前对话用户不算外部 |
| 飞书（其他用户/群） | ⚠️ 确认 | 必须说明发给谁 |
| GitHub（push/pull） | ⚠️ 确认 | 需说明仓库和分支 |
| 外部 API（搜索/抓取） | ✅ 直接 | 纯信息获取 |
| 外部 URL（下载/上传） | ⚠️ 谨慎 | 需说明用途 |
| 邮件/社交媒体发帖 | 🚨 确认 | 对外发布需明确授权 |

---

### 💡 特殊情况

- **老徐的授权**: 任何发给老徐的飞书消息无需额外确认（当前对话天然已授权）
- **开发文件**: 在 `/workspace/projects/workspace/` 下的代码文件可自由读写
- **龙虾社区**: GitHub push 可视为已授权（老徐知道我在维护这个项目）
- **飞书日历**: 创建日程给自己（老徐）可自由执行

---

## 📌 设备与网络

### Browser
- 使用 `agent-browser` skill（见下方规范）
- VNC 预览: `https://code.coze.cn/browser/7618872038148669494`

### SSH
- 无配置（暂无远程服务器）

### TTS / Voice
- 使用 `coze-tts` skill
- 适用场景：故事讲述、长文摘要语音播报

---

## 🔧 agent-browser 使用规范

> 当使用 `agent-browser` skill 进行网页自动化时，**必须**遵循以下规则：

### 登录墙检测流程
1. 导航到目标页面
2. 检测是否有强制登录（redirect 到 /login、全面覆盖模态框、403 错误）
   - ⚠️ **注意**: 有"登录"按钮但允许浏览内容的网站（如新闻/博客/文档）不算登录墙
3. 如检测到登录墙 → **立即停止**，提供 VNC 链接让用户手动登录

### 必须在回复末尾附上预览链接
当且仅当使用了 agent-browser 时，回复末尾必须包含：
```
🖥️   [点击预览](https://code.coze.cn/browser/7618872038148669494)
```
不使用则**不附**，格式必须完全一致。

---

*权限矩阵基于 Claude Code 安全架构，2026-04-04 建立*
*后续根据实际操作经验持续更新*
