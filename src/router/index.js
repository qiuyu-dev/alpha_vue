import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '@/components/home/AppIndex'
import AdminIndex from '@/components/admin/AdminIndex'
import Login from '@/components/Login'
import Register from '@/components/register/Register'
import RegisterEnterprise from '@/components/register/RegisterEnterprise'


Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/redirect',
      component: AdminIndex,
      hidden: true,
      children: [
        {
          path: '/redirect/:path(.*)',
          component: () => import('@/views/redirect/index')
        }
      ]
    },
    {
      path: '/',
      name: 'LoginIndex',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/registerEnterprise',
      name: 'RegisterEnterprise',
      component: RegisterEnterprise
    },    
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../components/admin/AdminIndex'),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/admin/dashboard',
          name: 'Dashboard',
          component: () => import('../components/admin/dashboard/admin/index'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '*',
      component: () => import('../components/pages/Error404')
    }    
  ]
})

// 用于创建默认路由
export const createRouter = routes => new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/registerEnterprise',
      name: 'RegisterEnterprise',
      component: RegisterEnterprise
    },    
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../components/admin/AdminIndex'),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/admin/dashboard',
          name: 'Dashboard',
          component: () => import('../components/admin/dashboard/admin/index'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '*',
      component: () => import('../components/pages/Error404')
    }      
  ]
}
)
