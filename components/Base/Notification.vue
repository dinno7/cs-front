<script setup lang="ts">
const { notifications, removeNotification } = useNotification()

</script>

<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div aria-live="assertive"
    class="Notification pointer-events-none fixed right-1/2 transform translate-x-1/2 -bottom-4 md:translate-x-0 md:-right-2 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition-group enter-active-class="transform ease-in-out duration-500 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-ins duration-250"
        leave-from-class="opacity-100" move-class="absolute"
        leave-to-class="opacity-0 translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2">
        <div v-for=" notification  in  notifications " :key="notification.id"
          class="pointer-events-auto w-80 border-2 border-indigo-500/50 max-w-sm overflow-hidden rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <Icon name="heroicons:check-circle" class="h-6 w-6 text-green-400" aria-hidden="true" />
              </div>
              <div class="mr-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-50">{{ notification.title }}</p>
                <p class="mt-1 text-sm text-gray-300 break-words">{{ notification.msg }}</p>
              </div>
              <div class="mr-4 flex flex-shrink-0">
                <button type="button" @click="removeNotification(notification.id)"
                  class="inline-flex rounded-md bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <span class="sr-only">Close</span>
                  <Icon name="heroicons:x-mark" class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
