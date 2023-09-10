<script setup lang="ts">
import gsap from 'gsap'
onMounted(() => {
  gsap.from('#gsap', { x: 1000, duration: 1 })
})
useHead({ title: 'Todo & Google Map' })
</script>
<template>
  <Todo id="gsap" />
  <Googlemap id="gsap" />
</template>
