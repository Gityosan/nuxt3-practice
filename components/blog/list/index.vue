<script setup lang="ts">
const config = useRuntimeConfig()
const { $baseFetch, $options } = useNuxtApp()
const contents = ref<any[]>([])
const path = config.public.MICROCMS_API_URL + '/blog'
const { data, error } = await $baseFetch(
  path,
  $options({
    key: path,
    headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY }
  })
)
// @ts-ignore
if (data) contents.value = data.contents
if (error) console.log('microCMS/listBlogs/Error', error)
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
