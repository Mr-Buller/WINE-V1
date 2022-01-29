
export default {
  /*
  ** mode : universal, spa and production,
  ** universal : enabled server rendering
  ** spa : disabled server rendering
  ** production : is for production
  */
  mode: 'production',
  /*
  ** Headers of the page
  */
  env: {
    baseUrl: process.env.BASE_URL || 'https://api.cambodiabusinessjournal.com'
  },
  head: {
    title: 'Albinomosaic',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' },
      { property: 'og:description', name: 'og:description', content: 'ប្រណិតភាពនៃការក្រេបក្លិន' },
      { property: 'og:image', name: 'og:image', content: '/logo.png' },
      { property: 'og:title', name: 'og:title', content: 'Albinomosaic' },
      { property: 'og:type', name: 'og:type', content: 'website' },
      { property: 'og:url', name: 'og:url', content: 'https://www.albinomosaic.com/' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.svg' },
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
    '~/assets/css/form.css',
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
    "@nuxtjs/axios",
    '@nuxtjs/dotenv',
    "@nuxtjs/auth-next"
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
    port: process.env.PORT || 3000, // default: 3000
    host: process.env.HOST || '0.0.0.0', // default: localhost
  },
}
