import Layout from '@/layout'

const router = {
  path: '/interfacemanager',
  component: Layout,
  redirect: '/interfacemanager/interfaceinfo',
  name: 'interfacemanager',
  meta: {
    title: '接口管理',
    icon: 'interfacemanager'
  },
  children: [
    {
      path: 'interfaceinfo',
      component: () => import('@/views/interfacemanager/interfaceinfo/index'),
      name: 'interfaceinfo',
      meta: { title: '接口信息', icon: 'interfaceinfo' },
      /*redirect: '/interfacemanager/interfaceinfo/beiefinfo/0',*/
      children: [
        {
          path: 'beiefinfo/:id',
          component: () => import('@/views/interfacemanager/interfaceinfo/briefinfo'),
          name: 'beiefinfo',
          hidden: true
        },

        {
          path: 'contain/:subid',
          component: () => import('@/views/interfacemanager/interfaceinfo/contain'),
          name: 'contain',
          redirect: '/interfacemanager/interfaceinfo/contain/:subid/itemcontain',
          hidden: true,
          children: [
            {
              path: 'itemcontain',
              component: () => import('@/views/interfacemanager/interfaceinfo/itemcontain'),
            },
            {
              path: 'itemconfig',
              component: () => import('@/views/interfacemanager/interfaceinfo/itemconfig/index'),
            }
          ]
        }
      ]
    },

    {
      path: 'table',
      component: () => import('@/views/table/index'),
      name: 'table',
      meta: { title: '表格管理', icon: 'table' }
    }]
}

export default router
