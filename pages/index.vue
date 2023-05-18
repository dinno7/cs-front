<script setup lang="ts">
const { addNotification } = useNotification()
</script>
<template>
  <div class="bg-gray-900">
    <BaseHero class="h-[calc(100vh-4rem)]" />
    <div class="container bg-gray-900 mx-auto text-white mt-10">
      <div id="top-posts">
        <h2 class="font-bold text-4xl p-5 pb-7 border-b-2 border-gray-100/40 mb-10">پست های پربازدید</h2>
        <div class="flex flex-wrap gap-10 items-center justify-evenly">
          <GlobalCardFlip v-for="card in 4" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test-styles {
  @apply text-sky-600 bg-sky-100
}
</style>