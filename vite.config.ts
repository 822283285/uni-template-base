import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import UniPages from '@uni-helper/vite-plugin-uni-pages'

import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UniPages(), uni()],
  resolve: {
    alias: {
      '@utils': resolve(__dirname, 'src/utils')
    }
  },
  optimizeDeps: {
    exclude: ['sard-uniapp'],
  },
});
