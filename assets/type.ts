import { AsyncDataOptions } from 'nuxt/app'
import { NitroFetchOptions } from 'nitropack'
export type FetchOptionArgsType<T> = AsyncDataOptions<T> &
  NitroFetchOptions<'GET' | 'POST' | 'PUT' | 'DELETE'>
export type FetchOptionResponseType = NitroFetchOptions<
  'GET' | 'POST' | 'PUT' | 'DELETE'
>
