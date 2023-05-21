<script setup lang="ts">
import { validation as v } from '@/assets/validation'
import { TodoType } from '@/assets/type'
const { $baseFetch } = useNuxtApp()
const todo = ref<string>('')
const todos = ref<TodoType[]>([])
const config = useRuntimeConfig()

const createTodo = async () => {
  const { data, error } = await $baseFetch<TodoType>(
    config.public.MICROCMS_API_URL + '/todo',
    () => ({
      lazy: false,
      method: 'POST',
      headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY },
      body: JSON.stringify({ todo: todo.value })
    })
  )
  if (data.value) await readTodo()
  if (error.value) console.log('microCMS/createTodo/Error', error.value)
}
const updateTodo = async (item: TodoType) => {
  const { data, error } = await $baseFetch<TodoType>(
    config.public.MICROCMS_API_URL + '/todo/' + item.id,
    () => ({
      lazy: false,
      method: 'PATCH',
      headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY },
      body: JSON.stringify({ todo: item.todo })
    })
  )
  if (data.value) await readTodo()
  if (error.value) console.log('microCMS/updateTodo/Error', error.value)
}
const readTodo = async () => {
  const { data, error } = await $baseFetch<TodoType[]>(
    config.public.MICROCMS_API_URL + '/todo',
    () => ({
      lazy: false,
      headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY }
    })
  )
  console.log(data.value, error.value)
  if (data.value) todos.value = data.value.contents
  if (error.value) console.log('microCMS/readTodo/Error', error.value)
  todos.value.forEach((v) => (v.editable = false))
}
const deleteTodo = async (todo: any) => {
  const { data, error } = await $baseFetch<TodoType>(
    config.public.MICROCMS_API_URL + '/todo/' + todo.id,
    () => ({
      lazy: false,
      method: 'DELETE',
      headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY }
    })
  )
  if (data.value) await readTodo()
  if (error.value) console.log('microCMS/deleteTodo/Error', error.value)
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
      :rules="[v.required, v.maxString(30)]"
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
    <p class="font-size-20 font-weight-bold ml-2 mb-2">Todos</p>
    <v-card v-for="i in todos" :key="i.id" class="py-2 px-5 w-100 mb-2">
      <div class="d-flex">
        <v-text-field
          v-if="i.editable"
          v-model="i.todo"
          :rules="[v.maxString(30)]"
          variant="underlined"
          density="compact"
          hide-details
          class="letter-spacing-10"
          :style="{ '--v-input-padding-top': '0' }"
        />
        <p
          v-else
          class="font-size-16 line-height-26 mr-1 flex-1 letter-spacing-10"
        >
          {{ i.todo }}
        </p>
        <v-icon
          v-if="i.editable"
          icon="mdi-check"
          size="26"
          class="text-accent-color cursor-pointer"
          @click="updateTodo(i)"
        />
        <v-hover v-slot="{ isHovering, props }">
          <v-icon
            :icon="i.editable ? 'mdi-pencil-off' : 'mdi-pencil'"
            size="26"
            class="cursor-pointer mx-1"
            :class="isHovering ? 'text-main-color' : 'text-grey'"
            v-bind="props"
            @click="i.editable = !i.editable"
          />
        </v-hover>
        <v-hover v-slot="{ isHovering, props }">
          <v-icon
            icon="mdi-trash-can-outline"
            size="26"
            class="cursor-pointer"
            :class="isHovering ? 'text-red-darken-3' : 'text-grey'"
            v-bind="props"
            @click="deleteTodo(i)"
          />
        </v-hover>
      </div>
    </v-card>
  </v-card>
</template>
