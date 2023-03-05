import { defineEventHandler, getMethod, readBody } from 'h3'

const config = useRuntimeConfig()
export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const body = await readBody(event)
  const params = new FormData()
  params.append('entry.1947792455', body.name)
  params.append('entry.459070670', body.subject)
  return await $fetch(config.public.GOOGLE_FORM_URL, {
    method,
    body: params
  })
})
