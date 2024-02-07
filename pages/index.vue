<template>
  <div class="flex flex-col h-screen items-center justify-center gap-y-5">
    <!-- Start Page -->
    <div class="text-white text-center p-8 bg-indigo-950 rounded-lg">
      <h2 class="text-3xl font-semibold mb-6">{{ $t('welcome') }}</h2>
      <form @submit.prevent="startQuiz">
        <input
          type="text"
          id="name"
          v-model="userName"
          :placeholder="$t('enter_name')+'...'"
          required
          class="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
        />
        <button type="submit" class="mt-6 bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-md">{{ $t('start') }}</button>
      </form>
    </div>

    <nuxt-link to="/admin" class="text-center mb-5 text-indigo-800 hover:text-indigo-600">{{ $t('go_admin') }}</nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '~/store/quiz';

const userName = ref('');
const router = useRouter();
const store = useQuizStore();

onMounted(() => {
  if (store.isQuizStarted) {
    router.push('/quiz');
    return;
  }
});

const startQuiz = () => {
  if (userName.value.trim() !== '') {
    // Set the name in the Pinia store
    store.startQuiz(userName.value.trim());
    router.push('/quiz');
  }
};
</script>

<style scoped>
/* Add specific styles as needed */
</style>
