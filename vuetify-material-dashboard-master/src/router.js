import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'IndexLogin',
      path: '/index/login',
      redirect: '/login',
      component: () => import('@/auth/Index'),
      children: [
        {
          name: 'Login',
          path: '/login',
          component: () => import('@/auth/_Login'),
          meta: {
            requiresVisitor: true,
            // requiresAuth: true,
          },
        },
        {
          name: 'Logout',
          path: '/logout',
          component: () => import('@/auth/Logout'),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
          meta: {
            requiresAuth: true,
          },
        },
        // Post
        {
          name: 'Index News',
          path: '/post/news',
          component: () => import('@/views/dashboard/postnews/Index'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: 'CreateNews',
          path: '/post/create',
          component: () => import('@/views/dashboard/postnews/Create'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: 'Edit News',
          path: '/post/:id/edit',
          component: () => import('@/views/dashboard/postnews/Edit'),
          meta: {
            requiresAuth: true,
          },
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
          meta: {
            requiresAuth: true,
          },
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
          meta: {
            requiresAuth: true,
          },
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/postnews/GoogleMaps'),
          meta: {
            requiresAuth: true,
          },
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
})
