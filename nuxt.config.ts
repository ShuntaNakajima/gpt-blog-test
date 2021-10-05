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
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'shunta.dev' },
      { name: 'twitter:card', content: 'summary_large_image' }
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
    { src: '~/plugins/notion-api.ts', ssr: true },
    { src: '~/plugins/getogp.ts', ssr: true }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@aceforth/nuxt-optimized-images',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@/modules/ogp-api-generator',
    '@/modules/ogp-generator',
    'nuxt-lazy-load'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false,
    extend (config:any, ctx:any) {
      config.node = {
        fs: "empty" 
      }
    }
  },

  styleResources: {
    scss: [
     '@/assets/css/_config.scss',
    ],
  },

  generate: {
    async routes() {
      const pages = await apiClient.getPages()
      const pageListItems = pages.map(page => convertPageListItem(page))
      return pageListItems.map(item => `/blog/${convertStringFormula(item.page_id).string}`)
    }
  },

  optimizedImages: {
    optimizeImages: true,
  },

  router: {
    extendRoutes (routes:any, resolve:any) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/blog/index.vue')
      })
    }
  }
}
