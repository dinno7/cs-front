<script setup lang="ts">

</script>

<template>
  <div>
    <header>
      <Navbar />
    </header>
    <main class="wrapper">
      <slot />
      <BaseNotification />
    </main>
    <BaseFooter />
  </div>
</template>