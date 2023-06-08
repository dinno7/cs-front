<script setup lang="ts">
// >> Imports
import PostsPageCard from '~/components/Post/PostsPageCard.vue';
import { NOTIFICATION_TYPES, Post } from "~/utils/types";

// >> Defines

// >> Data
let posts = ref<Post[]>([]);

// >> Composable
const { find } = useStrapi();
const route = useRoute();
const { addNotification } = useNotification();


// >> Hooks



// >> Computed

// >> Functions
const fetchPosts = async () => {
  try {
    let res = await find<Post[]>('posts', {
      filters: {
        '$or][0][title][$containsi': route.query.searchItem,
        '$or][1][content][$containsi': route.query.searchItem,
        '$or][2][brief][$containsi': route.query.searchItem,
      },
      populate: ['image', 'author', 'author.avatar', 'category'],
      sort: 'createdAt:desc',
    })

    posts.value = res
    return res
  } catch (error) {
    posts.value = []
    addNotification('متاسفانه مشکلی پیش آمده است.', NOTIFICATION_TYPES.error, 'مشکل در برقراری ارتباط', 10000)
    return
  }
}

watchEffect(async () => {
  await fetchPosts()
})

await fetchPosts()

</script>

<template>
  <div class="min-h-screen container mt-52 mb-20 mx-auto">
    <div v-if="!posts || !posts.length" class="h-[60vh] flex items-center justify-center">
      <p class="text-4xl text-center">
        متاسفانه پستی با موضوع <span class="font-bold">"{{ route.query.searchItem }}"</span> یافت نشد!
      </p>
    </div>
    <div v-else>
      <div class=" pb-20">
        <p class="text-3xl">
          نتایج جستوجو برای
          <span class="font-bold">"{{ route.query.searchItem }}"</span>
        </p>
        <p class="pt-3 text-lg text-gray-300">مجموعا {{ posts.length }} پست پیدا شد.</p>
      </div>
      <div class=" flex flex-col items-center justify-center gap-20">
        <NuxtLink v-for="post in posts" :to="{
            name: 'posts-id',
            params: {
              id: post.id
            }
          }" class="cursor-pointer w-full max-w-6xl">
          <PostsPageCard :post="post" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
