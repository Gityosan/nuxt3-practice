import vuetify from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      charset: 'utf-8',
      meta: [
        { name: 'description', content: '' },
        { name: 'viewport', content: 'width=device-width' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'noindex,nofollow' }
      ]
    }
  },
  typescript: {
    shim: false,
    strict: true
  },
  css: ['vuetify/styles', '@/assets/css/index.scss'],
  build: {
    transpile: ['vuetify']
  },
  modules: [
    '@nuxtjs/critters',
    (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        if (config.plugins) config.plugins.push(vuetify())
      })
    }
  ],
  critters: {
    config: {
      preload: 'swap',
      pruneSource: true
    }
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    },
    server: {
      watch: {
        usePolling: true
      }
    }
  },
  runtimeConfig: {
    public: {
      MICROCMS_API_KEY: '',
      MICROCMS_API_URL: '',
      GOOGLE_MAPS_JS_API_KEY: '',
      GOOGLE_FORM_URL: '',
      MAILSERVER: '',
      MAILER_AUTH_USER: '',
      MAILER_AUTH_PASS: '',
      MAILER_FROM_MAILADDRESS: ''
    }
  },

  devtools: {
    enabled: true
  }
})
