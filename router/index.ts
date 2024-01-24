// src/router/index.ts

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Index from '../views/Index.vue';
import Quiz from '../views/Quiz.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
