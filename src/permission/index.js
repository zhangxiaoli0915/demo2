import router from '../router'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
// 拦截谁 判断拦截地址 如果是登录页的话要令牌，如哦有的话就放过，否则强制跳转到登录页
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
