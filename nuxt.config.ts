import apiClient from "./plugins/notion-api"
import { convertPageListItem, convertStringFormula, PageListItem } from "./util/Interface/Page"

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'portfolio',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/_config.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/google-fonts'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  styleResources: {
    scss: [
     '@/assets/css/_config.scss',
    ],
  },

  googleFonts: {
    families: {
      'Noto+Sans': {
        wght: [400, 500, 700]
      },
      'Noto+Sans+JP': {
        wght: [400, 500,700]
      }
    }
  },

  generate: {
    async routes() {
      const pages = await apiClient.getPages()
      const pageListItems = pages.map(page => convertPageListItem(page))
      return pageListItems.map(item => `/blog/${convertStringFormula(item.page_id).string}`)
    }
  }
}