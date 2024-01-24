<template>
  <div v-for="user in users">
    <div>{{ user.name }}: {{ user.email }}</div>
  </div>
</template>
<script setup lang="ts">
  const { data: users } = await useFetch('/api/users')
</script>