import { defineConfig } from 'vite'
import twcPlugin from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [twcPlugin()],
})
