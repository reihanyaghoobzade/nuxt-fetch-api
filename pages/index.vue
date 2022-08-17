<template>
  <client-only>
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
        >
          <i class="fas fa-redo"></i>
          تلاش مجدد
        </div>
      </div>
      <div v-else class="grid grid-cols-12 gap-8 w-full">
        <div class="col-span-3 flex flex-col gap-2">
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
                  filters.price.priceFrom | toPersianNumber | insertRialCamma
                }}</span>
                <img src="@/assets/images/Toman.svg" alt="" />
                <span>تا</span>
                <span class="w-24 h-8 bg-gray-100 leading-8 text-center">{{
                  filters.price.priceTo | toPersianNumber | insertRialCamma
                }}</span>
                <img src="@/assets/images/Toman.svg" alt="" />
              </div>
              <MultiRangeSlider
                :min="0"
                :max="30000000"
                :step="100000"
                :ruler="false"
                :min-value="filters.price.priceFrom"
                :max-value="filters.price.priceTo"
                @input="UpdateValues"
              />
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
        <div
          class="col-span-9 flex justify-center items-center justify-self-end"
        >
          <div
            v-if="items.posts.length != 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center gap-8 mx-2"
          >
            <ShowPhone
              v-for="item in items?.posts"
              :key="item.id"
              :data="item"
              class="col=-span-1"
            />
          </div>
          <div v-else>
            <span>هیچ آگهی با این شرایط وجود ندارد</span>
            <button type="button" class="text-white bg-blue-500 px-4 py-2 mr-4">
              حذف فیلترها
            </button>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'IndexPage',

  async asyncData(context) {
    try {
      let query
      context.query.q !== undefined
        ? (query = '&search_phrase=' + context.query.q)
        : (query = '')
      const response = await context.$axios.$get(
        'https://api.tank.ir/api/v-1.0/market/post/search/?limit=20&page=1' +
          query
      )
      response.posts.forEach((item) => {
        const createdTime = {
          now: new Date(),
          created: new Date(item.created_at),
        }
        const createdAt = (createdTime.now - createdTime.created) / 1000

        createdAt < 60
          ? (item.created_at = 'چند ثانیه')
          : (item.created_at = `${Math.floor(createdAt / 60)} دقیقه`)
      })
      return { items: { ...response }, showLoading: false }
    } catch (error) {
      console.error(error)
      return { showRefreshButton: true, showLoading: false }
    }
  },
  data() {
    return {
      mainUrl:
        'https://api.tank.ir/api/v-1.0/market/post/search/?limit=40&page=1',
      url: 'https://api.tank.ir/api/v-1.0/market/post/search/?limit=40&page=1',
      showLoading: true,
      showRefreshButton: false,
      filters: {
        price: {
          priceFrom: 0,
          priceTo: 30000000,
          oldPriceFrom: 0,
          oldPriceTo: 30000000,
        },
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
  head: {
    title: 'جست و جو | تانک',
  },
  watch: {
    $route(to, from) {
      if (to.query.q !== undefined) {
        this.url.includes('&search_phrase')
          ? (this.url = this.url.replace(
              `&search_phrase=${from.query.q}`,
              `&search_phrase=${to.query.q}`
            ))
          : (this.url += `&search_phrase=${to.query.q}`)
      } else {
        this.url = this.url.replace(`&search_phrase=${from.query.q}`, '')
      }
      this.getNewData()
    },
  },
  methods: {
    addRamValues() {
      this.url.includes(`&ram_values=${event.target.value}`)
        ? (this.url = this.url.replace(`&ram_values=${event.target.value}`, ''))
        : (this.url += `&ram_values=${event.target.value}`)

      this.filters.ramValues[event.target.value] =
        !this.filters.ramValues[event.target.value]

      this.getNewData()
    },
    deleteRamValues(event) {
      const value = event.target.ariaLabel
      this.filters.ramValues[value] = false
      this.url = this.url.replace(`&ram_values=${value}`, '')

      this.getNewData()
    },
    hasReported() {
      this.url.includes('&has_report=true')
        ? (this.url = this.url.replace('&has_report=true', ''))
        : (this.url += '&has_report=true')
      this.getNewData()
      this.filters.hasReport = !this.filters.hasReport
    },
    deleteHasReport() {
      this.url = this.url.replace('has_report=true', '')
      this.filters.hasReport = false
      this.getNewData()
    },
    deleteAllFilters() {
      this.filters.hasReport = false

      Object.keys(this.filters.ramValues).forEach(
        (key) => (this.filters.ramValues[key] = false)
      )

      this.filters.price.priceFrom = this.filters.price.oldPriceFrom = 0
      this.filters.price.priceTo = this.filters.price.oldPriceTo = 30000000

      this.url = this.mainUrl

      this.getNewData()
    },
    setPrice() {
      this.filters.price.priceFrom !== 0
        ? (this.url = this.url.replace(
            `&price_from=${this.filters.price.oldPriceFrom}`,
            ''
          )) && (this.url += `&price_from=${this.filters.price.priceFrom}`)
        : (this.url = this.url.replace(
            `&price_from=${this.filters.price.oldPriceFrom}`,
            ''
          ))

      this.filters.price.oldPriceFrom = this.filters.price.priceFrom

      this.filters.price.priceTo !== 30000000
        ? (this.url = this.url.replace(
            `&price_to=${this.filters.price.oldPriceTo}`,
            ''
          )) && (this.url += `&price_to=${this.filters.price.priceTo}`)
        : (this.url = this.url.replace(
            `&price_to=${this.filters.price.oldPriceTo}`,
            ''
          ))

      this.filters.price.oldPriceTo = this.filters.price.priceTo

      this.getNewData()
    },
    async getNewData() {
      try {
        this.showLoading = true
        this.items = await this.$axios.$get(this.url)
      } catch (error) {
        console.error(error)
        this.showRefreshButton = true
      } finally {
        this.showLoading = false
      }
    },
    UpdateValues(event) {
      this.filters.price.priceFrom = event.minValue
      this.filters.price.priceTo = event.maxValue
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
