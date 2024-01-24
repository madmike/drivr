<!-- pages/index.vue -->
<template>
  <div>
    <!-- Loading Spinner -->
    <div v-if="examStore.isLoading" class="spinner-container">
      <!-- You can use your preferred loading spinner here -->
      <div class="spinner"></div>
    </div>

    <!-- Question Section -->
    <div v-if="!examStore.isLoading && !examStore.isQuizCompleted && examStore.questions.length > 0" class="bg-white p-8 rounded shadow-md">
      <h1 class="text-2xl font-bold mb-6">{{ examStore.currentQuestion.question }}</h1>
      
      <!-- Options -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <label v-for="(option, index) in examStore.currentQuestion.options" :key="index" class="flex items-center">
          <input
            type="radio"
            class="mr-2"
            v-model="selectedOption"
            :value="index"
            :disabled="examStore.userChoices[examStore.currentQuestion.id] !== undefined"
          >{{ option }}
        </label>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-8 flex justify-between">
        <button @click="examStore.previousQuestion" class="bg-blue-500 text-white px-4 py-2 rounded" :class="{invisible: examStore.currentQuestionIndex === 0}">Previous</button>
        <button @click="answerAndNext" class="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>

    <!-- Results Section -->
    <div v-if="examStore.isQuizCompleted" class="bg-white p-8 rounded shadow-md">
      <h2 class="text-xl font-bold mb-4">Quiz Results</h2>
      <div v-for="(question, index) in examStore.questions.slice(0,5)" :key="index" class="mb-6 border-b pb-6">
        <p class="text-lg font-semibold mb-2">{{ index + 1 }}. {{ question.question }}</p>
        <!-- Highlight chosen option with helper function -->
        <p v-for="(option, optionIndex) in question.options" :key="optionIndex"
          :class="getOptionStyle(question, optionIndex)">
          {{ getOptionLabel(question, optionIndex) }}{{ option }}
        </p>
        <!-- Display correct or incorrect sign -->
        <div class="mt-2" v-if="hasUserChoice(question)">
          <div v-if="isUserChoiceCorrect(question)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="w-6 h-6 inline-block align-middle stroke-green-500">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="mr-2 align-middle text-green-500">Correct</span>
          </div>
          <div v-else class="text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="w-6 h-6 inline-block align-middle stroke-red-500">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <span class="mr-2 align-middle text-red-500">Incorrect</span>
          </div>
        </div>
      </div>

      <!-- Two buttons for submitting results and trying again -->
      <div class="flex justify-between mt-4">
        <!-- Submit Results and Go to Index Page -->
        <button @click="submitResults" class="bg-blue-500 text-white px-4 py-2 rounded">Submit Result & Go to Index</button>
        <!-- Try Again (Clear Results) -->
        <button @click="tryAgain" class="bg-red-500 text-white px-4 py-2 rounded">Try Again</button>
      </div>
    </div>

    <!-- No Questions Message -->
    <div v-if="!examStore.isLoading && examStore.questions.length === 0" class="text-center">
      <p>No questions available.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useExamStore } from '~/store/exams';
import { useUserStore } from '~/store/user';

const router = useRouter(); // Access the router object
const selectedOption = ref(null);
const examStore = useExamStore();
const userStore = useUserStore();

onMounted(() => {
  if (!userStore.getUserName) {
    router.push('/');
    return;
  }
  examStore.fetchQuestions(true);
});

const hasUserChoice = (question) => {
  return examStore.userChoices.some(choice => choice.questionId === question._id);
};

const isUserChoiceCorrect = (question) => {
  const userChoice = examStore.userChoices.find(choice => choice.questionId === question._id);
  return userChoice.answerIndex === question.correctOption;
};

const answerAndNext = () => {
  examStore.answerQuestion(selectedOption.value);
  examStore.nextQuestion();
  selectedOption.value = null;
};

const tryAgain = () => {
  // Clear user choices and reset to the beginning
  examStore.userChoices = [];
  examStore.currentQuestionIndex = 0;
};

const submitResults = () => {
  // Clear user choices and reset to the beginning

  const resultsData = {
    userName: userStore.getUserName,
    quizResults: examStore.userChoices,
  };

  axios.post('/api/results', resultsData)
    .then((response) => {
      console.log('Quiz results sent successfully', response.data);
      // Clear user choices and reset to the beginning
      examStore.userChoices = [];
      examStore.currentQuestionIndex = 0;
      router.push('/');
    })
    .catch((error) => {
      console.error('Error sending quiz results', error);
      // Optionally, you may still want to clear results even if there's an error
      examStore.userChoices = [];
      examStore.currentQuestionIndex = 0;
      router.push('/');
    });
};

const getOptionStyle = (question, optionIndex) => {
  const userChoice = examStore.userChoices.find(choice => choice.questionId === question._id);

  return {
    'font-bold': optionIndex === question.correctOption,
    'text-red-500': userChoice && optionIndex === userChoice.answerIndex && optionIndex !== question.correctOption,
    'text-green-500': optionIndex === question.correctOption && (userChoice === undefined || (optionIndex === userChoice.answerIndex && optionIndex === question.correctOption)),
  };
};

const getOptionLabel = (question, optionIndex) => {
  if (optionIndex === examStore.userChoices[question.id] && optionIndex === question.correctOption) {
    return 'Your choice: ';
  } else if (optionIndex === examStore.userChoices[question.id]) {
    return 'Your choice: ';
  } else if (optionIndex === question.correctOption) {
    return 'Correct option: ';
  } else {
    return 'Option: ';
  }
};
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
