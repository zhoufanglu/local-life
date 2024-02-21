<script setup>
  const props = defineProps({
    loadingType: {
      type: String,
      default: 'listLoading',
    },
  })
</script>
<template>
  <u-loading-icon
    v-if="loadingType === 'listLoading'"
    text="加载中"
    textSize="20"
  ></u-loading-icon>
</template>

<style scoped lang="scss">
  .test {
  }
</style>
