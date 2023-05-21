import { FetchOptionArgsType, FetchOptionResponseType } from '~/assets/type'
export default defineNuxtPlugin((nuxtApp: any) => {
  return {
    provide: {
      options: <T>({
        query = {},
        method = 'GET',
        headers = {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
        body,
        onResponse,
        onResponseError,
        ...args
      }: FetchOptionArgsType<T> = {}): FetchOptionResponseType => {
        body = body ? { body } : {}
        query = Object.keys(query).length ? { query } : {}
        return {
          ...body,
          ...query,
          method,
          headers,
          onResponse(v) {
            onResponse && onResponse(v)
          },
          onResponseError(v) {
            onResponseError && onResponseError(v)
          },
          ...args
        }
      },
      baseFetch: async <T>(
        path: string,
        options: () => FetchOptionArgsType<T> = () => ({})
      ) => {
        const { lazy, watch } = { lazy: true, watch: [], ...options() }
        return await useAsyncData(
          path,
          () => $fetch<T>(path, nuxtApp.$options(options())),
          {
            lazy,
            watch
          }
        )
      }
    }
  }
})
