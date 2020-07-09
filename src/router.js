import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
const meta = {
  requiresAuth: true,
}

function getCookie(cookie_name) {
  var allcookies = document.cookie
  var cookie_pos = allcookies.indexOf(cookie_name) //索引的长度
  // 如果找到了索引，就代表cookie存在，
  // 反之，就说明不存在。
  if (cookie_pos != -1) {
    // 把cookie_pos放在值的开始，只要给值加1即可。
    cookie_pos += cookie_name.length + 1
    var cookie_end = allcookies.indexOf(';', cookie_pos)
    if (cookie_end == -1) {
      cookie_end = allcookies.length
    }
    var value = unescape(allcookies.substring(cookie_pos, cookie_end)) //这里就可以得到想要的cookie的值了。
  }
  return value
}
const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: () =>
            import(/* webpackChunkName: "welcome" */ './views/welcome.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () =>
            import(/* webpackChunkName: "login" */ './views/login.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () =>
            import(/* webpackChunkName: "register" */ './views/register.vue'),
        },
        {
          path: 'bug',
          name: 'bug',
          meta,
          component: () =>
            import(/* webpackChunkName: "bug" */ './views/chat.vue'),
        },
        {
          path: 'myspace',
          name: 'myspace',
          meta,
          component: () =>
            import(/* webpackChunkName: "myspace" */ './views/myspace.vue'),
        },
        {
          path: 'repassword',
          name: 'repassword',
          meta,
          component: () =>
            import(/* webpackChunkName: "repassword" */ './views/repassword.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/qrCode',
      name: 'qrCode',
      component: () =>
        import(/* webpackChunkName: "qrCode" */ './views/qrCode.vue'),
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let msg = getCookie('user')
    if (!msg) {
      next({
        path: '/home/login',
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
export default router
