<template>
  <div>
    <!-- Loading Spinner -->
    <div v-if="$store.isLoading" class="spinner-container">
      <div class="spinner"></div>
    </div>

    <!-- Question Section -->
    <div v-if="!$store.isLoading && !$store.isQuizCompleted && $store.length > 0" class="p-8 rounded shadow-md">
      <h1 class="text-2xl font-bold mb-6">{{ $store.currentQuestion?.question[locale] }}</h1>
      
      <!-- Options -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <label v-for="(option, index) in $store.currentQuestion?.options" :key="index">
          <input
            type="radio"
            class="peer hidden"
            v-model="selectedOption"
            :value="index"
            :disabled="$store.hasCurrentChoice"
          >
          <div
            :class="{
              'border-gray-200': !$store.hasCurrentChoice || (index !== $store.currentChoice && index !== $store.currentCorrect),
              '!border-rose-800 text-rose-800 bg-white': index === $store.currentChoice && !$store.isCurrentCorrect,
              '!border-indigo-500 text-indigo-500 stroke-indigo-500 bg-white': index === $store.currentChoice && $store.isCurrentCorrect,
              '!border-emerald-700 text-emerald-700 bg-white': $store.hasCurrentChoice && index !== $store.currentChoice && index === $store.currentCorrect,
            }"
            class="h-full min-h-14 hover:bg-white hover:border-gray-400 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm  group"
          >
            <h2 class="text-lg font-medium text-gray-700">{{ option[locale] }}</h2>
            <svg v-if="index === $store.currentChoice && $store.isCurrentCorrect" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="shrink-0 w-9 h-9">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </label>
      </div>
      <transition name="slide">
        <div
          v-if="$store.hasCurrentChoice && !$store.isCurrentCorrect"
          class="bg-orange-50 rounded-lg min-h-52 text-gray-600 mt-5 p-8"
        >
          {{ $store.currentQuestion?.description[locale] }}
        </div>
      </transition>

      <!-- Navigation Buttons -->
      <div class="mt-8 flex justify-between">
        <button @click="$store.previousQuestion" class="bg-indigo-800 text-white px-4 py-2 rounded" :class="{invisible: $store.currentIndex === 0}">{{ $t('previous') }}</button>
        <button @click="answerAndNext" class="bg-indigo-800 text-white px-4 py-2 rounded">{{ $t('next') }}</button>
      </div>
    </div>
    <!-- Results Section -->
    <div v-if="$store.isQuizCompleted" class="bg-gray-100 p-8 shadow-md">
      <h2 class="text-xl font-bold mb-4">{{ t('results') }}</h2>
      <Results :answers="$store.getResults"></Results>

      <div class="flex justify-between mt-4">
        <button @click="submitResults" class="bg-indigo-800 text-white px-4 py-2 rounded">{{ $t('submit') }}</button>
        <button @click="clear" class="bg-rose-800 text-white px-4 py-2 rounded">{{ $t('try_again') }}</button>
      </div>

    </div>

    <!-- No Questions Message -->
    <div v-if="!$store.isLoading && $store.length === 0" class="text-center py-16">
      <p>{{ t('no_questions') }}.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import { useQuizStore } from '~/store/quiz';
import { useResultsStore } from '~/store/results';

const { locale, t } = useI18n();
const $router = useRouter();
const $store = useQuizStore();
const $results = useResultsStore();

const selectedOption = ref<number | null>(null);

onMounted(() => {
  if (!$store.isQuizStarted) {
    $router.push('/');
    return;
  }

  $store.fetchQuestions();
});

const answerAndNext = async () => {
  $store.nextQuestion();
  selectedOption.value = null;
};

const submitResults = () => {
  // const resultsData = {
  //   userName: $store.userName,
  //   quizResults: $store.userChoices,
  // };

  $store.quitQuiz();
  $router.push('/');
};

const clear = () => {
  $store.clear();
  $results.resultsUID = null;
}

watch(selectedOption, (cur, prev) => {
  if (cur !== null && cur !== undefined) {
    $results.submitResult({
      user: $store.userName,
      answers: [{
        question: $store.currentQuestion?._id as string,
        answer: selectedOption.value as number,
      }]
    })
      .then(_ => $store.answerQuestion(cur))
      .catch(error => console.error(error));
  }
});
</script>