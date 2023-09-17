<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    content: any
  }>(),
  {
    content: () => ({})
  }
)
const imageUrl = computed(() => {
  const c = props.content
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
  <nuxt-link
    :to="`/blog/${content.id}`"
    class="text-decoration-none my-5 v-col-12 v-col-sm-6 v-col-md-4 blog"
  >
    <NuxtImg preload format="webp" fit="contain" :src="imageUrl" class="blog-thumbnail" />
    <div class="d-flex mb-4" style="gap: 0 12px">
      <p class="blog-meta">
        {{ new Date(content.createdAt).toLocaleDateString().split('/').join('.') }}
      </p>
      <p class="blog-meta">By {{ content.author }}</p>
    </div>
    <h3 class="blog-title">{{ content.title }}</h3>
  </nuxt-link>
</template>
<style lang="scss" scoped>
.blog {
  &-thumbnail {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 32px;
  }
  &-meta {
    font-size: 14px;
    color: #212121;
    white-space: nowrap;
    font-family: 'Roboto Condensed', sans-serif;
    margin: 0 2px;
  }
  &-title {
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.12rem;
    font-family: 'BIZ UDPGothic', sans-serif;
    color: #212121;
    margin: 0 2px 40px;
  }
}
</style>
