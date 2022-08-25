<template>
  <div class="container mx-auto">
    <Loading v-if="showLoading" class="flex" />
    <div
      v-else-if="showRefreshButton"
      class="flex flex-col justify-center items-center gap-4"
    >
      <div class="text-blue-700 font-bold text-2xl mb-10">
        ظاهرا یه مشکلی پیش اومده. لطفا دوباره تلاش کنید.
      </div>
      <div
        class="flex gap-2 justify-center items-center bg-cyan-700 rounded-xl w-40 h-10 leading-10 text-center text-white cursor-pointer"
        @click="deleteAllFilters"
      >
        <i class="fas fa-redo"></i>
        تلاش مجدد
      </div>
    </div>
    <div v-else class="grid grid-cols-12 gap-8 w-full relative">
      <div class="col-span-3 relative">
        <div class="flex flex-col gap-2 sticky top-10">
          <div>
            <div
              v-for="(ram, index) in Object.entries(filters.ramValues)"
              :key="index"
              class="inline-block"
            >
              <div
                v-if="ram[1] == true"
                class="bg-blue-200 text-blue-600 font-semibold py-1 px-4 rounded-full m-2"
              >
                رم {{ parseInt(ram[0]) }} گیگ
                <span
                  class="cursor-pointer pr-2 text-lg"
                  :aria-label="ram[0]"
                  @click="deleteRamValues($event)"
                  >&times;</span
                >
              </div>
            </div>
            <div
              v-if="$route.query['price-from']"
              class="bg-blue-200 text-blue-600 font-semibold py-1 px-4 rounded-full m-2 inline-block"
            >
              حداقل قیمت: {{ $route.query['price-from'] }}
              <span
                class="cursor-pointer pr-2 text-lg"
                @click="deletePrice('price-from')"
                >&times;</span
              >
            </div>
            <div
              v-if="$route.query['price-to']"
              class="bg-blue-200 text-blue-600 font-semibold py-1 px-4 rounded-full m-2 inline-block"
            >
              حداکثر قیمت: {{ $route.query['price-to'] }}
              <span
                class="cursor-pointer pr-2 text-lg"
                @click="deletePrice('price-to')"
                >&times;</span
              >
            </div>
            <div
              v-if="filters.hasReport"
              class="bg-blue-200 text-blue-600 font-semibold py-1 px-4 rounded-full m-2 inline-block"
              @click="deleteHasReport"
            >
              کارنامه دار
              <span class="cursor-pointer pr-2 text-lg">&times;</span>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <label class="mx-2" for="has-report">آگهی‌های کارنامه دار</label>
            <input
              id="has-report"
              v-model="filters.hasReport"
              type="checkbox"
              @input="hasReported"
            />
          </div>
          <hr />
          <div>
            <div
              class="flex justify-between items-center"
              @click="filters.showRam = !filters.showRam"
            >
              رم
              <img
                src="@/assets/images/arrow.svg"
                alt=""
                :class="{ 'rotate-180': filters.showRam }"
                class="transition-all duration-500"
              />
            </div>
            <div
              :class="{
                'h-40 border border-gray-200 mb-6 mt-4': filters.showRam,
                'h-0': !filters.showRam,
              }"
              class="transition-all duration-300 w-full text-gray-500 flex flex-col overflow-auto mb-2"
            >
              <div class="p-2">
                <input
                  id="2GB"
                  v-model="filters.ramValues['2GB']"
                  type="checkbox"
                  value="2GB"
                  @input="addRamValues"
                />
                <label class="mx-2" for="2GB">۲ گیگابایت</label>
              </div>
              <hr />
              <div class="p-2">
                <input
                  id="3GB"
                  v-model="filters.ramValues['3GB']"
                  type="checkbox"
                  value="3GB"
                  @input="addRamValues"
                />
                <label class="mx-2" for="3GB">۳ گیگابایت</label>
              </div>
              <hr />
              <div class="p-2">
                <input
                  id="4GB"
                  v-model="filters.ramValues['4GB']"
                  type="checkbox"
                  value="4GB"
                  @input="addRamValues"
                />
                <label class="mx-2" for="4GB">۴ گیگابایت</label>
              </div>
              <hr />
              <div class="p-2">
                <input
                  id="6GB"
                  v-model="filters.ramValues['6GB']"
                  type="checkbox"
                  value="6GB"
                  @input="addRamValues"
                />
                <label class="mx-2" for="6GB">۶ گیگابایت</label>
              </div>
              <hr />
              <div class="p-2">
                <input
                  id="8GB"
                  v-model="filters.ramValues['8GB']"
                  type="checkbox"
                  value="8GB"
                  @input="addRamValues"
                />
                <label class="mx-2" for="8GB">۸ گیگابایت</label>
              </div>
            </div>
          </div>
          <hr />
          <div
            class="flex justify-between"
            @click="filters.showPrice = !filters.showPrice"
          >
            محدوده قیمت گوشی
            <img
              src="@/assets/images/arrow.svg"
              alt=""
              :class="{ 'rotate-180': filters.showPrice }"
              class="transition-all duration-300"
            />
          </div>
          <div>
            <div
              dir="ltr"
              :class="{
                'h-40 mt-8': filters.showPrice,
                'h-0': !filters.showPrice,
              }"
              class="overflow-hidden transition-all duration-300 flex flex-col"
            >
              <div class="w-full flex justify-between items-center" dir="rtl">
                <span>از</span>
                <span class="w-24 h-8 bg-gray-100 leading-8 text-center">{{
                  filters.priceFrom
                }}</span>
                <img src="@/assets/images/Toman.svg" alt="" />
                <span>تا</span>
                <span class="w-24 h-8 bg-gray-100 leading-8 text-center">{{
                  filters.priceTo
                }}</span>
                <img src="@/assets/images/Toman.svg" alt="" />
              </div>
              <client-only>
                <MultiRangeSlider
                  :min="0"
                  :max="30000000"
                  :step="100000"
                  :ruler="false"
                  :min-value="filters.priceFrom"
                  :max-value="filters.priceTo"
                  @input="UpdateValues"
                />
              </client-only>

              <button
                class="self-end p-3 border border-black hover:bg-black hover:text-white transition-all duration-200"
                type="button"
                @click="setPrice"
              >
                اعمال محدوده
              </button>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div
        v-if="items.posts.length != 0"
        class="col-span-9 flex justify-self-end items-center"
      >
        <ShowPhone ref="showPhone" :items="items" @fetchMore="fetchMoreData" />
      </div>
      <div v-else class="col-span-9 self-center justify-self-center">
        <span>هیچ آگهی با این شرایط وجود ندارد</span>
        <button
          type="button"
          class="text-white bg-blue-500 px-4 py-2 mr-4"
          @click="deleteAllFilters"
        >
          حذف فیلترها
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from '@/assets/js/fetchData.js'
export default {
  name: 'SearchIndex',
  data() {
    return {
      currentPage: 1,
      showLoading: true,
      showRefreshButton: false,
      query: '',
      filters: {
        priceFrom: 0,
        priceTo: 30000000,
        hasReport: false,
        showRam: false,
        showPrice: false,
        ramValues: {
          '2GB': false,
          '3GB': false,
          '4GB': false,
          '6GB': false,
          '8GB': false,
        },
      },
      items: {},
    }
  },
  key(route) {
    return route.fullPath
  },

  async fetch() {
    try {
      this.showLoading = true
      const { response, result } = await fetch(this.$axios, this.$route.query)
      this.items = { ...response }
      this.query = result

      this.$route.query['has-report'] && (this.filters.hasReport = true)
      if (this.$route.query.rams) {
        this.$route.query.rams.split(',').forEach((value) => {
          this.filters.ramValues[value] = true
        })
        this.$route.query['price-from'] &&
          (this.filters.priceFrom = parseInt(this.$route.query['price-from']))
        this.$route.query['price-to'] &&
          (this.filters.priceTo = parseInt(this.$route.query['price-to']))
      }
    } catch (error) {
      console.error(error)
      this.showRefreshButton = true
    } finally {
      this.showLoading = false
    }
  },
  head: {
    title: 'جست و جو | تانک',
  },
  watchQuery: ['has-report', 'rams', 'price-from', 'price-to', 'q'],
  // activated() {
  //   this.$fetch()
  //   console.log('About has been activated')
  //   this.showLoading = false
  // },
  deactivated() {
    this.showLoading = false
    console.log('About has been deactivated')
  },
  methods: {
    addRamValues() {
      const query = Object.assign({}, this.$route.query)

      if (query.rams) {
        query.rams.includes(`${event.target.value}`)
          ? (query.rams = query.rams
              .replace(`${event.target.value}`, '')
              .split(',')
              .filter(String)
              .join(','))
          : (query.rams += ',' + event.target.value)
      } else {
        query.rams = event.target.value
      }

      query.rams === '' && delete query.rams

      this.$router.push({ query: { ...query } })
      this.showLoading = true
    },
    deleteRamValues(event) {
      const value = event.target.ariaLabel

      const query = Object.assign({}, this.$route.query)

      query.rams = query.rams
        .replace(`${value}`, '')
        .split(',')
        .filter(String)
        .join(',')

      query.rams === '' && delete query.rams

      this.$router.push({ query: { ...query } })
      this.showLoading = true
    },
    hasReported() {
      const query = Object.assign({}, this.$route.query)

      query['has-report']
        ? delete query['has-report']
        : (query['has-report'] = true)

      this.$router.push({ query: { ...query } })
      this.showLoading = true
    },
    deleteHasReport() {
      const query = Object.assign({}, this.$route.query)

      delete query['has-report']

      this.$router.push({ query: { ...query } })
      this.showLoading = true
    },
    deleteAllFilters() {
      this.$router.push({ query: null })
      this.showLoading = true
    },
    setPrice() {
      const query = Object.assign({}, this.$route.query)

      this.filters.priceFrom !== 0
        ? (query['price-from'] = this.filters.priceFrom)
        : query['price-from'] && delete query['price-from']

      this.filters.priceTo !== 30000000
        ? (query['price-to'] = this.filters.priceTo)
        : delete query['price-to']

      this.$router.push({ query: { ...query } })
      this.showLoading = true
    },
    deletePrice(value) {
      const query = Object.assign({}, this.$route.query)
      value === 'price-to'
        ? delete query['price-to']
        : delete query['price-from']

      this.$router.push({ query: { ...query } })
      this.showLoading = true
    },
    UpdateValues(event) {
      this.filters.priceFrom = event.minValue
      this.filters.priceTo = event.maxValue
    },
    async fetchMoreData() {
      this.currentPage++
      try {
        const result = await this.$axios.$get(
          `https://api.tank.ir/api/v-1.0/market/post/search/?limit=12&page=${this.currentPage}` +
            this.query
        )

        if (result.posts.length) {
          this.items.posts = [...this.items.posts, ...result.posts]
          this.$refs.showPhone.$refs.infiniteLoader.stateChanger.loaded()
        } else {
          this.$refs.showPhone.$refs.infiniteLoader.stateChanger.complete()
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style scoped>
:deep(.labels) {
  display: none;
}
:deep(.multi-range-slider) {
  border: none;
  box-shadow: none;
}

:deep(.multi-range-slider .thumb .caption *) {
  display: none;
}

:deep(.multi-range-slider .thumb::before) {
  background-color: black;
  width: 15px;
  height: 15px;
  border: none;
  box-shadow: none;
  margin: -6px;
}

:deep(.multi-range-slider .bar-left) {
  width: 25%;
  background-color: #d4d4d4;
  border-radius: 0;
  box-shadow: none;
  padding: 2px 0px;
}

:deep(.multi-range-slider .bar-right) {
  width: 25%;
  background-color: #d4d4d4;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
}
:deep(.multi-range-slider .bar) {
  height: 4px;
}
:deep(.multi-range-slider .bar-inner) {
  background-color: black;
  border: solid 1px black;
  box-shadow: inset 0px 0px 5px black;
}

#has-report {
  position: relative;
  width: 46px;
  height: 23px;
  border-radius: 60px;
  background-color: gray;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
}

#has-report:checked {
  background-color: rgb(76, 76, 238);
}

#has-report::before {
  content: '';
  position: absolute;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  top: 0;
  right: 23px;
  transform: scale(0.85);
  z-index: 1;
  background-color: white;
  transition: all 0.4s ease-in-out;
}

#has-report:checked::before {
  right: 0;
  background-color: white;
}
</style>
