
export default {
  /*
  ** mode : universal, spa and production,
  ** universal : enabled server rendering
  ** spa : disabled server rendering
  ** production : is for production
  */
  mode: 'universal',
  /*
  ** Headers of the page
  */
  env: {
    baseUrl: process.env.BASE_URL || 'https://api.cambodiabusinessjournal.com'
  },
  head: {
    title: 'Cambodia Business Journal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' },
      // { property: 'og:description', content: 'HotNews Faster than service 5 stars' },
      // { property: 'og:image', content: 'https://www.cambodiabusinessjournal.com//_nuxt/img/9e17f83.png' },
      // { property: 'og:title', content: 'Cambodia Business Journal' },
      // { property: 'og:type', content: 'website' },
      // { property: 'og:url', content: 'https://www.cambodiabusinessjournal.com'},
      // { property: 'fb:app_id', content: '112456712745118' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
      { rel: 'preconnect', href: 'https://fonts.gstatic.com'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Marcellus&display=swap'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: false,
  // loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/grid.css',
    '~/assets/css/main.css',
    '~/assets/css/pm.css',
    '~/assets/css/swiper.css',
    '~/assets/css/text.css',
    '~/assets/css/wh.css',
    '~/assets/css/color.css',
    '~/assets/css/bg.css',
    '~/assets/css/font-awesome.min.css',
  ],
  /*
  ** Global JS
  */
  script: [

  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/imports/libraries.js', ssr: false }
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
    "@nuxtjs/axios"
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

  server: {
    port: process.env.PORT || 3002, // default: 3000
    host: process.env.HOST || '0.0.0.0', // default: localhost
  },
}
