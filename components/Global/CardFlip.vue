<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string,
  content: string,
  category: string,
}>(), {
  title: "Default title",
  content: "Default Content",
  category: "Default category"
}
)
</script>

<template>
  <div class="card">
    <div class="content shadow-lg shadow-indigo-100/20">
      <div class="back">
        <div class="back-content ">
          <div class="bg-gray-900/20 rounded-md backdrop-filter backdrop-blur-sm p-5">
            <p class="font-bold text-2xl">{{ props.title }}</p>
          </div>
        </div>
      </div>
      <NuxtLink to="/posts" class="front">
        <div class="bg-img">
        </div>

        <div class="front-content rounded-lg flex justify-center items-start">
          <div
            class="relative overflow-hidden pt-14 bg-gray-900/20 h-[calc(100%-100px)] w-[calc(100%-10px)] mt-3 rounded-lg backdrop-filter backdrop-blur-sm">
            <span class="text-xs absolute top-2 right-2 bg-gray-50/30 py-1 px-3 rounded-full">{{ props.category }}</span>
            <div class="contents">
              <p class="font-bold text-lg text-white px-2">{{ props.title }}</p>
              <p class="text-sm text-gray-200 text-justify pt-1 px-3 post-description">
                {{ props.content }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="card-footer flex flex-col justify-center w-full bg-gray-900  h-20 absolute bottom-0 left-1/2 -translate-x-1/2 py-1 px-3">
          <p class="text-sm">برای مشاهده پست کلیک کنید</p>
          <button class="btn btn-primary btn-light mr-auto">مشاهده</button>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.card {
  overflow: visible;
  width: 300px;
  height: 400px;
}

.content {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 700ms;
  border-radius: 5px;
}

.front,
.back {
  background-color: #151515;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 5px;
  overflow: hidden;
}

.back {
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  overflow: hidden;

}

.back::before {
  position: absolute;
  content: ' ';
  display: block;
  width: 160px;
  height: 160%;
  background: linear-gradient(90deg, transparent, #ffffffb0, #ffffffb0, #ffffffb0, #ffffffb0, transparent);
  animation: rotation_481 8s infinite linear;
}

.back-content {
  position: absolute;
  width: 99%;
  height: 99%;
  background-color: #151515;
  background-image: url("~/assets/images/test-blog.jpg");
  background-size: cover;
  border-radius: 5px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.card:hover .content {
  transform: rotateY(180deg);
}

@keyframes rotation_481 {
  0% {
    transform: rotateZ(0deg);
  }

  0% {
    transform: rotateZ(360deg);
  }
}

.front {
  transform: rotateY(180deg);
  color: white;
}

.front .front-content {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.front .bg-img {
  background-image: url("~/assets/images/test-blog.jpg");
  background-size: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  inset: 0;
  transform: scale(1.2);
}

.post-description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
}
</style>