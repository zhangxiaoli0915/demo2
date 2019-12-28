import router from '../router'
import progress from 'nprogress'
import 'nprogress/nprogress.css'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  progress.start()// 开启进度条
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
// afterEach关闭
router.afterEach(function () {
  progress.done()// 路由变化完成执行
})
