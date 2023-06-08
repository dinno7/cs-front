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
        <h1 class="text-4xl font-semibold py-5">
          {{ post.title }}
        </h1>
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
      <div
        class="w-full relative h-[400px] group rounded-3xl overflow-hidden ring-2 ring-offset-[6px] ring-offset-bg-main/70 ring-blue-400">
        <img width="1024" height="300"
          class="absolute inset-0 object-center  group-hover:blur-[2px] group-hover:scale-110 duration-500 transition-all w-full h-full object-cover"
          :src="normalizedStrapiImgSrcs(post?.image?.formats?.medium?.url || post?.image?.formats?.small?.url || post?.image?.url) || '/images/test-blog.jpg'"
          :alt="post.title">
        <div
          class="text-3xl text-gray-300 bg-gray-700/30 rounded-md backdrop-blur-md absolute z-10 left-1/2 bottom-5 -translate-x-1/2 p-3 transition-all duration-300 ease-in-out group-hover:bg-gray-700/50 group-hover:scale-125 group-hover:backdrop-blur-xl  group-hover:bottom-1/2 group-hover:translate-y-1/2">
          <p v-if="post.brief"
            class="text-lg text-justify line-clamp-3 transition-all ease-in-out duration-300 group-hover:line-clamp-[10]">
            {{ post.brief }}
          </p>
        </div>
      </div>
      <PostAuthor v-if="post?.author?.id" :author="post.author" class="mt-10" />
      <div class="my-5 py-5 border-b-2 border-gray-600 text-justify">
        <p class="font-bold text-3xl">خلاصه</p>
        <p v-if="post.brief" v-html="post.brief" class="text-lg"></p>
      </div>
      <div v-html="normalizedStrapiImgSrcs(post.content)" class="post-contetn text-lg">
      </div>
      <div class="mt-10">
        <div v-if="post.comments.length" class="border-t-2 border-gray-600 pt-5">
          <p class="font-bold text-3xl">کامنت ها</p>
          <p class="text-gray-300/90 pt-2">
            تعداد کامنت های تایید شده :
            <span>{{ post.comments.length }}</span>
          </p>
        </div>


        <PostComments :postId="post.id" />
      </div>
    </div>
  </div>
</template>

<style scoped>
::v-deep .post-contetn * {
  text-align: justify !important;
}
</style>