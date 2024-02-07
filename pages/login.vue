<template>
  <div class="flex flex-col h-screen items-center justify-center gap-y-5">
    <!-- Start Page -->
    <div class="text-white text-center p-8 bg-indigo-950 rounded-lg">
      <h2 class="text-3xl font-semibold mb-6">{{ $t('enter_admin') }}</h2>
      <div v-if="error" class="text-rose-500 text-left mb-2">{{ $t('incorrect_creds') }}</div>
      <form @submit.prevent="login" class="flex flex-col gap-2">
        <input
          type="text"
          id="login"
          v-model="user.login"
          :placeholder="$t('enter_login')"
          required
          class="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="password"
          id="password"
          v-model="user.password"
          :placeholder="$t('enter_password')"
          required
          class="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
        />
        <button type="submit" class="mt-6 bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-md">{{ $t('login') }}</button>
      </form>
    </div>

    <nuxt-link to="/" class="text-center mb-5 text-indigo-800 hover:text-indigo-600">{{ $t('return_quiz') }}</nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '../store/auth'; // import the auth store we just created

definePageMeta({
  middleware: ['auth-middleware'],
});

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const router = useRouter();
const user = ref({
  login: '', 
  password: '',
});
const error = ref<boolean | null>(null);

const login = async () => {
  await authenticateUser(user.value);
  
  if (authenticated.value) {
    error.value = null;
    router.push('/admin');
  } else {
    error.value = true;
  }
};
</script>