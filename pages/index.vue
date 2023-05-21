<script setup lang="ts">
const { addNotification } = useNotification()
</script>
<template>
  <div class="bg-gray-900">
    <BaseHero class="h-[calc(100vh-4rem)]" />
    <div class="container bg-gray-900 mx-auto text-white mt-10">
      <div id="top-posts">
        <h2 class="font-bold text-4xl p-5 pb-7 border-b-2 border-gray-100/40 mb-10">پست های پربازدید</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 p-7 lg:p-0">
          <GlobalCardFlip v-for="card in 4" class="basis-3/12" title="شهر کبک کانادا"
            content="کبک‌سیتی مرکز استان کبک کاناداست که میزبان متقاضیان مهاجرت به کانادا شده است. شهر کبک کانادا هم‌نام بزرگ‌ترین استان این کشور، موسسات آموزش عالی متعددی دارد و از این طریق میزبان علاقمندان به تحصیل در کانادا هم بوده است. برای آشنایی بیشتر با شرایط زندگی در کبک همراه ما در سایت موسسه مهاجرتی نیلگام باشید."
            category="متفرقه" />
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<style scoped>
.test-styles {
  @apply text-sky-600 bg-sky-100
}
</style>