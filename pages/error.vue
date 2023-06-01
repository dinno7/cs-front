<script setup lang="ts">
const error = useError()

let errorMsgHtml = computed(() => {
  let insideTags: string | undefined = error.value?.message ? error.value.message.match(/(?<=(\<br\>\<\/?pre\>))[^\[\]]+(?=(\<\/?pre\>\<br\>))/gi)?.join("\n\n") : ""
  insideTags = insideTags?.replace(/\|([^\S]*)/g, "| ")
  insideTags = insideTags?.replace(/\^/g, matched => `<span class="text-red-500 underline underline-offset-4">${matched}</span>`)
  insideTags = insideTags?.replace(/\d+\s\|/g, matched => `\n${matched}`)
  return insideTags
})
let errorMsg = computed(() => {
  let insideTags: string | undefined = error.value?.message ? error.value.message.replace(/(\<br\>\<\/?pre\>)[^\[\]]+(\<\/?pre\>\<br\>)/gi, "") : ""
  return insideTags
})

useHead({
  htmlAttrs: {
    dir: 'ltr'
  }
})
</script>

<template>
  <div class="container mx-auto bg-gray-100 h-screen  py-20">
    <div class="mx-auto max-w-max px-10">
      <p class="max-w-max font-bold text-3xl py-3">Doom!</p>
      <p class="max-w-max">There is a server side problem</p>
      <p class="max-w-max">Status: <span class="font-bold">{{ error?.statusCode }}</span></p>
      <p class="max-w-max">
        Error path:
        <span class="font-bold text-red-500 underline underline-offset-4"> {{ errorMsg }}</span>
        <br>
        <br>
      <pre class="font-bold whitespace-break-spaces" v-html="errorMsgHtml"></pre>
      </p>
    </div>
  </div>
</template>
