<!-- components/Admin.vue -->

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Admin Panel - Edit Questions</h1>
    <!-- Loading Spinner -->
    <div v-if="isLoading" class="spinner-container">
      <!-- You can use your preferred loading spinner here -->
      <div class="spinner"></div>
    </div>
    <!-- Button to create a new question -->
    <button @click="showNewQuestionForm" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">
      Create New Question
    </button>
    <!-- New Question Form Dialog -->
    <transition name="slide">
      <!-- New Question Form (Initially hidden) -->
    <div v-if="isNewQuestionFormVisible" class="bg-white p-8 rounded shadow-md mb-4">
      <h2 class="text-xl font-bold mb-4">New Question</h2>
      <form @submit.prevent="submitNewQuestion">
        <!-- Add form fields for new question properties (e.g., question, options, correctOption) -->
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-2">Question:</label>
          <textarea v-model="newQuestion.question" class="w-full p-2 border rounded" rows="3" required></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-2">Options (comma-separated):</label>
          <input v-model="newQuestion.options" type="text" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-2">Correct Option (index):</label>
          <input v-model="newQuestion.correctOption" type="number" class="w-full p-2 border rounded" required />
        </div>

        <!-- Submit Button -->
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
    </transition>


    <div v-if="questions.length > 0" class="bg-gray-100 min-h-screen p-8">
      <!-- List of Questions -->
      <ul>
        <li v-for="(question, index) in questions" :key="index" class="bg-white p-4 mb-4 rounded shadow-md">
          <div class="text-lg font-semibold mb-2">{{ question.question }}</div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <label v-for="(option, optionIndex) in question.options" :key="optionIndex" class="flex items-center">
              <input
                type="radio"
                v-model="question.correctOption"
                :value="optionIndex"
              />
              {{ option }}
            </label>
          </div>
          <button @click="saveQuestion(question)" class="bg-blue-500 text-white px-4 py-2 rounded mt-2">Save</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { nextTick, watch, toRef } from 'vue';
import { useExamStore } from '~/store/exams'; // Import useExamStore

const { fetchQuestions, saveQuestion, addQuestion } = useExamStore(); // Use useExamStore

onMounted(async () => {
  await fetchQuestions();
});

const isNewQuestionFormVisible = ref(false);
const newQuestion = ref({
  question: '',
  options: '',
  correctOption: null,
});

const showNewQuestionForm = () => {
  isNewQuestionFormVisible.value = true;
};


const submitNewQuestion = async () => {
  // Split options into an array
  newQuestion.value.options = newQuestion.value.options.split(',').map(option => option.trim());

  // Convert correctOption to a number
  newQuestion.value.correctOption = parseInt(newQuestion.value.correctOption, 10);

  // Add the new question to the store and send it to the server
  await addQuestion(newQuestion.value);

  // Clear the form and hide it
  newQuestion.value = { question: '', options: '', correctOption: null };
  isNewQuestionFormVisible.value = false;
};

const examStore = useExamStore();
const questions = toRef(examStore, 'questions');
const isLoading = toRef(examStore, 'isLoading');

// Watch for changes
watch(questions, (newQuestions) => {
  console.log('Questions updated:', newQuestions);
});

</script>
