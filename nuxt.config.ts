export default defineNuxtConfig({
  compatibilityDate: '2025-12-02',
  css: ['~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables" as *; @use "~/assets/scss/_mixins" as *;'
        }
      }
    }
  }
})
