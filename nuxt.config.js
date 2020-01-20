
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
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.3/dist/semantic.min.css'}
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.3/dist/semantic.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js' },
      { src: './jwt-decode.min.js' }
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
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
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
  }
}
