<script setup lang="ts">
import { BlogType, MicroCMSResponseType } from '@/assets/type'
const config = useRuntimeConfig()
const { $baseFetch } = useNuxtApp()
const contents = ref<BlogType[]>([])
const { data, error } = await $baseFetch<MicroCMSResponseType<BlogType[]>>(
  config.public.MICROCMS_API_URL + '/blog',
  () => ({
    lazy: false,
    headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY }
  })
)
if (data.value?.contents) contents.value = data.value.contents
if (error.value) console.log('microCMS/listBlogs/Error', error.value)
</script>
<template>
  <div class="frame">
    <BlogListItem
      v-for="content in contents"
      :key="content.title"
      :content="content"
    />
  </div>
</template>
<style lang="scss" scoped>
.frame {
  padding: 0 20px;
  margin: 20px 0 0;
  min-height: 100dvh;
}
@media (min-width: 820px) and (max-width: 1160px) {
  .frame {
    width: 740px;
    margin: 20px auto 0;
  }
}
@media (min-width: 1160px) {
  .frame {
    display: flex;
    justify-content: space-between;
    width: 1104px;
    margin: 20px auto 0;
  }
}
</style>
