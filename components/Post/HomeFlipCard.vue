<script setup lang="ts">
import type { Post } from '~/utils/types'

const { post } = defineProps<{
  post: Post
}>()

const { public: envs } = useRuntimeConfig();

const postBrief = computed(() => {
  if (post.brief) return post.brief
  else if (!post.brief && post.content) {
    let content = post.content.replace(/\<img.*?\>/gi, '')
    return content
  }
  return 'برای مشاهده پست روی دکمه زیر کلیک کنید.'
})


</script>

<template>
  <GlobalCardFlip :frontImg="post?.image?.formats?.small?.url || ''" :backImg="post?.image?.formats?.small?.url || ''">
    <template #front>
      <div class="bg-gray-900/20 rounded-md backdrop-filter backdrop-blur-sm p-5">
        <p class="font-bold text-2xl">{{ post?.title }}</p>
      </div>
    </template>
    <template #back>
      <div
        class="relative overflow-hidden pt-14 bg-gray-900/20 h-[calc(100%-100px)] w-[calc(100%-10px)] mt-3 rounded-lg backdrop-filter backdrop-blur-sm">
        <span v-if="post.category.id" class="text-xs absolute top-2 right-2 bg-gray-50/30 py-1 px-3 rounded-full">
          {{
            post.category.name
          }}
        </span>

        <div class="contents">
          <p class="font-bold text-lg text-white px-2">{{ post.title }}</p>
          <div v-html="postBrief" class="text-sm text-gray-200 text-justify pt-1 px-3 line-clamp-[8]">
          </div>
        </div>
      </div>
    </template>
    <template #back-footer>
      <p class="text-sm">برای مشاهده پست کلیک کنید</p>
      <NuxtLink :to="{ name: 'posts-id', params: { id: post?.id } }" class="btn btn-primary btn-light mr-auto">
        مشاهده</NuxtLink>
    </template>
  </GlobalCardFlip>
</template>

<style scoped>
.card {
  overflow: visible;
  width: 100%;
  height: 400px;
}

.content {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: perspective(500px);
  transition: transform 700ms;
  border-radius: 5px;
}

.front,
.back {
  background-color: #151515;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 5px;
  overflow: hidden;
}

.back {
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  overflow: hidden;

}

.back::before {
  position: absolute;
  content: ' ';
  display: block;
  width: 160px;
  height: 160%;
  background: linear-gradient(90deg, transparent, #ffffffb0, #ffffffb0, #ffffffb0, #ffffffb0, transparent);
  animation: rotation_481 8s infinite linear;
}

.back-content {
  position: absolute;
  width: 99%;
  height: 99%;
  background-color: #151515;
  background-size: cover;
  border-radius: 5px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.card:hover .content {
  transform: rotateY(180deg);
}

@keyframes rotation_481 {
  0% {
    transform: rotateZ(0deg);
  }

  0% {
    transform: rotateZ(360deg);
  }
}

.front {
  transform: rotateY(180deg);
  color: white;
}

.front .front-content {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.front .bg-img {
  background-size: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  inset: 0;
  transform: scale(1.2);
}
</style>