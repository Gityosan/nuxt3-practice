<script setup lang="ts">
import { validation } from '@/assets/validation'
const { $baseFetch, $options } = useNuxtApp()
const config = useRuntimeConfig()
const name = ref<string>('')
const mailaddress = ref<string>('')
const subject = ref<string>('')
const microCMSSubmit = async () => {
  const { data, error } = await $baseFetch(
    config.public.MICROCMS_API_URL + '/form',
    $options({
      key: config.public.MICROCMS_API_URL + '/form',
      method: 'POST',
      headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY },
      body: JSON.stringify({ name: name.value, subject: subject.value })
    })
  )
  if (data) alert('送信できました')
  if (error) console.log('microCMSSubmit/Error', error)
}
const mailSubmit = async () => {
  const { data, error } = await $baseFetch(
    '/api/nodemailer',
    $options({
      key: '/api/nodemailer',
      method: 'POST',
      body: JSON.stringify({
        name: name.value,
        subject: subject.value,
        mailaddress: mailaddress.value
      })
    })
  )
  if (data) alert('送信できました')
  if (error) console.log('mailSubmit/Error', error)
}
const googleFormSubmit = async () => {
  const { data, error } = await $baseFetch(
    '/api/googleForm',
    $options({
      key: '/api/googleform',
      method: 'POST',
      body: JSON.stringify({ name: name.value, subject: subject.value })
    })
  )
  if (data) alert('送信できました')
  if (error) console.log('googleFormSubmit/Error', error)
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
          :rules="[validation.required, validation.maxString(30)]"
          class="px-5"
        ></v-text-field>
      </v-card-title>
      <v-card-title>
        メールアドレス
        <v-text-field
          v-model.trim.lazy="mailaddress"
          dense
          :rules="[validation.required, validation.maxString(30)]"
          class="px-5"
        ></v-text-field>
      </v-card-title>
      <v-card-title>
        要件
        <v-text-field
          v-model.trim.lazy="subject"
          dense
          :rules="[validation.required, validation.maxString(30)]"
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
