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
</script>
<template>
  <div class="frame">
    <img :src="content.thumbnail ? content.thumbnail.url : 'day_flower.png'" class="thumbnail" />
    <v-card-title class="blog-title">{{ content.title }}</v-card-title>
    <div class="d-flex">
      <v-card-text class="meta">
        <v-icon :size="smAndUp ? '16' : '14'"> mdi-clock-outline </v-icon>
        {{ new Date(content.createdAt).toLocaleDateString() }}
      </v-card-text>
      <v-card-text class="meta">
        <v-icon :size="smAndUp ? '16' : '14'"> mdi-account-outline </v-icon>
        {{ content.author }}
      </v-card-text>
    </div>
    <BlogContents :content="content.content" />
  </div>
</template>
<style lang="scss" scoped>
.frame {
  padding: 0 20px;
  margin: 20px 0 0;
  min-height: 100dvh;

  .thumbnail {
    width: 100%;
    object-fit: contain;
    border-radius: 5px;
  }

  .blog-title {
    padding: 0;
    margin: 10px 0;
    font-size: 20px;
    font-weight: 700;
    color: #2b2c30;
  }

  .meta {
    display: inline-flex;
    align-items: center;
    padding: 10px 0 40px;
    font-size: 14px;
    color: #616269;
    white-space: nowrap;
  }
}

@media (min-width: 600px) and (max-width: 960px) {
  .frame {
    width: 540px;
    margin: 20px auto 0;

    .meta {
      font-size: 16px;
    }
  }
}
@media (min-width: 960px) {
  .frame {
    width: 904px;
  }
}
</style>
