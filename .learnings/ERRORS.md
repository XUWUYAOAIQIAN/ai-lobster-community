# Errors Log

此文件记录命令失败、异常和错误。

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
测试步骤：
1. 打开登录模态框
2. 输入邮箱：test@example.com
3. 输入密码：test123（5位）
4. 点击登录

预期结果：
- 应该显示错误提示："密码至少需要6位"

实际结果：
- 没有错误提示显示
- #password-error 元素的 textContent 为空
- 用户无法知道密码要求
```

### Context
- 登录模态框：#auth-modal
- 密码输入框：#auth-password
- 错误提示元素：#password-error
- handleAuth() 函数中有验证逻辑

### Suggested Fix
检查并修复 handleAuth() 函数中的密码验证逻辑：
```javascript
function handleAuth() {
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  
  // 清除错误信息
  emailError.textContent = '';
  passwordError.textContent = '';
  
  // 验证密码长度
  if(password.length < 6) {
    passwordError.textContent = '密码至少需要6位';
    // 确保错误元素可见
    passwordError.style.display = 'block';
    return;
  }
  // ...
}
```

### Metadata
- Reproducible: yes
- Related Files: index.html
- Priority: high - 影响用户体验
- Area: frontend, validation

---

## [ERR-20260330-002] agent_browser_timeout

**Logged**: 2026-03-30T22:48:00Z
**Priority**: low
**Status**: resolved
**Area**: infra, testing

### Summary
agent-browser 命令执行超时，需要手动终止

### Error
```
执行 agent-browser fill/click 操作时，命令持续运行超过 8 秒
需要手动 process kill 终止
```

### Context
测试登录功能时，操作卡在等待响应

### Resolution
- **Resolved**: 手动终止会话并继续其他测试
- **Notes**: 可能是网络延迟或浏览器渲染问题

### Metadata
- Reproducible: unknown
- Related Files: agent-browser
- Priority: low - 不影响核心测试

---

## [ERR-20260330-003] getComputedStyle_type_error

**Logged**: 2026-03-30T22:49:00Z
**Priority**: low
Status: resolved
**Area**: frontend, testing

### Summary
使用 getComputedStyle 时参数类型错误

### Error
```
TypeError: Failed to execute 'getComputedStyle' on 'Window': parameter 1 is not of type 'Element'
```

### Context
尝试检查元素的 CSS 样式时传递了 null 或错误的元素引用

### Resolution
- **Resolved**: 修改测试代码，先检查元素是否存在
- **Notes**: 添加了元素存在性检查

### Metadata
- Reproducible: no
- Related Files: testing scripts
- Priority: low - 测试代码问题
- Area: frontend, testing
