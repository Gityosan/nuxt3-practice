<script setup lang="ts">
import { useDisplay } from 'vuetify'
const { xs, smAndUp } = useDisplay()
const drawer = ref<boolean>(smAndUp.value)
const pages = [
  {
    title: 'トップ',
    icon: 'mdi-home',
    path: '/'
  },
  {
    title: 'フォーム',
    icon: 'mdi-form-select',
    path: '/forms'
  },
  {
    title: 'ブログ',
    icon: 'mdi-post-outline',
    path: '/blog'
  }
]
</script>
<template>
  <v-layout class="bg-grey-color">
    <v-app-bar
      flat
      density="compact"
      style="border-bottom: 1px solid rgb(0 0 0 / 12%)"
    >
      <v-app-bar-nav-icon
        v-if="xs"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="font-weight-bold text-h5">
        Nuxt3学習用サイト
      </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :rail="smAndUp"
      :permanent="smAndUp"
      :expand-on-hover="smAndUp"
      rail-width="56"
    >
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in pages"
          :key="item.title"
          :title="item.title"
          :prepend-icon="item.icon"
          :to="item.path"
        ></v-list-item>
        <v-list-item
          v-if="xs"
          title="メニューを閉じる"
          prepend-icon="mdi-backspace-outline"
          @click="drawer = false"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-layout>
</template>
