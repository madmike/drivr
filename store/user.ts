// src/store/index.ts

import { defineStore } from 'pinia';

interface AppState {
  userName: string;
}

export const useUserStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    userName: '',
  }),
  getters: {
    getUserName(): string {
      return this.userName;
    },
  },
  actions: {
    setUserName(name: string): void {
      this.userName = name;
    },
  },
});
