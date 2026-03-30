// 用户系统 JavaScript 补丁
// 将此文件的内容插入到 index.html 中的适当位置

// 1. 在 handleAuth 函数之后添加退出登录函数
// 在第 2953 行之后插入

function handleLogout() {
 if(!confirm('确定要退出登录吗？')) return;

 currentUser = null;
 sessionStorage.removeItem('lobster_user');
 updateLoginButton();
 showToast('已退出登录', 'info');
}

// 2. 修改 handleAuth 函数，使其从 localStorage 读取用户
// 替换第 2901-2947 行的代码

async function handleAuth() {
 const email = document.getElementById('auth-email').value.trim();
 const password = document.getElementById('auth-password').value;
 const emailError = document.getElementById('email-error');
 const passwordError = document.getElementById('password-error');

 // 清除错误信息
 emailError.textContent = '';
 passwordError.textContent = '';

 // 验证邮箱
 if(!email) {
  emailError.textContent = '请输入邮箱地址';
  return;
 }
 if(!validateEmail(email)) {
  emailError.textContent = '请输入有效的邮箱地址';
  return;
 }

 // 验证密码
 if(!password) {
  passwordError.textContent = '请输入密码';
  return;
 }
 if(password.length < 6) {
  passwordError.textContent = '密码至少需要6位';
  return;
 }

 try {
  // 从 localStorage 读取用户数据
  const users = JSON.parse(localStorage.getItem('lobster_users') || '[]');
  const user = users.find(u => u.email === email);

  if(!user) {
   emailError.textContent = '该邮箱未注册，请先注册';
   return;
  }

  // 模拟密码验证（实际项目中需要加密）
  if(password.length < 6) {
   passwordError.textContent = '密码错误';
   return;
  }

  // 登录成功
  showToast('登录中...', 'info');
  await new Promise(resolve => setTimeout(resolve, 1000));

  currentUser = user;
  sessionStorage.setItem('lobster_user', JSON.stringify(currentUser));

  updateLoginButton();
  closeAuthModal();
  showToast('登录成功！欢迎回来，' + currentUser.username, 'success');
 } catch(error) {
  showToast('登录失败：' + error.message, 'error');
 }
}

// 3. 修改 handleLoginClick 函数，点击登录按钮时显示个人资料而不是退出
// 替换第 2954-2967 行

function handleLoginClick() {
 if(currentUser) {
  // 如果已登录，显示个人资料
  openProfileModal();
 } else {
  showAuthModal();
 }
}

// 4. 在 handleLoginClick 之后添加用户系统功能
// 在第 2967 行之后插入

// 切换登录/注册标签
function switchAuthTab(tab) {
 const loginTab = document.getElementById('tab-login');
 const registerTab = document.getElementById('tab-register');
 const loginForm = document.getElementById('login-form');
 const registerForm = document.getElementById('register-form');

 // 清除错误信息
 clearAllErrors();

 if(tab === 'login') {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
 } else {
  loginTab.classList.remove('active');
  registerTab.classList.add('active');
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
 }
}

// 清除所有错误信息
function clearAllErrors() {
 const errors = document.querySelectorAll('.form-error');
 errors.forEach(error => error.textContent = '');
}

