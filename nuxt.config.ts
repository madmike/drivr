export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
        link: [{ rel: 'icon', type: 'image/svg+xml', href: "/favicon.svg" }]
    },
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
  nitro: {
    plugins: ["~/server/plugins/mongodb.ts"],
  },
  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'ru',
        name: 'Русский'
      },
    ]
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
