<script setup lang="ts">
// >> Imports
import { Post } from "~/utils/types";
import PostsPageCard from '~/components/Post/PostsPageCard.vue';


// >> Defines

// >> Composable
const { find } = useStrapi<Post>();

// >> Data
let posts = ref<Post[]>([])
const pagination = reactive<{ page: number, limit: number, pageCount: number }>({
  page: 1,
  limit: 5,
  pageCount: 0
})
let fetching = ref<boolean>(false)
const filters = reactive<{
  sort: string[] | string
}>({
  sort: "createdAt:desc"
})

// >> Computed


// >> Functions
const fetchPosts = async () => {
  fetching.value = true
  const { data, meta } = await find<Post[]>('posts', {
    populate: ['image', 'author', 'author.avatar'],
    sort: filters.sort,
    pagination: {
      page: pagination.page,
      pageSize: pagination.limit
    },
    meta: true,
  })
  posts.value = data
  pagination.pageCount = meta.pagination.pageCount

  fetching.value = false
}
const goNextPage = async () => {
  pagination.page++
  await fetchPosts()
  document.documentElement.scrollIntoView({ behavior: 'smooth' })
}


const goPrevPage = async () => {
  pagination.page--
  await fetchPosts()
  document.documentElement.scrollIntoView({ behavior: 'smooth' })
}

const goPage = async (pageNumber: number) => {
  pagination.page = pageNumber
  await fetchPosts()
  document.documentElement.scrollIntoView({ behavior: 'smooth' })
}

const changeSortition = async (sort: string[] | string) => {
  filters.sort = sort
  await fetchPosts()
  document.documentElement.scrollIntoView({ behavior: 'smooth' })
}

// >> Hooks
await fetchPosts()


</script>

<template>
  <div class="container mx-auto mb-32 mt-40 flex">

    <!-- Right section -->
    <div class="hidden md:block md:basis-4/12 lg:basis-3/12 md:pl-10 xl:pl-20 ">
      <div class="sticky top-10">
        <p class="text-3xl font-semibold">ترتیب</p>
        <div class="flex items-center justify-start gap-3 mt-5">
          <button @click="changeSortition('createdAt:desc')" class="btn btn-primary"
            :class="[!(filters.sort + '').includes('createdAt:desc') && 'btn-outlined']">
            تازه ترین
          </button>
          <button @click="changeSortition('createdAt')" class="btn btn-primary"
            :class="[(filters.sort + '').includes('createdAt:desc') && 'btn-outlined']">
            قدیمی ترین
          </button>
        </div>
      </div>
    </div>
    <!-- Left section -->
    <div class="flex-1 md:basis-8/12 lg:basis-9/12">
      <div>
        <h1 class="font-bold text-4xl">مقالات</h1>
        <p class="py-4 font-medium text-lg text-gray-300">در این صفحه شما میتوانید موجود را بخوانید</p>
      </div>
      <GlobalPagination v-if="pagination.pageCount" class="mb-20" :pagination="pagination" @page:next="goNextPage"
        @page:prev="goPrevPage" @page:number="goPage" />
      <transition mode="out-in" enter-active-class="ease-in-out duration-250 transition" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition ease-ins duration-250" leave-from-class="opacity-100"
        leave-to-class="opacity-0  ">
        <div v-if="fetching" class="flex items-center justify-center">
          <GlobalLoading />
        </div>
        <div v-else class="flex flex-col gap-20">
          <NuxtLink v-for="post in posts" :to="{
              name: 'posts-id',
              params: {
                id: post.id
              }
            }" class="cursor-pointer">
            <PostsPageCard :post="post" />

          </NuxtLink>
        </div>
      </transition>
      <GlobalPagination v-if="pagination.pageCount" class="mt-20" :pagination="pagination" @page:next="goNextPage"
        @page:prev="goPrevPage" @page:number="goPage" />
    </div>
  </div>
</template>