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
  <div class="ProseMirror" v-html="reverseSanitize(content)"></div>
</template>
