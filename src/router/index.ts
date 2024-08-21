import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Blog from '@/views/Blog.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Blog
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
