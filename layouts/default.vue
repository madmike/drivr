<template>
  <div class="h-full">
    <header v-if="quiz.isQuizStarted || auth.authenticated">
        <!-- Navbar -->
        <nav class="bg-indigo-950 p-4 text-white">
            <div class="container mx-auto">
                <div class="flex justify-between items-center">
                    <div class="text-2xl font-bold">{{ quiz.isQuizStarted ? quiz.userName : $t('teacher_room') }}</div>
                    <div v-if="quiz.isQuizStarted" class="flex flex-col gap-[2px] justify-center">
                      <div class="flex justify-center">{{ Object.keys(quiz.questions).findIndex(id => id === quiz.currentQuestion?._id)+1 }} / {{ Object.keys(quiz.questions).length }}</div>
                      <div class="flex h-2 w-32 rounded-sm overflow-hidden bg-white/20">
                        <div class="bg-emerald-700" :style="`width: ${quiz.correctAnswersPercent}%`"></div>
                        <div class="bg-rose-800" :style="`width: ${quiz.wrongAnswersPercent}%`"></div>
                      </div>
                    </div>
                    <!-- Navigation Links -->
                    <div class="flex items-center space-x-4">
                      <Select :selected="i18n.locale.value" :options="i18n.locales.value.map(l => ({id: l.code, value: l.name}))" @change-value="updateLocale" />
                      <a
                        href="#"
                        @click="quit"
                        class="block px-6 py-2 border border-gray-900 shadow-sm rounded-xl shadow-white/20 hover:bg-white/5"
                      >
                        {{ $t('quit') }}
                      </a>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <header v-else>
      <div class="relative z-10 container mx-auto flex justify-end py-5">
        <nuxt-link v-if="!$route.path.match(/^\/(login|admin)/)" to="/admin" class="text-indigo-800 hover:text-indigo-600">{{ $t('go_admin') }}</nuxt-link>
        <nuxt-link v-else to="/" class="text-center mb-5 text-indigo-800 hover:text-indigo-600">{{ $t('return_quiz') }}</nuxt-link>
      </div>
    </header>
    <!-- Main Content -->
    <div class="container mx-auto">
      <slot />
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/store/auth';
import { useQuizStore } from '~/store/quiz';
import { useResultsStore } from '~/store/results';

const router = useRouter();
const i18n = useI18n();

const auth = useAuthStore();
const quiz = useQuizStore();
const results = useResultsStore();

const quit = () => {
  if (quiz.isQuizStarted) {
    quiz.quitQuiz();
    results.resultsUID = null;
  } else if (auth.authenticated) {
    auth.logOut();
  }

  router.push('/');
};

const updateLocale = async (value:any) => {
  i18n.setLocale(value.id);
}
</script>