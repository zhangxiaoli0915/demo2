import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Common from '../views/comment'
import Home2 from '../views/home/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  // {
  //   path: '',
  //   component: Home2

  // },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: Home2

    }, {
      path: 'comment',
      component: Common
      // 按需加载后面是一个回调函数  按需加载里面是地址

    }]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
