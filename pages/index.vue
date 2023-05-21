<script setup lang="ts">
import gsap from 'gsap'
onMounted(() => {
  gsap.from('#gsap', { x: 1000, duration: 1 })
})
</script>
<template>
  <Todo id="gsap" />
  <Googlemap id="gsap" />
</template>
