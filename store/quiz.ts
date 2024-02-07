import type { PopulatedDoc } from 'mongoose';
import { defineStore } from 'pinia';
import type { TQuestion } from '~/types/question.type';
import type { TAnswer } from '~/types/result.type';


interface IQuizState {
  userName: string;
  started: boolean;
  questions: Record<string, TQuestion>;
  currentQuestion: TQuestion | null;
  currentIndex: number;
  results: Record<string, number>;

  isLoading: boolean;
}

export const useQuizStore = defineStore('quiz', {
  state: (): IQuizState => ({
    userName: '',
    started: false,
    questions: {},
    currentQuestion: null,
    currentIndex: 0,
    results: {},
    isLoading: true,
  }),

  getters: {
    length: (state): number => Object.keys(state.questions).length,
    isQuizStarted: (state): boolean => !!state.userName && state.started,
    isQuizCompleted: (state): boolean => state.isLoading || !Object.keys(state.questions).length ? false : Object.keys(state.questions).length === Object.keys(state.results).length,
    hasCurrentChoice: (state): boolean => state.results[state.currentQuestion?._id as string] !== undefined,
    isCurrentCorrect: (state): boolean => state.results[state.currentQuestion?._id as string] === state.currentQuestion?.correctOption,
    currentChoice: (state): number => state.results[state.currentQuestion?._id as string],
    currentCorrect: (state): number => state.currentQuestion?.correctOption as number,
    getResults: (state): TAnswer[] => Object.entries(state.results).map(([question, answer]) => ({ question: state.questions[question], answer })),
    correctAnswersPercent: (state): number => Object.values(state.questions).reduce((res, cur) =>
        res + ((
          state.results[cur._id as string] !== undefined
            && state.results[cur._id as string] === cur.correctOption
            || 0
        ) as number), 0)
      / Object.keys(state.questions).length * 100,
    wrongAnswersPercent: (state): number =>
      Object.values(state.questions).reduce((res, cur) =>
        res + ((
          state.results[cur._id as string] !== undefined
            && state.results[cur._id as string] !== cur.correctOption
            || 0
        ) as number), 0)
      / Object.keys(state.questions).length * 100
  },

  actions: {
    startQuiz(name: string) {
      if (!name) {
        return;
      }

      this.userName = name;
      this.started = true;
    },

    quitQuiz() {
      this.userName = '';
      this.started = false;
      this.clear();
    },

    clear() {
      this.currentIndex = 0;
      this.currentQuestion = this.questions[this.currentIndex];
      this.results = {};
    },

    async fetchQuestions() {
      try {
        this.isLoading = true; // Set loading to true
        const response = await fetch('/api/questions/random');
        const questions: TQuestion[] = await response.json();
        this.questions = questions.reduce((res, q) => ({ ...res, [q._id as string]: q}), {} as Record<string, TQuestion>);
        this.currentQuestion = questions[0];
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false; // Set loading to false, whether successful or not
      }
    },

    nextQuestion(): TQuestion | null {
      if (this.currentIndex < Object.keys(this.questions).length - 1) {
        this.currentIndex++;
        this.currentQuestion = Object.values(this.questions)[this.currentIndex];
        
        return this.currentQuestion;
      }

      return null;
    },

    previousQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.currentQuestion = Object.values(this.questions)[this.currentIndex];
        
        return this.currentQuestion;
      }

      return null;
    },

    // New action to handle storing user choices
    answerQuestion(choice: number | null): void {
      if (choice !== null) {
        this.results[this.currentQuestion?._id as string] = choice;
      }
    },

    getAnswer(id: string) {
      return this.results[id];
    },
  },
});
