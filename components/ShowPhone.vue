<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center gap-8 mx-2"
  >
    <div
      v-for="(item, index) in items.posts"
      :key="index"
      class="col-span-1 flex flex-col justify-center items-start w-60 h-auto border border-gray-300"
    >
      <nuxt-link :to="`/${item.id}`">
        <div class="flex flex-col gap-2 w-60 h-60">
          <div class="relative">
            <img
              v-if="item.media[0]?.thumbnail_url"
              class="object-contain absolute -top-px -right-px w-full h-60 border border-t-0 border-gray-300"
              :src="item.media[0]?.thumbnail_url"
              alt=""
            />
            <div v-else-if="item.phone.media">
              <img
                class="object-contain w-60 h-60 py-2"
                :src="item.phone.media"
                alt=""
              />
              <div
                class="absolute bottom-0 -right-px w-full bg-gray-500 text-white font-semibold text-center text-xs h-6 leading-6"
              >
                تصویر گوشی نو درج شده‌است.
              </div>
            </div>
            <div v-else class="">
              <img
                class="object-contain absolute w-full h-60 -top-px -right-px border border-t-0 border-gray-300"
                src="@/assets/images/no-photo.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between items-start w-60 h-36 px-2">
          <div class="">{{ item.title }}</div>
          <div class="flex flex-col gap-2 justify-center items-start w-full">
            <div
              v-if="item.direct_sale"
              class="flex gap-2 items-center justify-center px-2 py-1 bg-cyan-50 rounded-full"
            >
              <i class="fas fa-shield-alt text-cyan-600 block"></i>
              <div class="text-sm h-4 leading-4 text-cyan-700">خرید امن</div>
            </div>
            <div v-if="item.price" class="self-end font-semibold">
              <div class="inline-block mx-1">
                {{ item.price | toPersianNumber | insertRialCamma }}
              </div>
              <img class="inline" src="@/assets/images/Toman.svg" alt="" />
            </div>
            <div v-else class="font-semibold self-end">توافقی</div>
            <div
              v-if="item?.report_cert"
              class="flex justify-between items-center text-xs w-full mb-1"
            >
              <div>{{ item.report_cert.badges[0].name }}</div>
              <div>
                {{ item.report_cert.overall_health | toPersianNumber }}%
              </div>
            </div>
            <div v-else class="text-xs">
              {{ item.created_at | date }} پیش در
              <span class="font-semibold">{{ item.location_name_fa }}</span>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
    <client-only>
      <infinite-loading
        class="col-span-full flex justify-center"
        ref="infiniteLoader"
        @infinite="infiniteHandler"
      >
        <div
          slot="spinner"
          class="w-12 h-12 border-[6px] border-gray-200 border-t-blue-400 rounded-full animate-spin"
        ></div>
        <div slot="no-more" class="font-extrabold"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'ShowPhoneComponent',
  props: {
    items: { type: Object, required: true },
  },
  emits: ['fetchMore'],
  data() {
    return {
      page: 1,
    }
  },
  methods: {
    infiniteHandler($state) {
      this.page += 1
      this.$emit('fetchMore', this.page)
    },
  },
}
</script>
