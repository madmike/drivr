<template>
  <div class="flex flex-col">
  <div v-for="(question, index) in store.questions" :key="index" class="flex flex-col gap-6 bg-white p-4 mb-4 rounded shadow-md">
    <div class="flex justify-between items-start">
      <h1 class="text-2xl font-bold">{{ question.question[locale] }}</h1>
      <button @click="edit(question)" class="bg-indigo-800 hover:bg-indigo-600 text-white p-2 rounded">
        <pencil-icon class="w-4 h-4"></pencil-icon>
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <label v-for="(option, index) in question.options" :key="index">
        <input
          type="radio"
          class="peer hidden"
          v-model="question.correctOption"
          :value="index"
          @change="store.updateQuestion(question)"
        >
        <div
          :class="{
            'border-gray-200': index !== question.correctOption,
            '!border-emerald-700 text-emerald-700 bg-white': index === question.correctOption
          }"
          class="h-full min-h-14 hover:bg-white hover:border-gray-400 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm  group"
        >
          <h2 class="text-lg font-medium text-gray-700">{{ option[locale] }}</h2>
          <svg v-if="index === question.correctOption" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="shrink-0 w-9 h-9">
              <path stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
      </label>
    </div>
  </div>
  <Pagination :currentPage="+($route?.query?.page || 1)" :totalPages="store.totalPages" @update:currentPage="store.fetchQuestions" />
  </div>
</template>

<script lang="ts" setup>
import { PencilIcon } from '@heroicons/vue/20/solid';
import { useQuestionStore } from '~/store/question';
import type { TQuestion } from '~/types/question.type';

const { locale } = useI18n();
const store = useQuestionStore();

const emit = defineEmits(['editQuestion']);
const edit = (question: TQuestion) => emit('editQuestion', question);
</script>