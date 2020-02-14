
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.3/dist/semantic.min.css'},
      { rel: 'stylesheet', type: 'text/css', href: 'https://unpkg.com/jsoneditor@8.5.3/dist/jsoneditor.css' }
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.3/dist/semantic.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js' },
      { src: 'https://unpkg.com/jsoneditor@8.5.3/dist/jsoneditor.js' },
      { src: '/jwt-decode.min.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/filters.js',
    '~/plugins/vue-promised',
    '~/plugins/refresh-webtoken',
    '~/plugins/vue-text-highlight'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  router: {
    linkActiveClass: "active",
    linkExactActiveClass: "exact"
  },
  env: {
    SugarAPI: process.env.SUGAR_API,
    SugarTimberSourceID: process.env.SUGAR_TIMBER_SOURCE_ID,
    SugarTimberAPIKey: process.env.SUGAR_TIMBER_API_KEY
  },
  server: {
    host: "0.0.0.0",
    port: 8000
  }
}
