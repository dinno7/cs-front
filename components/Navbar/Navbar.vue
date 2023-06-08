<script setup lang="ts">
import { NOTIFICATION_TYPES } from "~/utils/types";

const { user } = await useUser();
const navigation = [
  { title: 'خانه', name: 'index', href: '/', },
  { title: 'پست ها', name: 'posts', href: '/posts', },
  // { title: 'درباره من', name: 'about-me', href: '/about-me', },
  // { title: 'تماس با من', name: 'contact-me', href: '/contact-me', },
]

const { logout } = useStrapiAuth();


const { addNotification } = useNotification();

const logoutModal = ref<boolean>(false)
const showLogoutModal = () => {
  logoutModal.value = true
}

const logOut = async () => {
  logout()
  logoutModal.value = false;
  addNotification('شما با موفقیت خارج شدید', NOTIFICATION_TYPES.error, '', 5000)
  user.value = null
}

const userAvatar = computed(() => {
  const avatarUrl = user.value?.avatar?.url
  if (avatarUrl) return normalizedStrapiImgSrcs(avatarUrl)
  return '/images/user-photo.png'
})

const route = useRoute();
const searchText = ref<string>(route.query?.searchItem ? route.query?.searchItem + '' : '')
const searchInPosts = () => {
  if (searchText.value && searchText.value.length) {
    navigateTo({
      name: 'posts-search', query: {
        searchItem: searchText.value
      }
    })
  }

}

</script>
<template>
  <GlobalModal v-model="logoutModal" :iconClosable="false">
    <template #header>
      <div class="flex gap-2 items-center justify-start">
        <VIcon name="heroicons:exclamation-triangle" size="30" class="text-rose-500" />
        <p>آیا میخواهید از اکانت خود خارج شوید؟</p>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end items-center gap-3 ">
        <button class="btn btn-lg btn-secondary" @click="logoutModal = false">خیر</button>
        <button class="btn btn-lg btn-danger" @click="logOut">بله</button>
      </div>
    </template>
  </GlobalModal>
  <HeadlessDisclosure as="nav" class="bg-gray-800 h-20" v-bind="$attrs" v-slot="{ open }">
    <div class="mx-auto container px-2  sm:px-4 h-full lg:px-8">
      <div class="relative flex h-full items-center justify-between">
        <div class="flex items-center px-2 lg:px-0">
          <NuxtLink to="/" class="flex-shrink-0">
            <img class="h-8 w-auto lg:block" src="~/assets/images/dinnoLogoGreenGradient.svg" alt="Your Company" />
          </NuxtLink>
          <div class="hidden lg:mr-6 lg:block">
            <div class="flex gap-5">
              <NuxtLink v-for="route in navigation" :to="{ name: route.name }"
                class="route rounded-md px-3 py-2 text-sm font-medium text-white">
                {{ route.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="flex flex-1 justify-center px-2 lg:mr-6 lg:justify-center">
          <div class="w-full max-w-lg lg:max-w-xs">
            <label for="search" class="sr-only">جستوجو</label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <VIcon name="heroicons:magnifying-glass" class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input id="search" name="search" v-model="searchText" @keydown.enter="searchInPosts"
                class="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                placeholder="جستوجو" type="search" />
            </div>
          </div>
        </div>
        <div class="flex lg:hidden">
          <!-- Mobile menu button -->
          <HeadlessDisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <VIcon name="heroicons:bars-3" v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <VIcon name="heroicons:x-mark" v-else class="block h-6 w-6" aria-hidden="true" />
          </HeadlessDisclosureButton>
        </div>
        <ClientOnly>
          <div class="hidden lg:mr-4 lg:block" v-if="user">
            <div class="flex items-center">
              <HeadlessMenu as="div" class="relative mr-4 flex-shrink-0">
                <div>
                  <HeadlessMenuButton
                    class="flex rounded-full bg-gray-800  text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" :src="userAvatar" alt="" />
                  </HeadlessMenuButton>
                  <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95">
                    <HeadlessMenuItems
                      class="absolute border-2 border-gray-700 left-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-gray-800  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <HeadlessMenuItem v-slot="{ active }">
                        <p :class="[active ? 'bg-gray-700' : '', 'block px-4 py-2 text-sm text-gray-50']">
                          {{ user?.firstName + ' ' + user?.lastName }}
                        </p>
                      </HeadlessMenuItem>
                      <HeadlessMenuItem v-if="user" v-slot="{ active }">
                        <button @click="showLogoutModal"
                          :class="[active ? 'bg-rose-700' : '', 'block w-full text-right px-4 py-2 text-sm text-gray-50']">
                          خروج
                        </button>
                      </HeadlessMenuItem>
                    </HeadlessMenuItems>
                  </transition>
                </div>
              </HeadlessMenu>
            </div>
          </div>
        </ClientOnly>

        <div class="hidden lg:inline-block">
          <div class="mr-10 flex items-center justify-start gap-5" v-if="!user">
            <NuxtLink to="/auth/register" class="btn btn-primary btn-sm">
              ثبت نام
            </NuxtLink>
            <NuxtLink to="/auth/login" class="text-sm hover:text-blue-200">
              ورود
            </NuxtLink>
          </div>
        </div>

      </div>
    </div>


    <!-- // Mobile -->
    <HeadlessDisclosurePanel class="lg:hidden bg-gray-800">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <NuxtLink v-for="  route   in   navigation  " :to="{ name: route.name }"
          class="route block rounded-md px-3 py-2 text-base font-medium text-white">
          {{ route.title }}
        </NuxtLink>
        <div v-if="user">
          <button
            class="block rounded-md px-3 py-2 text-base font-medium text-white bg-rose-500/10 hover:bg-rose-500 w-full text-right transition-colors"
            @click="showLogoutModal">خروج</button>
        </div>
      </div>
      <div class="border-t border-gray-700 pt-4 pb-3  flex items-center justify-between pr-2 pl-4">
        <div class="flex items-center px-5" v-if="user">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="userAvatar" alt="User image" />
          </div>
          <div class="mr-3">
            <div class="text-base font-medium text-white">Tom Cook</div>
            <div class="text-sm font-medium text-gray-400">tom@example.com</div>
          </div>
        </div>

        <div class="mx-3" v-else>
          <div class="flex items-center justify-start gap-3">
            <NuxtLink to="/auth/register" class="btn btn-primary btn-sm">
              ثبت نام
            </NuxtLink>
            <NuxtLink to="/auth/login" class="text-sm hover:text-blue-200">
              ورود
            </NuxtLink>
          </div>
        </div>
      </div>
    </HeadlessDisclosurePanel>
  </HeadlessDisclosure>
</template>

<style scoped>
a.route.router-link-active {
  @apply bg-gray-900;
}

a.route:not(.router-link-active):hover {
  @apply bg-gray-900/60
}
</style>