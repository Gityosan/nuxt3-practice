<script setup lang="ts">
import { validation } from '@/assets/validation'
const { $baseFetch, $options } = useNuxtApp()
const todo = ref<string>('')
const newTodo = ref<string>('')
const todos = ref<any[]>([])
const config = useRuntimeConfig()

const createTodo = async () => {
  const path = config.public.MICROCMS_API_URL + '/todo'
  const { data, error } = await $baseFetch(
    path,
    $options({
      key: path,
      method: 'POST',
      headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY },
      body: JSON.stringify({ todo })
    })
  )
  if (data) readTodo()
  if (error) console.log('microCMS/createTodo/Error', error)
}
const updateTodo = async (oldTodo: string) => {
  const id = todos.value.filter((v) => v.todo === oldTodo)[0].id
  const path = config.public.MICROCMS_API_URL + '/todo/' + id
  const { data, error } = await $baseFetch(
    path,
    $options({
      key: path,
      method: 'PATCH',
      headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY },
      body: JSON.stringify({ todo: newTodo.value })
    })
  )
  if (data) readTodo()
  if (error) console.log('microCMS/updateTodo/Error', error)
}
const readTodo = async () => {
  const path = config.public.MICROCMS_API_URL + '/todo'
  const { data, error } = await $baseFetch(
    path,
    $options({
      key: path,
      headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY }
    })
  )
  // @ts-ignore
  if (data) todos.value = data.contents
  if (error) console.log('microCMS/readTodo/Error', error)
}
const deleteTodo = async () => {
  const id = todos.value.filter((v) => v.todo === todo)[0].id
  const path = config.public.MICROCMS_API_URL + '/todo/' + id
  const { data, error } = await $baseFetch(
    path,
    $options({
      key: path,
      method: 'DELETE',
      headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY }
    })
  )
  if (data) readTodo()
  if (error) console.log('microCMS/deleteTodo/Error', error)
}
await readTodo()
</script>
<template>
  <v-card flat outlined class="ma-5 pa-5">
    <v-card-title class="font-weight-bold text-h5">
      Todoアプリを作ろう！
    </v-card-title>
    <v-row>
      <v-col cols="8">
        <v-text-field
          v-model.trim.lazy="todo"
          placeholder="新規追加"
          dense
          :rules="[validation.required, validation.maxString(30)]"
          class="px-5"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn color="primary" width="100%" @click="createTodo()">
          <v-icon>mdi-plus-circle-outline</v-icon>add
        </v-btn>
      </v-col>
    </v-row>

    <div class="d-flex flex-wrap">
      <v-card v-for="i in todos" :key="i" class="ma-5 pa-5">
        <v-card-title>{{ i.todo }}</v-card-title>
        <v-text-field
          v-model.trim.lazy="newTodo"
          dense
          :rules="[validation.maxString(30)]"
          append-icon="mdi-reload"
          append-outer-icon="mdi-trash-can-outline"
          @click:append="updateTodo(i)"
          @click:append-outer="deleteTodo()"
        ></v-text-field>
      </v-card>
    </div>
  </v-card>
</template>
