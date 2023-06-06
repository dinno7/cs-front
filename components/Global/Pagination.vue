<script setup lang="ts">
// >> Imports

// >> Defines
const { pagination } = defineProps<{
  pagination: { page: number, limit: number, pageCount: number }
}>()
const emit = defineEmits<{
  (e: 'page:next'): void
  (e: 'page:prev'): void
  (e: 'page:number', value: number): void
}>()

// >> Hooks

// >> Data

// >> Composable

// >> Computed

// >> Functions


</script>

<template>
  <nav class="flex items-center justify-between border-t border-gray-600 px-4 sm:px-0">
    <div class="-mt-px flex w-0 flex-1">
      <button @click="$emit('page:prev')" :disabled="pagination.page === 1"
        class="inline-flex items-center border-t-2 border-transparent pt-4 pl-4 text-sm font-medium text-gray-500 disabled:cursor-not-allowed enabled:hover:border-gray-300 enabled:hover:text-gray-300">
        <VIcon name="heroicons:arrow-long-right" class="ml-2 h-5 w-5 " aria-hidden="true" />
        قبلی
      </button>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <button v-for="page in pagination.pageCount" @click="$emit('page:number', page)"
        :class="{ '!text-blue-600 !border-blue-500': page == pagination.page }"
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-300">
        {{ page }}
      </button>

    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <button @click="$emit('page:next')" :disabled="pagination.page === pagination.pageCount"
        class="inline-flex items-center border-t-2 border-transparent pt-4 pr-4 text-sm font-medium text-gray-500 disabled:cursor-not-allowed enabled:hover:border-gray-300 enabled:hover:text-gray-300">
        بعدی
        <VIcon name="heroicons:arrow-long-left" class="mr-2 h-5 w-5 " aria-hidden="true" />
      </button>
    </div>
  </nav>
</template>
