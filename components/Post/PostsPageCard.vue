<script setup lang="ts">
// >> Imports
import type { Post } from "~/utils/types"

// >> Defines
const { post } = defineProps<{
  post: Post
}>()

// >> Hooks

// >> Data

// >> Composable
const moment = useMoment();

// >> Computed
const postImage = computed(() => {
  const postImgUrl = post?.image?.url
  if (postImgUrl) return normalizedStrapiImgSrcs(postImgUrl)
  return '/images/test-blog.jpg'
})

// >> Functions


</script>

<template>
  <div class="flex flex-col md:flex-row  items-center justify-start md:max-h-[300px] md:h-[300px]  rounded-lg ">
    <div class="h-74 md:h-full md:w-5/12 rounded-2xl overflow-hidden max-w-full  md:max-w-[300px] md:max-h-[300px]"
      width="300" height="300">
      <img class="object-cover object-center w-full md:h-full md:aspect-square" :src="postImage" alt="Post image">
    </div>
    <div class="md:h-full md:flex-1 flex flex-col items-start justify-between h-full px-4 mt-7 md:mt-0 py-2">
      <div>
        <p class="text-sm text-gray-500 pb-1">نوشته شده در
          {{
            moment(post.createdAt).locale('fa').format('DD MMMM YYYY ساعت HH:mm')
          }}
        </p>
      </div>
      <div class="my-7">
        <h2 class="mb-2 font-bold text-gray-900 text-lg dark:text-gray-50">{{ post.title }}</h2>
        <p class="line-clamp-5 text-justify dark:text-gray-400">
          {{ post.brief || 'برای مشاهده کامل این پست میتوانید روی این پست کلیک کرده تا وارد صفحه این پست شوید' }}
        </p>
      </div>
      <div class="flex gap-2 items-center justify-between border-t-2  w-full pt-5 border-gray-800 ">
        <PostAuthor :author="post.author" v-if="post?.author?.id" />
        <p class="text-sm text-gray-500 pb-1 self-end">
          آخرین آپدیت
          <br />
          {{ moment(post.updatedAt).locale('fa').format('DD MMMM YYYY ساعت HH:mm') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>