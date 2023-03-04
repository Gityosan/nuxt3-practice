export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      options: ({
        key,
        method = 'GET',
        headers = {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
        body = null,
        lazy = true,
        cache = true
      }: {
        key?: string
        method?: string
        headers?: { [key: string]: string }
        body?: string | null | FormData
        lazy?: boolean
        cache?: boolean
      } = {}) => ({
        key,
        body,
        method,
        headers,
        lazy,
        initialCache: cache
      }),
      // TODO:汎用的な型定義の修正
      baseFetch: async <T>(
        path: string,
        options = nuxtApp.$options({ key: path })
      ) => {
        const { data, error, refresh } = await useFetch(path, options)
        if (error.value) clearError()
        else if (!data.value) await refresh()
        return { data: data.value as T, error: error.value as any }
      }
    }
  }
})
