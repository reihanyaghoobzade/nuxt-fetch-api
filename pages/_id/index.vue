<template>
  <div class="container mx-auto pt-20">
    <div class="grid grid-cols-2 justify-start gap-20 items-start">
      <div class="col-span-1 flex flex-col gap-6 justify-start items-start">
        <div class="flex flex-col gap-4">
          <h3 class="text-3xl">{{ item.title }}</h3>
          <div class="flex gap-4 text-gray-500">
            <div>
              {{ item.updated_at | date }} پیش . {{ item.location.name_fa }}
            </div>
            <span>|</span>
            <div>شماره آگهی : {{ item.id }}</div>
          </div>
        </div>
        <div class="flex w-full gap-2 justify-end items-center">
          <div class="font-bold text-3xl">
            {{ parseInt(item.price) | toPersianNumber | insertRialCamma }}
          </div>
          <img class="w-8" src="@/assets/images/Toman.svg" alt="" />
        </div>
        <div class="flex w-full gap-2 text-center text-xl font-bold text-white">
          <div class="flex justify-between w-11/12 bg-blue-500 p-4">
            <span>خرید</span>
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
          <div class="w-1/12 bg-green-600 py-4">
            <i class="fa-solid fa-phone"></i>
          </div>
        </div>
        <div v-if="item.sub_phone" class="flex w-full flex-col text-gray-400">
          <div class="flex justify-between py-4 border-b-2">
            <div class="flex gap-2 items-center justify-center">
              <i class="fas fa-memory"></i>
              <span>رم</span>
            </div>
            <div>
              <span>
                {{ parseInt(item.sub_phone.ram) | toPersianNumber }}
              </span>
              <span>گیگابایت</span>
            </div>
          </div>
          <div class="flex justify-between py-4 border-b-2">
            <div class="flex gap-2 items-center justify-center">
              <i class="fas fa-mobile"></i>
              <span>حافظه داخلی</span>
            </div>
            <div>
              <span>
                {{ parseInt(item.sub_phone.internal_memory) | toPersianNumber }}
              </span>
              <span>گیگابایت</span>
            </div>
          </div>
          <div class="flex justify-between py-4 border-b-2">
            <div class="flex gap-2 items-center justify-center">
              <i class="fas fa-palette"></i>
              <span>رنگ گوشی</span>
            </div>
            <div>{{ item.sub_phone.var_color.name_fa }}</div>
          </div>
        </div>
      </div>
      <div class="col-span-1 flex flex-col gap-10 justify-start items-start">
        <div class="w-full flex justify-end text-3xl gap-12 text-gray-400">
          <i class="fa-solid fa-share-nodes"></i>
          <i class="far fa-bookmark"></i>
        </div>
        <div class="flex w-full justify-end">
          <img
            v-if="item.cover?.normal_url"
            :src="item.cover.normal_url"
            alt=""
          />
          <img
            v-else-if="item.phone?.media"
            class="w-10/12 p-16 border"
            :src="item.phone.media"
            alt=""
          />
          <div v-else class="w-[600px] h-[600px] border"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhonePage',
   meta: {
    scrollPos: {
      x: 0,
      y: 0,
    },
  },
  scrollToTop: true,
  async asyncData(context) {
    const response = await context.$axios.$get(`${context.params.id}`)
    return { item: response.post }
  },
}
</script>

<style></style>
