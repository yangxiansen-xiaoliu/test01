import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import { constantRoutes } from '@/router'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoutes = store.getters.routes && Object.keys(store.getters.routes).length > 0
      if (hasRoutes) {
        next()
      } else {
        try {
          const accessRoutes = await store.dispatch('user/getInfo')
          router.addRoutes(transRoutes(constantRoutes, accessRoutes))
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export function transRoutes(routes, userRoutes) {
  const res = []
  routes.forEach(route => {
    userRoutes.forEach(userRoute => {
      if (route.path === userRoute.path) {
        res.push(route)
      }
    })
  })
  return res
}
