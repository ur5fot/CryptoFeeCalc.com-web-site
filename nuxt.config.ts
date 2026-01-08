export default defineNuxtConfig({
  compatibilityDate: '2025-12-21',
  experimental: {
    appManifest: true
  },
  ssr: true,
  runtimeConfig: {
    public: {
      apiBase: 'https://api.cryptofeecalc.com/'
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  }
})
