// store/examStore.ts
import { defineStore } from 'pinia';

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctOption: number;
}

interface UserChoice {
  questionId: string;
  answerIndex: number;
}

interface ExamState {
  questions: Question[];
  currentQuestionIndex: number;
  isLoading: boolean;
  userChoices: UserChoice[];
}

export const useExamStore = defineStore('exam', {
  state: (): ExamState => ({
    questions: [],
    currentQuestionIndex: 0,
    isLoading: true,
    userChoices: [],
  }),

  getters: {
    currentQuestion: (state): Question => state.questions[state.currentQuestionIndex],
    isQuizCompleted: (state): boolean => {
      if (state.isLoading || !state.questions.length) {
        return false;
      }

      // Check if there is a choice for each question
      return state.questions.every(question =>
        state.userChoices.some(choice => choice.questionId === question._id)
      );
    },
  },

  actions: {
    async fetchQuestions() {
      try {
        this.isLoading = true; // Set loading to true
        const response = await fetch('http://localhost:3000/api/questions');
        const questions: Question[] = await response.json();
        this.questions = this.shuffleArray([...questions]);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false; // Set loading to false, whether successful or not
      }
    },

    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex += 1;
      }
    },

    hasNextQuestion() {
      return this.currentQuestionIndex < this.questions.length - 1;
    },

    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex -= 1;
      }
    },

    // New action to handle storing user choices
    answerQuestion(selectedOption: number | null): void {
      if (selectedOption !== null) {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.userChoices.push({ questionId: currentQuestion._id, answerIndex: selectedOption });
      }
    },

    // Helper function to shuffle an array using Fisher-Yates algorithm
    shuffleArray<T>(array: T[]): T[] {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },
});
