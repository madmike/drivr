<template>
  <div v-if="$store.stations.length" class="grid grid-cols-3">
    <div
      v-for="station in $store.stations"
      :key="station._id"
      class="p-8"
    >
      <nuxt-link
        :to="`/admin/results/${station.uid}`"
        class="flex flex-col relative items-center text-xl bg-indigo-100 text-indigo-800 rounded-xl hover:text-indigo-600"
        
      >
        <computer-desktop-icon class="h-full w-full"></computer-desktop-icon>
        <span class="absolute top-1/2">{{ station.ip }}</span>
      </nuxt-link>
    </div>
  </div>
  <div v-else>
    No data found
  </div>
</template>

<script type="ts" setup>
import { useResultsStore } from '~/store/results';
import { ComputerDesktopIcon } from '@heroicons/vue/20/solid';

const $store = useResultsStore();

onMounted(() => {
  $store.fetchStations();
});
</script>