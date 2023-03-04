<script setup lang="ts">
withDefaults(
  defineProps<{
    content: string
  }>(),
  {
    content: ''
  }
)
</script>
<template>
  <div>{{ content }}</div>
</template>
