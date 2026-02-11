import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import twcPlugin from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [solid(), twcPlugin()],
})
