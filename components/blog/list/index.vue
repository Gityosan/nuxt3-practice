<script setup lang="ts">
import { BlogType, MicroCMSResponseType } from '~/assets/type'
const config = useRuntimeConfig()
const contents = ref<BlogType[]>([])
const { data, error } = await baseFetch<MicroCMSResponseType<BlogType[]>>(
  config.public.MICROCMS_API_URL + '/blog',
  () => ({ headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY } })
)
if (data.value?.contents) contents.value = data.value.contents
if (error.value) console.log('microCMS/listBlogs/Error', error.value)
</script>
<template>
  <div class="d-flex flex-column flex-sm-row pa-5">
    <BlogListItem v-for="content in contents" :key="content.title" :content="content" />
  </div>
</template>
