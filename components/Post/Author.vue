
<script setup lang="ts">
// >> Imports

import { User } from "~/utils/types"

// >> Defines
const { author } = defineProps<{
  author: User
}>()

// >> Hooks

// >> Data

// >> Composable

// >> Computed
const authorAvatar = computed(() => {
  const avatarUrl = author?.avatar?.url
  if (avatarUrl) return normalizedStrapiImgSrcs(avatarUrl)
  return '/images/user-photo.png'
})

// >> Functions

</script>
<template>
  <div class="flex gap-2 items-center justify-start ">
    <img class="w-[45px] h-[45px] aspect-square object-cover rounded-full" :src="authorAvatar" alt="Author">
    <div class="flex flex-col text-sm dark:text-gray-200">
      <p class="font-bold">{{ author.firstName + ' ' + author.lastName }}</p>
      <p>{{ author.field }}</p>
    </div>
  </div>
</template>