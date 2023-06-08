<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: ['dark:bg-bg-main', 'dark:text-gray-50']
  }
})

const userScrolled = ref<boolean>(false)
onMounted(() => {
  document.addEventListener('scroll', e => {
    if (window.scrollY >= 50) {
      userScrolled.value = true
    } else {
      userScrolled.value = false
    }
  });
})
</script>

<template>
  <div>
    <header>
      <Navbar class="fixed left-0 top-0 right-0 z-50 transition-[height]"
        :class="[userScrolled ? 'bg-opacity-10 backdrop-blur-md' : 'h-24']" />
    </header>
    <main class="wrapper mt-24">
      <slot />
      <BaseNotification />
    </main>
    <BaseFooter />
  </div>
</template>