<template>
<div>
  <!-- Loading Spinner -->
  <div v-if="$store.isLoading" class="spinner-container">
    <div class="spinner"></div>
  </div>

  <Modal :show="openForm" @close="hideQuestionForm">
    <template #title>
      <h2 class="text-xl font-bold mb-4">{{ $t(questionModel._id ? 'new_question' : 'update_question') }}</h2>
    </template>

    <div class="flex mb-4">
      <button @click="currentLanguage = 'en'" :class="currentLanguage === 'en' ? 'bg-gray-200' : ''" class="px-4 py-2 mr-2">English</button>
      <button @click="currentLanguage = 'ru'" :class="currentLanguage === 'ru' ? 'bg-gray-200' : ''" class="px-4 py-2">Русский</button>
    </div>
    
    <form @submit.prevent="submitQuestion">
      <div class="mb-4">
        <label class="block text-sm font-semibold mb-2">{{ $t('question') }}:</label>
        <textarea v-model="questionModel.question[currentLanguage]" class="w-full p-2 border rounded" rows="3" required></textarea>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        <div v-for="(option, optionIndex) in questionModel.options" :key="optionIndex" class="mb-4">
          <label class="flex items-center gap-2">
            <input
              type="radio"
              v-model="questionModel.correctOption"
              :value="optionIndex"
            />
            <input v-model="option[currentLanguage]" type="text" class="w-full p-2 border rounded" required />
          </label>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-semibold mb-2">{{ $t('description') }}:</label>
        <textarea v-model="questionModel.description[currentLanguage]" class="w-full p-2 border rounded" rows="3" required></textarea>
      </div>
    </form>

    <template #footer>
      <div class="flex gap-4">
        <button @click="submitQuestion" class="bg-indigo-800 hover:bg-indigo-600 text-white px-4 py-2 rounded">{{ $t('submit') }}</button>
        <button @click="hideQuestionForm" class="px-4 py-2 text-white bg-red-500 rounded">{{ $t('cancel') }}</button>
      </div>
    </template>
  </Modal>

  <div class="border-b border-gray-300">
    <nav class="flex justify-between -mb-px">
      <div class="flex grow">
        <nuxt-link
          to="/admin/results"
          class="w-1/6 font-medium font-sm text-center border-b-2 border-transparent py-4 px-1 hover:text-indigo-800 hover:border-indigo-800"
          active-class="text-indigo-800 !border-indigo-800"
        >Results</nuxt-link>
        <nuxt-link
          to="/admin/questions"
          class="w-1/6 font-medium font-sm text-center border-b-2 border-transparent py-4 px-1 hover:text-indigo-800 hover:border-indigo-800"
          active-class="text-indigo-800 !border-indigo-800"
        >Questions</nuxt-link>
      </div>
      <div v-if="$router.currentRoute.value.path.endsWith('questions')" class="flex h-14 w-14 p-3">
        <button @click="openQuestionForm" class="flex w-full h-full items-center justify-center bg-white border text-indigo-800 border-indigo-800 rounded hover:border-indigo-600 hover:text-indigo-600">
          <plus-icon class="w-6 h-6"></plus-icon>
        </button>
      </div>
      <div v-else-if="$router.currentRoute.value.path.match('/results/.+')" class="flex h-14 w-14 p-3">
        <button @click="$router.back" class="flex w-full h-full items-center justify-center bg-white border text-indigo-800 border-indigo-800 rounded hover:border-indigo-600 hover:text-indigo-600">
          <arrow-uturn-left-icon class="w-6 h-6"></arrow-uturn-left-icon>
        </button>
      </div>
    </nav>
  </div>

  <div class="bg-gray-100 p-8">
    <NuxtPage @editQuestion="setQuestion" />
  </div>
</div>
</template>

<script lang="ts" setup>
import { PlusIcon, ArrowUturnLeftIcon } from '@heroicons/vue/20/solid';
import { useQuestionStore } from '~/store/question';
import type { TQuestion } from '~/types/question.type';

definePageMeta({
  middleware: [
    'auth-middleware',
    (to, from) => to.path.endsWith('admin') ? navigateTo('/admin/results') : true,
  ],
});

const $store = useQuestionStore();
const $router = useRouter();
const emptyQuestion = (): TQuestion => ({
  question: { en: '', ru: '' },
  options: Array(4).fill(() => ({ en: '', ru: '' })),
  correctOption: 0,
  description: { en: '', ru: '' },
})

const openForm = ref(false);
const questionModel = ref(emptyQuestion());
const currentLanguage = ref<'ru' | 'en'>('en');

onMounted(async () => {
  await $store.fetchQuestions();
});

const openQuestionForm = () => openForm.value = true;
const hideQuestionForm = () => openForm.value = false;

const setQuestion = (question: TQuestion) => {
  questionModel.value = question;
  openQuestionForm();
}

const submitQuestion = async () => {
  console.log('submitQuestion')
  questionModel.value.correctOption = parseInt(questionModel.value.correctOption as unknown as string, 10);
  const method = questionModel.value._id ? 'updateQuestion' : 'addQuestion';
  await $store[method](questionModel.value);

  // Clear the form and hide it
  questionModel.value = emptyQuestion();
  hideQuestionForm();
};

</script>