// 处理注册
function handleRegister() {
 const username = document.getElementById('reg-username').value.trim();
 const email = document.getElementById('reg-email').value.trim();
 const password = document.getElementById('reg-password').value;
 const confirmPassword = document.getElementById('reg-confirm-password').value;

 // 清除错误信息
 clearAllErrors();

 // 验证用户名
 if(!username) {
  document.getElementById('username-error').textContent = '请输入用户名';
  return;
 }
 if(username.length < 2) {
  document.getElementById('username-error').textContent = '用户名至少需要2个字符';
  return;
 }

 // 验证邮箱
 if(!email) {
  document.getElementById('reg-email-error').textContent = '请输入邮箱地址';
  return;
 }
 if(!validateEmail(email)) {
  document.getElementById('reg-email-error').textContent = '请输入有效的邮箱地址';
  return;
 }

 // 验证密码
 if(!password) {
  document.getElementById('reg-password-error').textContent = '请输入密码';
  return;
 }
 if(password.length < 6) {
  document.getElementById('reg-password-error').textContent = '密码至少需要6位';
  return;
 }

 // 验证确认密码
 if(!confirmPassword) {
  document.getElementById('confirm-password-error').textContent = '请再次输入密码';
  return;
 }
 if(password !== confirmPassword) {
  document.getElementById('confirm-password-error').textContent = '两次输入的密码不一致';
  return;
 }

 // 检查邮箱是否已注册
 const users = JSON.parse(localStorage.getItem('lobster_users') || '[]');
 if(users.some(u => u.email === email)) {
  document.getElementById('reg-email-error').textContent = '该邮箱已被注册';
  return;
 }

 // 创建新用户
 const newUser = {
  id: 'u' + Date.now(),
  username: username,
  email: email,
  avatar: '🦞',
  bio: '',
  createdAt: new Date().toISOString(),
  installedSkills: [],
  skillsUsed: 0
 };

 // 保存用户
 users.push(newUser);
 localStorage.setItem('lobster_users', JSON.stringify(users));

 // 自动登录
 currentUser = newUser;
 sessionStorage.setItem('lobster_user', JSON.stringify(currentUser));

 updateLoginButton();
 closeAuthModal();
 showToast('注册成功！欢迎加入 AI龙虾社区', 'success');
}

// 打开个人资料模态框
function openProfileModal() {
 if(!currentUser) {
  showToast('请先登录', 'warning');
  return;
 }

 // 填充用户数据
 document.getElementById('profile-avatar-display').textContent = currentUser.avatar;
 document.getElementById('profile-username').value = currentUser.username;
 document.getElementById('profile-email').value = currentUser.email;
 document.getElementById('profile-bio').value = currentUser.bio || '';

 // 计算统计数据
 const installedSkills = JSON.parse(localStorage.getItem('installed_skills') || '[]');
 document.getElementById('stat-installed-skills').textContent = installedSkills.length;
 document.getElementById('stat-skills-used').textContent = currentUser.skillsUsed || 0;
 
 // 计算加入天数
 const joinDate = new Date(currentUser.createdAt);
 const daysSinceJoin = Math.floor((new Date() - joinDate) / (1000 * 60 * 60 * 24));
 document.getElementById('stat-join-days').textContent = daysSinceJoin;

 // 打开模态框
 document.getElementById('profile-modal').style.display = 'block';
}

// 关闭个人资料模态框
function closeProfileModal() {
 document.getElementById('profile-modal').style.display = 'none';
}

// 更换头像
function changeAvatar() {
 const avatars = ['🦞', '🐱', '🐶', '🐰', '🦊', '🐼', '🐨', '🦁', '🐯', '🦄', '🐲', '🦔', '🐸', '🦖', '🐙', '🦋', '🐳', '🦈', '🐬', '🦚'];
 const currentIndex = avatars.indexOf(currentUser.avatar);
 const nextIndex = (currentIndex + 1) % avatars.length;
 currentUser.avatar = avatars[nextIndex];
 document.getElementById('profile-avatar-display').textContent = currentUser.avatar;
 updateLoginButton();
}

// 保存个人资料
function saveProfile() {
 if(!currentUser) return;

 // 更新用户数据
 currentUser.username = document.getElementById('profile-username').value.trim();
 currentUser.bio = document.getElementById('profile-bio').value.trim();

 // 保存到 localStorage
 const users = JSON.parse(localStorage.getItem('lobster_users') || '[]');
 const userIndex = users.findIndex(u => u.id === currentUser.id);

 if(userIndex > -1) {
  users[userIndex] = currentUser;
  localStorage.setItem('lobster_users', JSON.stringify(users));
 }

 // 更新 sessionStorage
 sessionStorage.setItem('lobster_user', JSON.stringify(currentUser));

 updateLoginButton();
 closeProfileModal();
 showToast('个人资料已保存', 'success');
}
