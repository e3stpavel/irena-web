import { defineCollection, reference, z } from 'astro:content'
import { translationsSchema } from 'astro-nanointl'

const categories = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    subcategoryOf: z.optional(reference('categories')),
  }),
})

const products = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    composition: z.array(z.string()),
    notes: z.string().optional(),
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
  categories,
  'product-details': productDetails,
  translations,
}
