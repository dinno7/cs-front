<script setup lang="ts">
import { Post, User } from "~/utils/types";

const route = useRoute()
const { findOne } = useStrapi();
const post = ref<Post | null>(null)
let fetching = ref<boolean>(false)

const fetchOnePost = async () => {
  fetching.value = true
  let getPost = await findOne<Post>('/posts', route.params.id + '', {
    populate: ['image', 'comments', 'category', 'author.avatar']
  })
  post.value = getPost
  fetching.value = false
}

const moment = useMoment();

await fetchOnePost()
</script>


<template>
  <div v-if="fetching">
    <GlobalLoading />
  </div>
  <div v-else-if="!fetching && post" class="overflow-x-hidden">
    <div class="container mx-auto my-20 max-w-4xl">
      <div class="mb-5">
        <p class="text-4xl py-5">
          {{ post.title }}</p>
        <p>
          <span>
            <VIcon name="heroicons:clock" />
            بروزرسانی در
            {{ moment(post.updatedAt).locale('fa').format('DD MMMM YYYY ساعت HH:mm') }}
          </span>
          <span class="px-2 text-blue-300">|</span>
          <span>
            <VIcon name="heroicons:tag" />
            {{ post.category.name }}
          </span>
        </p>
      </div>
      <div class="w-full relative h-[400px] group rounded-3xl overflow-hidden">
        <img width="1024" height="300"
          class="absolute inset-0 object-center blur-[2px] group-hover:blur-none group-hover:scale-110 duration-500 transition-all w-full h-full object-cover"
          :src="normalizedStrapiImgSrcs(post?.image?.formats?.medium?.url) || '/images/test-blog.jpg'" :alt="post.title">
        <div
          class="text-3xl text-gray-300 bg-gray-700/30 rounded-md backdrop-blur-md absolute z-10 left-1/2 bottom-5 -translate-x-1/2 p-3">
          <p v-if="post.brief" class="text-lg text-justify line-clamp-3">
            {{ post.brief }}
          </p>
        </div>
      </div>
      <PostAuthor v-if="post?.author?.id" :author="post.author" class="mt-5" />
      <div class="my-5 py-5 border-b-2 border-gray-600 text-justify">
        <p class="font-bold text-2xl">خلاصه</p>
        <p v-if="post.brief" v-html="post.brief" class="text-lg"></p>
      </div>
      <div v-html="normalizedStrapiImgSrcs(post.content)" class="post-contetn space-y-10">
      </div>
      <PostComments :postId="post.id" />
    </div>
  </div>
</template>

<style scoped>
.post-contetn * {
  text-align: justify !important;
}
</style>