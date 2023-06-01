<script setup lang="ts">
// >> Imports

// >> Defines 
let { modelValue, overlayClosable = true, iconClosable = true, closable = true } = defineProps<{
  modelValue: boolean,
  overlayClosable?: boolean,
  iconClosable?: boolean,
  closable?: boolean

}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void,
  (e: 'close', value: boolean, closedType: string): void
}>()

// >> Hooks

// >> Data

// >> Composable

// >> Computed
const model = computed({
  get() {
    return modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

// >> Functions
const closeModal = (closeType: string) => {
  if (!closable) return;

  if (closeType === 'overlay' && overlayClosable) {
    model.value = false;
    emit('close', modelValue, 'overlay');
  }
  else if (closeType === 'icon' && iconClosable) {
    model.value = false;
    emit('close', modelValue, 'icon');
  }
  return;
}

</script>

<template>
  <ClientOnly>
    <HeadlessTransitionRoot as="template" :show="model">
      <HeadlessDialog as="div" class="relative z-10" @close="closeModal('overlay')">
        <HeadlessTransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/20 backdrop-filter backdrop-blur-sm transition-opacity" />
        </HeadlessTransitionChild>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <HeadlessTransitionChild as="template" enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-10 scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-10 scale-95">
              <HeadlessDialogPanel :="$attrs"
                class="relative border-2 border-gray-100/20 transform overflow-hidden rounded-lg dark:bg-gray-800 text-right shadow-xl transition-all text-gray-50 sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <HeadlessDialogTitle as="div"
                    class="relative w-full text-base font-semibold leading-6 dark:text-gray-50">
                    <slot name="header" />
                    <button v-if="iconClosable && closable" @click="closeModal('icon')"
                      class="absolute left-0 top-1/2 transform -translate-y-1/2 focus-visible:ring-0 focus-visible:outline-none">
                      <VIcon name="heroicons:x-circle" size="24" class="text-gray-300 hover:text-gray-100" />
                    </button>
                  </HeadlessDialogTitle>
                  <div class="mt-2 px-2">
                    <slot />
                  </div>
                </div>
                <div class="bg-gray-800 border-t-2 border-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <slot name="footer" />
                </div>
              </HeadlessDialogPanel>
            </HeadlessTransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>
  </ClientOnly>
</template>