<script setup lang="ts">
import { validation as v } from '@/assets/validation'
const { $baseFetch } = useNuxtApp()
const config = useRuntimeConfig()
const name = ref<string>('')
const mailaddress = ref<string>('')
const subject = ref<string>('')
const microCMSSubmit = async () => {
  await $baseFetch(config.public.MICROCMS_API_URL + '/form', () => ({
    method: 'POST',
    headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY },
    body: JSON.stringify({ name: name.value, subject: subject.value }),
    onResponse: () => alert('送信できました'),
    onResponseError: ({ response }) =>
      console.log('microCMSSubmit/Error', response)
  }))
}
const mailSubmit = async () => {
  await $baseFetch('/api/nodemailer', () => ({
    method: 'POST',
    body: JSON.stringify({
      name: name.value,
      subject: subject.value,
      mailaddress: mailaddress.value
    }),
    onResponse: () => alert('送信できました'),
    onResponseError: ({ response }) => console.log('mailSubmit/Error', response)
  }))
}
const googleFormSubmit = async () => {
  await $baseFetch('/api/googleForm', () => ({
    method: 'POST',
    body: JSON.stringify({ name: name.value, subject: subject.value }),
    onResponse: () => alert('送信できました'),
    onResponseError: ({ response }) =>
      console.log('googleFormSubmit/Error', response)
  }))
}
</script>
<template>
  <div>
    <v-card flat outlined class="ma-5 pa-5">
      <v-card-title class="font-weight-bold text-h5">
        Form機能を実装しよう！
      </v-card-title>
      <v-card-title>
        お名前
        <v-text-field
          v-model.trim.lazy="name"
          dense
          :rules="[v.required, v.maxString(30)]"
          class="px-5"
        ></v-text-field>
      </v-card-title>
      <v-card-title>
        メールアドレス
        <v-text-field
          v-model.trim.lazy="mailaddress"
          dense
          :rules="[v.required, v.maxString(30)]"
          class="px-5"
        ></v-text-field>
      </v-card-title>
      <v-card-title>
        要件
        <v-text-field
          v-model.trim.lazy="subject"
          dense
          :rules="[v.required, v.maxString(30)]"
          class="px-5"
        ></v-text-field>
      </v-card-title>
    </v-card>
    <v-card flat outlined class="ma-5 pa-5">
      <v-card-title class="font-weight-bold text-h5">
        １：Microcmsに送信しよう！
      </v-card-title>
      <v-btn
        color="primary"
        width="-webkit-fill-available"
        class="mx-5"
        @click="microCMSSubmit()"
      >
        <v-icon>mdi-email-fast-outline</v-icon>送信
      </v-btn>
    </v-card>
    <v-card flat outlined class="ma-5 pa-5">
      <v-card-title class="font-weight-bold text-h5">
        ２：メールアドレスに送信しよう！
      </v-card-title>
      <v-btn
        color="primary"
        width="-webkit-fill-available"
        class="mx-5"
        :disabled="true"
        @click="mailSubmit()"
      >
        <v-icon>mdi-email-fast-outline</v-icon>送信
      </v-btn>
    </v-card>
    <v-card flat outlined class="ma-5 pa-5">
      <v-card-title class="font-weight-bold text-h5">
        ３：Google Formに送信しよう！
      </v-card-title>
      <v-btn
        color="primary"
        width="-webkit-fill-available"
        class="mx-5"
        @click.prevent="googleFormSubmit()"
      >
        <v-icon>mdi-email-fast-outline</v-icon>送信
      </v-btn>
    </v-card>
  </div>
</template>
