import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/show/:id',
      name: 'show-detail',
      component: () => import('@/views/ShowDetailView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue'),
      beforeEnter: (to) => {
        const q = to.query.q;
        const normalized = (Array.isArray(q) ? q[0] : q)?.trim() ?? '';

        if (!normalized) {
          return { name: 'home' };
        }

        return true;
      },
    },
  ],
});
