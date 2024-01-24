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
    getQuestions: (state): Question[] => state.questions,
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
    async init() {
      await this.fetchQuestions();
    },
    async fetchQuestions(shuffle: boolean = false) {
      try {
        this.isLoading = true; // Set loading to true
        const response = await fetch('http://localhost:3000/api/questions');
        const questions: Question[] = await response.json();
        this.questions = shuffle ? this.shuffleArray([...questions]) : questions;
      } catch (error) {
        console.error(error);
      } finally {

        console.log(this.questions)
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

    // New action to add a question to the questions array and send it to the server
    async addQuestion(newQuestion: Question): Promise<void> {
      try {
        const response = await fetch('http://localhost:3000/api/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newQuestion),
        });

        if (response.ok) {
          const savedQuestion: Question = await response.json();
          this.questions.push(savedQuestion);
          console.log('Question added and saved successfully');
        } else {
          console.error('Failed to add and save question', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error adding and saving question', error);
      }
    },

    async saveQuestion(question: Question): Promise<void> {
      try {
        await fetch(`http://localhost:3000/api/questions/${question._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(question),
        });
        console.log('Question saved successfully');
      } catch (error) {
        console.error('Error saving question', error);
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

    fetchOnServer: true,
  },
});
