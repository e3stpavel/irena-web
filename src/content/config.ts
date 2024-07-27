import { defineCollection, reference, z } from 'astro:content'
import { translationsSchema } from 'astro-nanointl'

const products = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    composition: z.array(z.string()),
    details: reference('product-details'),
  }),
})

const productDetails = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    price: z.number().positive(),
    unit: z.enum(['kg', 'pc']),
    thumbnail: image(),
    images: z.array(image()),
  }),
})

const translations = defineCollection({
  type: 'data',
  schema: translationsSchema,
})

export const collections = {
  products,
  'product-details': productDetails,
  translations,
}
