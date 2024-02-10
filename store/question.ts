import { defineStore } from 'pinia';
import type { TQuestion } from '~/types/question.type';

interface IQuestionState {
  categories: { _id: string, sections: number, questions: number }[];
  totalDocs: number;
  totalPages: number;
  questions: TQuestion[];
  isLoading: boolean;
}

export const useQuestionStore = defineStore('question', {
  state: (): IQuestionState => ({
    categories: [],
    totalDocs: 0,
    totalPages: 0,
    currentPage: 1,
    questions: [],
    isLoading: true,
  }),

  getters: {
    getQuestions: (state): TQuestion[] => state.questions,
  },

  actions: {
    async fetchCategories() {
      try {
        this.isLoading = true; // Set loading to true
        const response = await fetch('/api/questions/categories');
        this.categories = await response.json();
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false; // Set loading to false, whether successful or not
      }
    },

    async fetchQuestions(page = 1) {
      try {
        this.isLoading = true; // Set loading to true
        const response = await fetch('/api/questions?page='+page);
        const result = await response.json();
        this.questions = result.docs;
        this.totalDocs = result.totalDocs;
        this.totalPages = result.totalPages;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false; // Set loading to false, whether successful or not
      }
    },

    async addQuestion(newQuestion: TQuestion): Promise<void> {
      try {
        const response = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newQuestion),
        });

        if (response.ok) {
          const savedQuestion: TQuestion = await response.json();
          this.questions.push(savedQuestion);

          console.log('Question added and saved successfully');
        } else {
          console.error('Failed to add and save question', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error adding and saving question', error);
      }
    },

    async updateQuestion(question: TQuestion): Promise<void> {
      try {
        await fetch(`/api/questions/${question._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(question),
        });

        console.log('Question saved successfully');
      } catch (error) {
        console.error('Error saving question', error);
      }
    },
  },
});
