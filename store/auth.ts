import { defineStore } from 'pinia';

import type { TUser } from '~/types/user.type';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    _authenticated: false,
    loading: false,
  }),
  getters: {
    authenticated: (state) => state._authenticated || useCookie('auth').value === 'admin'
  },
  actions: {
    async authenticateUser({ login, password }: TUser) {
      const { data, pending }: any = await useFetch('/api/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: { login, password },
      });
      this.loading = pending;

      if (data.value.success) {
        const auth = useCookie('auth');
        auth.value = 'admin';
        this._authenticated = true;
      }
    },
    logOut() {
      const auth = useCookie('auth'); // useCookie new hook in nuxt 3
      this._authenticated = false;
      auth.value = null; // clear the token cookie
    },
  },
});