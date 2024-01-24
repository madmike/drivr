<template>
  <div>
    <header>
        <!-- Navbar -->
        <nav class="bg-blue-500 p-4 text-white">
            <div class="container mx-auto">
                <div class="flex justify-between items-center">
                    <div class="text-2xl font-bold">Driving Exam</div>

                    <!-- Navigation Links -->
                    <div class="flex items-center space-x-4">
                        <nuxt-link to="/" class="hover:underline">Home</nuxt-link>
                        <!-- <nuxt-link to="/login" class="hover:underline">Login</nuxt-link>
                        <nuxt-link to="/logout" class="hover:underline">Logout</nuxt-link>
                        <nuxt-link to="/help" class="hover:underline">Help</nuxt-link> -->
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <!-- Main Content -->
    <div class="container mx-auto mt-8">
      <slot />
    </div>
    <!-- Footer -->
    <footer class="mt-8 text-center text-gray-500">
        &copy; 2023 Driving Exam Questions
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '../store/auth'; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push('/login');
};
</script>