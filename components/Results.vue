<template>
    <div v-for="(answer, index) in answers" :key="index" class="bg-white my-6 p-8 rounded-lg shadow-md">
      <p class="text-lg font-semibold text-gray-800 mb-2">{{ index + 1 }}. {{ (answer.question as TQuestion).question[locale] }}</p>
      <!-- Highlight chosen option with helper function -->
      <p
        v-for="(option, optionIndex) in (answer.question as TQuestion).options"
        :key="optionIndex"
        :class="getOptionStyle(answer, optionIndex)"
      >
        {{ getOptionLabel(answer, optionIndex) }}: {{ option[locale] }}
      </p>
    </div>
</template>

<script lang="ts" setup>
import type { TQuestion } from '~/types/question.type';
import type { TAnswer } from '~/types/result.type';

defineProps<{answers: TAnswer[]}>();
const { locale, t } = useI18n();

const getOptionStyle = (answer: TAnswer, optionIndex: number) => {
  const classes: Record<string, 1> = {};
  const question = answer.question as TQuestion;
  
  if (optionIndex === question.correctOption) {
    classes['font-bold'] = 1;
  }

  if (optionIndex === answer.answer) {
    classes[optionIndex === question.correctOption ? 'text-indigo-500' : 'text-rose-600'] = 1
  } else if (optionIndex === question.correctOption) {
    classes['text-emerald-500'] = 1;
  }

  return classes;
};

const getOptionLabel = (answer: TAnswer, optionIndex: number) => {
  const question = answer.question as TQuestion;

  if (optionIndex === answer.answer) {
    return t('your_choice');
  } else if (optionIndex === question.correctOption) {
    return t('correct_option');
  } else {
    return t('option');
  }
};
</script>