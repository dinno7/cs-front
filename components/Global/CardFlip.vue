<script setup lang="ts">


const props = defineProps<{
  backImg: string,
  frontImg: string
}>()

const slots = defineSlots()


const { public: conf } = useRuntimeConfig()

const frontImg = computed(() => props.frontImg ? conf.backUrl + props.frontImg : '/images/test-blog.jpg')
const backImg = computed(() => props.backImg ? conf.backUrl + props.backImg : '/images/test-blog.jpg')
</script>

<template>
  <div class="card">
    <div class="content shadow-lg shadow-indigo-100/20">
      <div class="front">
        <div class="front-content" :style="{ backgroundImage: `url(${frontImg})` }">
          <slot name="front" />
        </div>
      </div>
      <div class="back">
        <div class="bg-img" :style="{ backgroundImage: `url(${backImg})` }">
        </div>

        <div class="back-content rounded-lg flex justify-center items-start">
          <slot name="back" />
        </div>

        <div
          class="card-footer flex flex-col justify-center w-full bg-gray-900  h-20 absolute bottom-0 left-1/2 -translate-x-1/2 py-1 px-3">
          <slot name="back-footer" />

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  overflow: visible;
  width: 100%;
  height: 400px;
}

.content {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: perspective(500px);
  transition: transform 700ms;
  border-radius: 5px;
}

.back,
.front {
  background-color: #151515;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 5px;
  overflow: hidden;
}

.front {
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  overflow: hidden;

}

.front::before {
  position: absolute;
  content: ' ';
  display: block;
  width: 160px;
  height: 160%;
  background: linear-gradient(90deg, transparent, #ffffffb0, #ffffffb0, #ffffffb0, #ffffffb0, transparent);
  animation: rotation_481 8s infinite linear;
}

.front-content {
  position: absolute;
  width: 99%;
  height: 99%;
  background-color: #151515;
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

.back {
  transform: rotateY(180deg);
  color: white;
}

.back .back-content {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.back .bg-img {
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