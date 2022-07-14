import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'products',
          component: () => import('@/views/ProductsView.vue'),
        },
        {
          path: '/categories/:name',
          name: 'categories',
          component: () => import('@/views/CategoriesView.vue'),
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('@/views/SearchView.vue'),
        },
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      name: 'not-found',
      component: () => import("@/views/NotFoundView.vue"),
    }
  ]
})

export default router
