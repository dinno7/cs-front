<template>
  <div class="relative isolate overflow-hidden bg-gray-900">
    <!-- <spline-viewer url="/cloner_flower.spline"></spline-viewer> -->
    <GlobalBackgroundPattern />
    <div class="flex flex-col lg:flex-row lg:items-center pb-20 px-20 lg:px-52 h-full">
      <div class="basis-1/2">
        <img class="h-11" src="~/assets/images/dinnoLogoGreenGradient.svg" alt="Your Company" />
        <h1 class="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          وبلاگ شخصی
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه
          روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف
          بهبود ابزارهای کاربردی می باشد.
        </p>
        <div class="mt-10 flex items-center gap-x-6">
          <NuxtLink to="/auth/register" class="btn btn-primary btn-icon">
            <VIcon name="heroicons:envelope" size="20px" />
            دنبال کردن
          </NuxtLink>
          <a href="#" class="text-base font-semibold leading-7 text-white">
            مطالعه بیشتر
            <span aria-hidden="true" class="m-1">→</span>
          </a>
        </div>
      </div>
      <div class="basis-1/2">
        <img class="bounse-animate w-[80%] md:w-[40%] lg:w-[80%] lg:ml-0 mx-auto mt-16"
          src="~/assets/images/illustrations/main-animated.png" width="550" height="400" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bounse-animate {
  animation: bounce 2s infinite ease-in-out alternate;
}

@keyframes bounce {
  to {
    transform: translateY(-20px);
  }

}
</style>