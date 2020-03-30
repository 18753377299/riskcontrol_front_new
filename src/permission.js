import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import Cookies from 'js-cookie'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

const isProtal = process.env.VUE_APP_UNIFIED_PORTAL !== 'false'


if (!isProtal) {
  router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()
    next()
    // if (hasToken) {
    //   if (to.path === '/login') {
    //     // if is logged in, redirect to the home page
    //     next({ path: '/' })
    //     NProgress.done()
    //   } else {
    //     const hasGetUserInfo = store.getters.userInfo
    //     if (hasGetUserInfo) {
    //       next()
    //     } else {
    //       try {
    //         // get user info
    //         await store.dispatch('user/getInfo')
    //
    //         next()
    //       } catch (error) {
    //         // remove token and go to login page to re-login
    //         await store.dispatch('user/resetToken')
    //         Message.error(error || 'Has Error')
    //         next(`/login?redirect=${to.path}`)
    //         NProgress.done()
    //       }
    //     }
    //   }
    // } else {
    //   /* has no token*/
    //
    //   if (whiteList.indexOf(to.path) !== -1) {
    //     // in the free login whitelist, go directly
    //     next()
    //   } else {
    //     // other pages that do not have permission to access are redirected to the login page.
    //     next(`/login?redirect=${to.path}`)
    //     NProgress.done()
    //   }
    // }
  })
} else {
  console.log('log...统一门户')
  // 统一门户路由守卫
  router.beforeEach(async(to, from, next) => {
    // 单点登录控制开关
    // if (store.getters.isSsoLogin === undefined) {
    //   await store.dispatch('settings/getIsSsoLogin')
    // }
    NProgress.start()
    document.title = getPageTitle(to.meta.title)
    if (to.fullPath === '/404') {
      const origin = window.location.origin
      const redirectedFrom = to.redirectedFrom
      const _href = `${origin}${redirectedFrom}`
      window.location.href = _href
      return
    }

    if (Cookies.get('jwt')) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page  如果已登录，重定向到首页
        next({ path: '/' })
        NProgress.done()
      } else {
        // determine whether the user has obtained his permission roles through getInfo
        // const hasRoles = store.getters.roles && store.getters.roles.length > 0
        const userInfo = store.getters.userInfo
        if (userInfo) {
          next()
        } else {
          try {
            // get user info
            // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
            const userInfos = await store.dispatch('user/getInfoProtal')
            // const roles = userInfos.postList
            // generate accessible routes map based on roles
            // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
            // dynamically add accessible routes
            // router.addRoutes(accessRoutes)

            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true })
            // next()
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            Message.error(error || 'Has Error')
            next(`/?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }
    }
  })
}


router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
