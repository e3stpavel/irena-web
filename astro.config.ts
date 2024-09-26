import solid from '@astrojs/solid-js'
import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'
import icons from 'unplugin-icons/vite'
import { locales } from './i18n.config'

// https://astro.build/config
export default defineConfig({
  site: 'https://irena.ee',

  integrations: [
    unocss({
      injectReset: true,
    }),
    solid(),
  ],

  i18n: {
    defaultLocale: locales[0],
    locales,
  },

  vite: {
    plugins: [
      icons({
        compiler: 'solid',
      }),
    ],
  },
})
