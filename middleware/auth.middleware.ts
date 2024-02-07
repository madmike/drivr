import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore());

  if (authenticated.value) {
    if (to.path === '/login') {
      return navigateTo('/admin')
    }

    return;
  }

  if (to.path !== '/login') {
    return navigateTo('/login')
  }
})