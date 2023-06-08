<script setup lang="ts">
// >> Imports
import { NOTIFICATION_TYPES, PostComment } from "~/utils/types";

// >> Defines
const { postId } = defineProps<{ postId: string | number }>()

// >> Hooks
onMounted(() => {
  if (comments?.length) {
    commentsSectionHeight.value = +allShownComments?.value?.getBoundingClientRect()?.height;
    const firstComments = document.querySelectorAll(`.comment-box:nth-child(-n+${showNthFirstComments.value})`);
    if (comments.length > showNthFirstComments.value) {
      needCommentLoader.value = true

      let firstCommentsHeight: HTMLElement[] | number[] = Array.from(firstComments).map(c => c.getBoundingClientRect().height)
      let sum = 0
      firstCommentsHeight.forEach(h => {
        sum += h
      })
      showNthFirstCommentsHeight.value = sum
      allShownCommentsWrapper.value.style.height = showNthFirstCommentsHeight.value + 55 * showNthFirstComments.value + 'px' || '200px'
    }
  }
})
// >> Data
const sending = ref<boolean>(false)
const allShownComments = ref<HTMLElement | null>(null)
const commentsSectionHeight = ref<number>()
const allShownCommentsWrapper = ref<HTMLElement | null>(null)
const commentsCollapsed = ref<boolean>(true)
const showNthFirstComments = ref<number>(2)
const showNthFirstCommentsHeight = ref<number>(200)
const needCommentLoader = ref<boolean>(false)

// >> Composable
const moment = useMoment();
const userComment = reactive<{ fullName: string, message: string }>({
  fullName: '',
  message: '',
})
const { create, find } = useStrapi();
const { fetchUser } = useStrapiAuth();
const $user = await fetchUser()
const comments = await find<PostComment[]>('comments', {
  populate: ['author.avatar'],
  filters: {
    'post][id][$eq': postId
  }
})
const { addNotification } = useNotification();


// >> Computed

// >> Functions
const sendComment = async () => {
  sending.value = true
  let res = await create('comments', { ...userComment, post: postId })
  addNotification('پیام شما با موفقیت ارسال شد و پس از تایید توسط ادمین در زیر این پست نمایش داده خواهد شد.', NOTIFICATION_TYPES.success, 'ارسال کامنت', 10000)
  sending.value = false
  userComment.fullName = ''
  userComment.message = ''
}
const toggleComments = () => {
  if (commentsCollapsed.value) {
    allShownCommentsWrapper.value.style.height = commentsSectionHeight.value + 30 * showNthFirstComments.value + 'px'
    commentsCollapsed.value = false
    return
  }
  allShownCommentsWrapper.value.style.height = showNthFirstCommentsHeight.value + 55 * showNthFirstComments.value + 'px' || '200px'
  commentsCollapsed.value = true
  return
}

</script>

<template>
  <div class="overflow-hidden">
    <div v-if="comments.length">
      <div class="transition-all duration-500" ref="allShownCommentsWrapper" style="overflow: hidden;">
        <div class="max-w-3xl mx-auto" ref="allShownComments">
          <div v-for="comment in comments" :key="comment.id" class="comment-box relative mt-[50px] mr-7">
            <div class="flex items-start justify-start gap-3">
              <div>
                <img :src="userAvatar(comment.author.avatar.url)"
                  class="w-[45px] h-[45px] ring-1 ring-white/60 rounded-full object-center object-cover" width="45"
                  height="45" :alt="comment.author.username">
              </div>
              <div class="w-10/12 text-justify bg-gray-700/60 px-5 pt-7 pb-3 rounded-lg relative">
                <span class="absolute left-5 top-4 text-xs">
                  {{
                    moment(comment.createdAt).locale('fa').format('DD MMMM YYYY')
                  }}
                </span>
                <span class="absolute right-7 top-3 flex gap-2">
                  <span class="order-0 text-lg font-medium"> {{ comment.fullName }}</span>
                  <span class="order-1"> {{ moment(comment.createdAt).locale('fa').format('HH:mm') }}</span>
                </span>
                <p class="pt-3 pr-4">{{ comment.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="needCommentLoader" class="flex justify-center items-center mt-5">
        <button class="btn btn-primary" @click="toggleComments">
          <span v-show="commentsCollapsed">مشاهده بیشتر</span>
          <span v-show="!commentsCollapsed">کمتر</span>
        </button>
      </div>
    </div>
    <ClientOnly>
      <div v-if="$user && $user?.id" class="border-t-2 border-gray-600 border-dashed  mt-10">
        <form @submit.prevent="sendComment" class="max-w-xl mx-auto pt-7 space-y-2">
          <div>
            <label for="fullName" class="block py-2 text-sm font-medium text-gray-50"> نام و نام خانوادگی </label>
            <div class="mt-1">
              <input type="fullName" v-model="userComment.fullName" autocomplete="fullName" required="true" id="fullName"
                class="appearance-none caret-gray-50 block w-full px-3 py-2 border border-gray-600 text-white bg-gray-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <label for="message" class="block py-2 text-sm font-medium text-gray-50"> متن پیام </label>
            <div class="mt-1">
              <textarea dir="auto" v-model="userComment.message" rows="5" required="true" id="message"
                class="appearance-none caret-gray-50 block resize-none w-full px-3 py-2 border border-gray-600 text-white bg-gray-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">

              </textarea>
            </div>
          </div>
          <div class="max-w-max mr-auto !mt-7">
            <button type="submit" :disabled="sending"
              class="w-full flex justify-center btn-xl py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">ارسال</button>
          </div>
        </form>
      </div>
    </ClientOnly>

  </div>
</template>