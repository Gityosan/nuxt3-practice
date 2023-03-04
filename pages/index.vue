<script setup lang="ts">
import gsap from 'gsap'
onMounted(() => {
  gsap.from('#gsap', { x: 1000, duration: 1 })
})
</script>
<template>
  <div>
    <Todo id="gsap" />
    <Googlemap id="gsap" />
  </div>
</template>
