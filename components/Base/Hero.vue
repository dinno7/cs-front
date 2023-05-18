<template>
  <div class="relative isolate overflow-hidden bg-gray-900">
    <!-- <spline-viewer url="/cloner_flower.spline"></spline-viewer> -->
    <Global.BackgroundPattern />
    <div class="flex flex-col lg:flex-row h-full bg-rose-600">
      <div class="">
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
          <a href="#" class="btn btn-primary btn-icon">
            <Icon name="heroicons:envelope" size="20px" />
            دنبال کردن
          </a>
          <a href="#" class="text-base font-semibold leading-7 text-white">Learn more <span
              aria-hidden="true">→</span></a>
        </div>
      </div>
      <div class="">
        <img src="~/assets/images/illustrations/main-animated.svg" class="w-[900px]" width="1250" height="900" />
      </div>
    </div>
  </div>
</template>
