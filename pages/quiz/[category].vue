<template>
  <div class="flex flex-col items-center justify-center gap-y-5 py-6">
    <h2 class="text-center text-3xl text-indigo-800 font-semibold mb-3">{{ $t($route.params['category']) }} practice test</h2>
    <p class="text-xl text-left">{{ $t('choose_section') }}:</p>
    <div class="flex gap-4">
      <div
        v-for="{ id, value } of getSections()"
        :key="id"
        @click="selectSection(id)"
        :class="(store.currentSection === id) && 'border-transparent bg-indigo-600 text-white'"
        class="p-4 border border-indigo-800 text-indigo-800 hover:bg-indigo-600 hover:border-transparent hover:text-white cursor-pointer rounded-lg"
      >
        {{ value }}
      </div>
      
    </div>

    <!-- Start Page -->
    <div class="text-white text-center p-8 bg-indigo-950 rounded-lg">
      <form @submit.prevent="startQuiz">
        <input
          type="text"
          id="name"
          v-model="userName"
          :placeholder="$t('enter_name')+'...'"
          required
          class="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          class="mt-6 bg-indigo-700 text-white px-6 py-2 rounded-md"
          :class="{'hover:bg-indigo-800': !!(store.currentSection && userName)}"
          :disabled="!(store.currentSection > -2 && userName)"
        >
          {{ $t('start') }}
        </button>
      </form>
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
const route = useRoute();
const { t } = useI18n();

onMounted(async () => {
  if (store.isQuizStarted) {
    router.push('/quiz');
    return;
  }

  await questionStore.fetchCategories();
});

const getSections = () => {
  const category = questionStore.categories.find(c => c._id === route.params.category);
  const sections: { id: number, value: string|number}[]
    = Array.from(Array(category?.sections).keys()).map(s => ({id: ++s, value: s}));
  sections.push(
    { id: 0, value: t('marathon') },
    { id: -1, value: t('exam') },
  );

  return sections;
}

const startQuiz = () => {
  if (userName.value.trim() !== '') {
    // Set the name in the Pinia store
    store.startQuiz(userName.value.trim());
    router.push('/quiz');
  }
}

const selectSection = (number: number) => {
    store.currentSection = number;
}
</script>

