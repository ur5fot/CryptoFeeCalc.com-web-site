export default defineNuxtConfig({
  compatibilityDate: '2025-12-21',
  experimental: {
    appManifest: true
  },
  ssr: false,
  runtimeConfig: {
    public: {
      apiBase: 'https://cryptofeecalc-api.ur5fot.workers.dev'
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  }
})
