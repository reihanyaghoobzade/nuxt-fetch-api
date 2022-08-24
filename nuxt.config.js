export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'تانک',
        htmlAttrs: {
            lang: 'fa',
            dir: 'rtl',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{
                rel: 'icon',
                type: 'image/x-icon',
                href: 'https://tank.ir/favicon.png',
            },
            {
                rel: 'stylesheet',
                href: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css',
                type: 'text/css',
            },
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
            },
        ],
        script: [{ src: 'https://cdn.tailwindcss.com' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['~assets/main.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/insert-rial-camma.js' },
        { src: '~plugins/to-persian-number.js' },
        { src: '~plugins/format-date.js' },
        { src: '~plugins/multi-range-slider-vue.js', mode: 'client' },
        { src: '~plugins/vue-infinite-loading.js', mode: 'client' },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: 'https://api.tank.ir/api/v-1.0/market/post/',
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: [],

    loading: false,
}
