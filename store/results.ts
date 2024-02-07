import { defineStore } from 'pinia';
import type { TAnswer, TResult } from '~/types/result.type'; 

interface IResultsState {
  stations: string[];
  user: string | null;
  answers: TAnswer[];
  resultsUID: string | null;
  isLoading: boolean;
}

export const useResultsStore = defineStore('results', {
  state: (): IResultsState => ({
    stations: [],
    user: null,
    answers: [],
    resultsUID: null,
    isLoading: false,
  }),
  getters: {
    currentUser: (state): string => state.user as string,
  },
  actions: {
    async fetchStations() {
      try {
        this.isLoading = true;
        const response = await fetch('/api/results/stations');
        this.stations = await response.json();
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchResults(user: string) {
      try {
        this.isLoading = true;
        const response = await fetch('/api/results/'+user).then(res => res.json());
        this.user = response.user;
        this.answers = response.answers;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async submitResult(result: TResult): Promise<void> {
      try {
        const data = this.resultsUID ? { ...result, uid: this.resultsUID } : result;
        const response = await fetch('/api/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          this.resultsUID = result.uid;
        } else {
          console.error('Failed save Results', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error adding and saving question', error);
      }
    },
  },
});
