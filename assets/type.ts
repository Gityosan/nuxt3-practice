import { AsyncDataOptions } from 'nuxt/app'
import { NitroFetchOptions } from 'nitropack'
export type MicroCMSResponseType<T> = {
  contents?: T
  content?: T
  totalCount: number
  offset: number
  limit: number
}
export type BlogType = {
  id: string
  title: string
  author: string
  thumbnail: {
    url: string
    height: number
    width: number
  }
  content: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}
export type TodoType = {
  id: string
  todo: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  revisedAt?: string
}
export type FetchOptionResponseType = NitroFetchOptions<'GET' | 'POST' | 'PUT' | 'DELETE'>
export type FetchOptionArgsType<T, S = T> = AsyncDataOptions<T, S> & FetchOptionResponseType
