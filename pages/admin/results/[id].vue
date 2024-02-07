<template>
  <div v-if="$store.answers">
    <h2 class="text-xl font-bold mb-4">{{ $t('results') }} for user {{ $store.currentUser }}</h2>
    <Results :answers="$store.answers"></Results>
  </div>
  <div v-else>
    No results found
  </div>
</template>

<script type="ts" setup>
import { useResultsStore } from '~/store/results';

const { locale, t } = useI18n();
const $store = useResultsStore();
const $route = useRoute();

onMounted(async () => {
  $store.fetchResults($route.params.id);
});
</script>