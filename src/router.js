import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: () => import(/* webpackChunkName: "home" */ './pages/AppPage.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
        },
        {
          path: '/tips',
          name: 'tips',
          component: () => import(/* webpackChunkName: "tips" */ '@/views/Tips.vue')
        },
        {
          path: '/tips/:category/:id',
          name: 'article',
          component: () => import(/* webpackChunkName: "article" */ '@/views/TipArticle.vue')
        }
      ]
    },
    {
      path: '',
      name: 'content',
      component: () => import(/* webpackChunkName: "home" */ './pages/ContentPage.vue'),
      children: [
        {
          path: '/privacy',
          name: 'privacy',
          component: () => import(/* webpackChunkName: "article" */ '@/views/Privacy.vue')
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
