import { FetchOptionArgsType, FetchOptionResponseType } from '~/assets/type'

export const fetchOptions = <T, S = T>({
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
}: FetchOptionArgsType<T, S> = {}): FetchOptionResponseType => {
  body = body ? { body } : {}
  query = Object.keys(query).length ? { query } : {}
  return {
    ...body,
    ...query,
    method,
    headers,
    async onResponse(v) {
      await convertResponse(v.response._data)
      onResponse && (await onResponse(v))
    },
    async onResponseError(v) {
      onResponseError && (await onResponseError(v))
    },
    ...args
  }
}
export const baseFetch = async <T>(
  path: string,
  options: () => FetchOptionArgsType<T> = () => ({})
) => {
  const asyncDataOptions = { lazy: false, ...options() }
  return await useAsyncData(path, () => $fetch<T>(path, fetchOptions(options())), asyncDataOptions)
}
export const baseLazyFetch = <T, S = T>(
  path: string,
  options: () => FetchOptionArgsType<T, S> = () => ({})
) => {
  const asyncDataOptions = { lazy: true, ...options() }
  return useAsyncData(path, () => $fetch<T>(path, fetchOptions(options())), asyncDataOptions)
}
export const isObject = (v: unknown) => v !== null && typeof v === 'object'
export const isFile = (v: unknown): v is File => v instanceof File
export const isDate = (v: unknown): v is File => v instanceof Date
export const isEmptyObject = (v: any): v is object =>
  isObject(v) && !isFile(v) && !isDate(v) && !Object.keys(v).length
export const snakeToLowerCamel = (string = ''): string =>
  string
    .split('_')
    .reduce(
      (pre, cur, i) => pre + (i ? cur[0].toUpperCase() : cur[0].toLowerCase()) + cur.slice(1),
      ''
    )
export const changeKeyCase = (obj: any) => {
  if (isObject(obj))
    Object.keys(obj).forEach((key) => {
      const newKey = snakeToLowerCamel(key)
      if (newKey !== key) {
        obj[newKey] = obj[key]
        delete obj[key]
      }
      convertResponse(obj[newKey])
    })
}
export const convertResponse = (res: any) => {
  if (Array.isArray(res)) {
    for (let i = 0, len = res.length; i < len; i++) {
      changeKeyCase(res[i])
    }
  } else changeKeyCase(res)
}
export const reverseSanitize = (str?: string | null): string => {
  if (!str) return ''
  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}
