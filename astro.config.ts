import { defineConfig } from 'astro/config'

import unocss from 'unocss/astro'
import solid from '@astrojs/solid-js'
import icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  integrations: [
    unocss({
      injectReset: true,
    }),
    solid(),
  ],

  vite: {
    plugins: [
      icons({
        compiler: 'solid',
      }),
    ],
  },
})
