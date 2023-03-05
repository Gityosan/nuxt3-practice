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
      body: JSON.stringify({ todo: todo.value })
    })
  )
  if (data) readTodo()
  if (error) console.log('microCMS/createTodo/Error', error)
}
const updateTodo = async (todo: any) => {
  const path = config.public.MICROCMS_API_URL + '/todo/' + todo.id
  const { data, error } = await $baseFetch(
    path,
    $options({
      key: path,
      method: 'PATCH',
      headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY },
      body: JSON.stringify({ todo: newTodo.value })
    })
  )
  if (data) await readTodo()
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
const deleteTodo = async (todo: any) => {
  const path = config.public.MICROCMS_API_URL + '/todo/' + todo.id
  const { data, error } = await $baseFetch(
    path,
    $options({
      key: path,
      method: 'DELETE',
      headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY }
    })
  )
  if (data) await readTodo()
  if (error) console.log('microCMS/deleteTodo/Error', error)
}
await readTodo()
</script>
<template>
  <v-card flat outlined class="ma-5 pa-5">
    <v-card-title class="font-weight-bold text-h5">
      Todoアプリを作ろう！
    </v-card-title>
    <v-text-field
      v-model.trim.lazy="todo"
      placeholder="新規追加"
      variant="outlined"
      :rules="[validation.required, validation.maxString(30)]"
      class="my-5 px-5"
    >
      <template #append-inner>
        <v-btn
          variant="outlined"
          class="width-100 height-24"
          @click="createTodo()"
        >
          <v-icon>mdi-plus-circle-outline</v-icon>add
        </v-btn>
      </template>
    </v-text-field>

    <div class="d-flex flex-wrap" style="gap: 20px 12.5%">
      <v-card v-for="i in todos" :key="i" class="v-col-3 pa-5">
        <v-card-title>{{ i.todo }}</v-card-title>
        <v-text-field
          v-model.trim.lazy="newTodo"
          dense
          :rules="[validation.maxString(30)]"
          variant="outlined"
          density="compact"
          append-inner-icon="mdi-reload"
          append-icon="mdi-trash-can-outline"
          @click:append-inner="updateTodo(i)"
          @click:append="deleteTodo(i)"
        ></v-text-field>
      </v-card>
    </div>
  </v-card>
</template>
