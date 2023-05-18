<script setup lang="ts">
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    '~/assets/images/user-photo.png',
}
const navigation = [
  { title: 'خانه', name: 'index', href: '/', },
  { title: 'پست ها', name: 'posts', href: '/posts', },
]
</script>
<template>
  <HeadlessDisclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex items-center px-2 lg:px-0">
          <div class="flex-shrink-0">
            <img class="h-8 w-auto lg:block" src="~/assets/images/dinnoLogoGreenGradient.svg" alt="Your Company" />
          </div>
          <div class="hidden lg:mr-6 lg:block">
            <div class="flex gap-5">
              <NuxtLink v-for="route in navigation" :to="{ name: route.name }"
                class="rounded-md px-3 py-2 text-sm font-medium text-white">
                {{ route.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="flex flex-1 justify-center px-2 lg:mr-6 lg:justify-end">
          <div class="w-full max-w-lg lg:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon name="heroicons:magnifying-glass" class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input id="search" name="search"
                class="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                placeholder="Search" type="search" />
            </div>
          </div>
        </div>
        <div class="flex lg:hidden">
          <!-- Mobile menu button -->
          <HeadlessDisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <Icon name="heroicons:bars-3" v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <Icon name="heroicons:x-mark" v-else class="block h-6 w-6" aria-hidden="true" />
          </HeadlessDisclosureButton>
        </div>
        <div class="hidden lg:mr-4 lg:block">
          <div class="flex items-center">
            <!-- Profile dropdown -->
            <HeadlessMenu as="div" class="relative mr-4 flex-shrink-0">
              <div>
                <HeadlessMenuButton
                  class="flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="~/assets/images/user-photo.png" alt="" />
                </HeadlessMenuButton>
              </div>
            </HeadlessMenu>
          </div>
        </div>
      </div>
    </div>

    <HeadlessDisclosurePanel class="lg:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <NuxtLink v-for="route in navigation" :to="{ name: route.name }"
          class="block rounded-md px-3 py-2 text-base font-medium text-white">
          {{ route.title }}
        </NuxtLink>
      </div>
      <div class="border-t border-gray-700 pt-4 pb-3">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="~/assets/images/user-photo.png" alt="User image" />
          </div>
          <div class="mr-3">
            <div class="text-base font-medium text-white">Tom Cook</div>
            <div class="text-sm font-medium text-gray-400">tom@example.com</div>
          </div>
        </div>
      </div>
    </HeadlessDisclosurePanel>
  </HeadlessDisclosure>
</template>

<style scoped>
a.router-link-active {
  @apply bg-gray-900;
}

a:not(.router-link-active):hover {
  @apply bg-gray-900/60
}
</style>