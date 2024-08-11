import { type CollectionKey, getCollection } from 'astro:content'

export const collections = ['products', 'categories', 'pages'] satisfies CollectionKey[]

export const entries = await Promise.all(
  collections.map(collection => getCollection(collection)),
)
