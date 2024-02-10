<template>
  <div class="flex items-center justify-center gap-1">
    <button
      v-if="currentPage > 1"
      @click="goToPage(1)"
      class="px-2 py-1 text-gray-700 bg-white rounded-md border border-transparent hover:border-indigo-600 disabled:opacity-50"
    >
      <chevron-double-left-icon class="w-6 h-6"></chevron-double-left-icon>
    </button>
    <button
      v-if="currentPage > 1"
      @click="goToPage(currentPage - 1)"
      class="px-2 py-1 text-gray-700 bg-white rounded-md border border-transparent hover:border-indigo-600 disabled:opacity-50"
    >
      <chevron-left-icon class="w-6 h-6"></chevron-left-icon>
    </button>

    <button
      v-for="page in pages"
      :key="page"
      @click="goToPage(page)"
      :class="['px-2 py-1 w-12 rounded-md', page === currentPage ? 'bg-indigo-800 text-white hover:bg-indigo-600' : 'text-gray-700 bg-white border border-transparent hover:border-indigo-600']"
      class="focus:outline-none"
    >
      {{ page }}
    </button>

    <button
      v-if="currentPage < totalPages"
      @click="goToPage(currentPage + 1)"
      class="px-2 py-1 text-gray-700 bg-white rounded-md border border-transparent hover:border-indigo-600 disabled:opacity-50"
    >
      <chevron-right-icon class="w-6 h-6"></chevron-right-icon>
    </button>
    <button
      v-if="currentPage < totalPages"
      @click="goToPage(totalPages)"
      class="px-2 py-1 text-gray-700 bg-white rounded-md border border-transparent hover:border-indigo-600 disabled:opacity-50"
    >
      <chevron-double-right-icon class="w-6 h-6"></chevron-double-right-icon>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';
import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/vue/20/solid';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits(['update:currentPage']);
const router = useRouter(); // Access the router instance

const siblingCount = 1;
const totalNumbers = computed(() => siblingCount + 5);
const totalBlocks = computed(() => totalNumbers.value + 2);

const pages = computed(() => {
  const totalNumbersValue = totalNumbers.value;
  const totalBlocksValue = totalBlocks.value;

  if (props.totalPages <= totalBlocksValue) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(props.currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(props.currentPage + siblingCount, props.totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < props.totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = props.totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', lastPageIndex];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from({ length: rightItemCount }, (_, i) => lastPageIndex - rightItemCount + i + 1);
    return [firstPageIndex, '...', ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from({ length: 1 + 2 * siblingCount }, (_, i) => leftSiblingIndex + i);
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
  }
});

function goToPage(page: number | string) {
  if (typeof page === 'string') return;
  if (page < 1 || page > props.totalPages) return;

  router.push({ query: { ...router.currentRoute.value.query, page: page.toString() } });
  emit('update:currentPage', page);
}
</script>

<style scoped>
button[disabled] {
  cursor: not-allowed;
}
</style>
