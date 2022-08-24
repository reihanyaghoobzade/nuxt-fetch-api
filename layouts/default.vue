<template>
  <div class="main">
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

<style>
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100%;
}
</style>
