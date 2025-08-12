import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/openwallet-/', // <--- nombre del repo, con / al inicio y final
})