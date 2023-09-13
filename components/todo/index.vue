<script setup lang="ts">
import { validation as v } from '~/assets/validation'
import { TodoType, MicroCMSResponseType } from '~/assets/type'
type TodoTypeForEdit = TodoType & { edited: boolean }
const todo = ref<string>('')
const config = useRuntimeConfig()

const createTodo = async () => {
  const { data, error } = await baseFetch<Pick<TodoType, 'id'>>(
    `${config.public.MICROCMS_API_URL}/todo`,
    () => ({
      method: 'POST',
      headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY },
      body: JSON.stringify({ todo: todo.value })
    })
  )
  if (data.value) {
    todos.value?.unshift({ ...data.value, todo: todo.value, edited: false })
    todo.value = ''
  }
  if (error.value) console.error('microCMS/createTodo/Error', error.value)
}
const updateTodo = async (item: TodoType, index: number) => {
  const { data, error } = await baseFetch<TodoType>(
    `${config.public.MICROCMS_API_URL}/todo/${item.id}`,
    () => ({
      method: 'PATCH',
      headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY },
      body: JSON.stringify({ todo: item.todo })
    })
  )
  if (data.value) todos.value?.splice(index, 1, { ...item, edited: false })
  if (error.value) console.error('microCMS/updateTodo/Error', error.value)
}
const deleteTodo = async (todo: TodoType, index: number) => {
  const { data, error } = await baseFetch<TodoType>(
    `${config.public.MICROCMS_API_URL}/todo/${todo.id}`,
    () => ({
      method: 'DELETE',
      headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY }
    })
  )
  if (data.value) todos.value?.splice(index, 1)
  if (error.value) console.error('microCMS/deleteTodo/Error', error.value)
}
const {
  data: todos,
  error,
  refresh: refreshTodos
} = baseLazyFetch<MicroCMSResponseType<TodoTypeForEdit[]>, TodoTypeForEdit[]>(
  `${config.public.MICROCMS_API_URL}/todo`,
  () => ({
    headers: { 'X-MICROCMS-API-KEY': config.public.MICROCMS_API_KEY },
    transform: (todos) => {
      console.log('transform')
      if (Array.isArray(todos.contents)) todos.contents.forEach((v) => (v.edited = false))
      return todos.contents || []
    }
  })
)
if (error.value) console.error('microCMS/readTodo/Error', error.value)
</script>
<template>
  <v-card flat outlined class="ma-5 pa-5">
    <v-card-title class="font-weight-bold text-h5"> Todoアプリを作ろう！ </v-card-title>
    <div class="d-flex align-center my-5" style="gap: 0 12px">
      <v-text-field
        v-model.trim.lazy="todo"
        label="新規追加"
        variant="outlined"
        density="compact"
        :rules="[v.required, v.maxString(30)]"
      ></v-text-field>
      <atom-button text="追加" :style="{ 'margin-bottom': '22px' }" @click="createTodo()" />
    </div>
    <p class="font-size-20 font-weight-bold ml-2 mb-2">Todos</p>
    <v-card v-for="(t, index) in todos" :key="t.id" class="py-2 px-5 w-100 mb-2">
      <div class="d-flex">
        <v-text-field
          v-model="t.todo"
          :rules="[v.maxString(30)]"
          variant="plain"
          density="compact"
          hide-details
          class="letter-spacing-10"
          :style="{ '--v-input-padding-top': '0' }"
          @input="t.edited = true"
        />
        <v-hover v-if="t.edited" v-slot="{ isHovering, props }">
          <v-btn
            icon="mdi-check"
            size="26"
            flat
            class="cursor-pointer"
            :class="isHovering ? 'text-accent-color' : 'text-grey'"
            v-bind="props"
            @click="updateTodo(t, index)"
          />
        </v-hover>
        <v-hover v-slot="{ isHovering, props }">
          <v-btn
            icon="mdi-delete"
            size="26"
            flat
            class="cursor-pointer transition-short-ease-out"
            :class="isHovering ? 'text-red-darken-3' : 'text-grey'"
            v-bind="props"
            @click="deleteTodo(t, index)"
          />
        </v-hover>
      </div>
    </v-card>
  </v-card>
</template>
