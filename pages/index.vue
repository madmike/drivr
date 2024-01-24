<!-- src/views/Index.vue -->

<template>
  <div class="flex items-center justify-center">
    <!-- Start Page -->
    <div class="text-white text-center p-8 bg-gray-800 rounded-lg">
      <h2 class="text-3xl font-semibold mb-6">Welcome to the Driving Test</h2>
      <form @submit.prevent="startQuiz">
        <label for="name" class="block text-lg mb-2">Enter Your Name:</label>
        <input type="text" id="name" v-model="userName" required
               class="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300">
        <button type="submit" class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">Start Quiz</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';

const userName = ref('');
const quizStarted = ref(false);
const router = useRouter();
const appStore = useUserStore();

const startQuiz = () => {
  if (userName.value.trim() !== '') {
    // Set the name in the Pinia store
    appStore.setUserName(userName.value);

    // Set the name and start the quiz
    quizStarted.value = true;

    // Navigate to the quiz page
    router.push('/quiz');
  }
};
</script>

<style scoped>
/* Add specific styles as needed */
</style>
