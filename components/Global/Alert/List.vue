<script setup lang="ts">
const { title, items } = defineProps<{
  title: string
  items: string[]
}>() 
</script>


<template>
  <div class="rounded-md bg-rose-100 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <VIcon name="heroicons:x-circle" class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="mr-3">
        <p class="text-sm font-medium text-red-800">{{ title }}</p>
        <div class="mt-2 text-sm text-red-700">
          <ul role="list" class="list-disc space-y-1 pr-5">
            <li v-for="item in items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>