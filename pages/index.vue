<template>
  <div class="flex flex-col gap-y-5 py-6">
    <h2 class="text-center text-3xl text-indigo-800 font-semibold mb-3">{{ $t('welcome') }}</h2>
    <p class="text-xl text-left">{{ $t('choose_category') }}:</p>

    <div class="w-full grid grid-cols-3 gap-6">
      <nuxt-link
        :to="`/quiz/${category._id}`"
        v-for="category in questionStore.categories"
        :key="category._id"
        @click="selectCategory(category._id)"
        class="flex flex-col bg-white overflow-hidden rounded-xl drop-shadow-xl cursor-pointer hover:drop-shadow-2xl hover:-translate-y-1"
      >
        <div :style="'background-image: url(\'/'+category._id+'.jpg\');'" class="w-full bg-center h-52"></div>
        <div class="flex flex-col gap-3 p-6">
          <h3 class="font-bold text-center">{{ $t(category._id) }}</h3>
          <div class="text-sm text-gray-500">{{ $t(`descriptions.${category._id}`) }}</div>
          <div class="flex justify-between text-sm">
            <div class="flex flex-col">
              <strong>{{ category.sections }}</strong>
              <span>{{ $t('tests') }}</span>
            </div>
            <div class="flex flex-col">
              <strong>{{ category.questions }}</strong>
              <span>{{ $t('unq_questions') }}</span>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuestionStore } from '~/store/question';
import { useQuizStore } from '~/store/quiz';

const userName = ref('');
const router = useRouter();
const store = useQuizStore();
const questionStore = useQuestionStore();

onMounted(async () => {
  if (store.isQuizStarted) {
    router.push('/quiz');
    return;
  }

  await questionStore.fetchCategories();
});

const startQuiz = () => {
  if (userName.value.trim() !== '') {
    // Set the name in the Pinia store
    store.startQuiz(userName.value.trim());
    router.push('/quiz');
  }
};

const selectCategory = (category: string) => {
  store.setCategory(category);
}
</script>

<style scoped>
/* Add specific styles as needed */
</style>
