import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import twcPlugin from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [twcPlugin({ strict: false }), react()],
})
