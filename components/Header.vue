<template>
  <section class="shadow-lg py-4 mb-12 w-full">
    <header class="container mx-auto">
      <div class="flex justify-between items-center">
        <div class="flex justify-start items-center w-full">
          <input
            v-model.lazy.trim="search"
            type="text"
            placeholder="جستجو در تانک..."
            class="bg-gray-100 h-10 w-1/3 px-2 focus:outline-none"
            @keyup.enter="searchQuery"
          />
          <div class="bg-gray-100 h-10 leading-10 px-2" @click="searchQuery">
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
        <a href="https://tank.ir">
          <img
            src="https://tank.ir/_nuxt/img/logoType.cdfbb44.svg"
            alt="tank logo"
            width="150"
          />
        </a>
      </div>
    </header>
  </section>
</template>

<script>
export default {
  name: 'HeaderComponent',
  emits: ['searchBar'],
  data() {
    return {
      search: '',
    }
  },
  methods: {
    searchQuery() {
      // console.log(this.search)
      const query = { ...this.$route.query }
      this.search === '' ? delete query.q : (query.q = this.search)
      this.$router.replace({
        path: '/',
        query: { ...query },
      })
    },
  },
}
</script>
