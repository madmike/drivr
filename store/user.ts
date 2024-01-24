import { defineStore } from 'pinia';

interface UserState {
  userName: string;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userName: '',
  }),
  getters: {
    getUserName(state): string {
      return state.userName;
    },
  },
  actions: {
    setUserName(name: string): void {
      this.userName = name;
    },
  },
});
