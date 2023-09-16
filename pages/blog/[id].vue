<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { BlogType } from '~/assets/type'
const { smAndUp } = useDisplay()
const config = useRuntimeConfig()
const { params } = useRoute()
const content = ref<BlogType>({} as BlogType)
const { data, error } = await baseFetch<BlogType>(
  `${config.public.MICROCMS_API_URL}/blog/${params.id}`,
  () => ({ headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY } })
)
if (data.value) content.value = data.value
if (error.value) console.error('microCMS/getBlog/Error', error.value)
useHead({ title: data.value?.title || '' })

const imageUrl = computed(() => {
  const c = content.value
  const titleQuery = [
    `txt=${c.title.replace(/ /g, '+')}`,
    `txt-font=${'Hiragino Sans W5'.replace(/ /g, '+')}`,
    `txt-size=${Math.round(c.thumbnail.height * 0.08)}`,
    `txt-pad=${Math.max(c.thumbnail.height, c.thumbnail.width) * 0.1}`,
    `txt-color=424242&txt-align=center,middle`,
    `w=${Math.round(c.thumbnail.width * 0.8)}`,
    `h=${Math.round(c.thumbnail.height * 0.8)}`
  ]
  const query = [
    // author
    `txt=${encodeURIComponent(`By ${c.author}`)}`,
    `txt-font=${encodeURIComponent('Hiragino Sans W5')}`,
    `txt-size=${Math.round(c.thumbnail.height * 0.05)}`,
    `txt-pad=${Math.max(c.thumbnail.height, c.thumbnail.width) * 0.05}`,
    `txt-color=424242&txt-align=right,bottom`,

    // title
    `blend=${encodeURIComponent(`https://assets.imgix.net/~text?${titleQuery.join('&')}`)}`,
    `blend-mode=normal&blend-w=1.0&blend-h=1.0`
  ]
  return `${c.thumbnail.url}?${query.join('&')}`
})
</script>
<template>
  <div class="blog">
    <v-img :src="imageUrl" class="blog-thumbnail" />
    <div class="d-flex mb-4" style="gap: 0 12px">
      <p class="blog-meta">
        {{ new Date(content.createdAt).toLocaleDateString().split('/').join('.') }}
      </p>
      <p class="blog-meta">By {{ content.author }}</p>
    </div>
    <h3 class="blog-title">{{ content.title }}</h3>
    <BlogContents :content="content.content" />
  </div>
</template>
<style lang="scss" scoped>
.blog {
  padding: 0 20px;
  margin: 20px auto 0;
  min-height: 100dvh;
  @media (min-width: 600px) and (max-width: 960px) {
    width: 540px;
    margin: 20px auto 0;
  }
  @media (min-width: 960px) {
    width: 800px;
  }
  &-thumbnail {
    border-radius: 8px;
    margin: 0 auto 32px;
  }
  &-meta {
    font-size: 14px;
    color: #212121;
    white-space: nowrap;
    font-family: 'Roboto Condensed', sans-serif;
    margin: 0 2px;
  }
  &-title {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.12rem;
    font-family: 'BIZ UDPGothic', sans-serif;
    color: #212121;
    margin: 10px 2px 40px;
  }
}
</style>
