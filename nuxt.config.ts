// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    serveStatic: true,
  },
  runtimeConfig: {
    public: {
      'API_URL': process.env.API_URL
    }
  },
  modules: ['@pinia/nuxt'],
  ssr: false
})
