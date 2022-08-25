<template>
  <div class="flex flex-col justify-between items-center min-h-screen w-full">
    <Header />
    <nuxt keep-alive />
    <Footer />
  </div>
</template>
<script>
export default {
  name: 'DefualtLayout',
}
</script>
