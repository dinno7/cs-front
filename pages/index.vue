<script setup lang="ts">
import type { Post } from '~/utils/types'

const { find } = useStrapi();
let posts: Post[] = await find('posts', {
  populate: ['comments', 'image', 'category'],
  fields: ['image', 'content', 'title', 'category', 'brief'],
  sort: 'createdAt:desc',
  pagination: { pageSize: 4 }
})

</script>
<template>
  <div class="dark:bg-gray-900 pb-10">
    <BaseHero class="h-screen" />
    <div class="container bg-gray-900 mx-auto text-white my-10">
      <div id="top-posts">
        <h2 class="font-bold text-4xl p-5 pb-7 border-b-2 border-gray-100/40 mb-10">
          آخرین پست ها
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 p-7 lg:py-7">
          <PostHomeFlipCard v-for="post in posts" class="basis-3/12" title="شهر کبک کانادا" :post="post" />
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<style scoped>
.test-styles {
  @apply text-sky-600 bg-sky-100;
}
</style>
