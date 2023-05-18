<script setup lang="ts">

</script>

<template>
  <div>
    <Navbar />
    <div class="wrapper">
      <slot />
      <BaseNotification />
    </div>
  </div>
</template>