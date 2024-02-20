<script setup lang="ts">
  import TabBar from '@/components/TabBar.vue'
  import useStore from '@/store/app.js'

  const appStore = useStore()
  console.log(6, appStore.statusBarHeight)
</script>
<template>
  <tab-bar></tab-bar>
  <div class=""> study </div>
</template>

<style scoped lang="scss">
  .test {
  }
</style>
