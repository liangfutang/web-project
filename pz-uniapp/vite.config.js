import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  // css: {
  //   loaderOptions: {
  //     less: {
  //       lessOptions: {
  //         javascriptEnabled: true // 启用 Less 的 JS 表达式
  //       }
  //     },
  //     sass: {
  //       additionalData: `@import "@/styles/global.scss";` // 全局 Sass 变量（可选）
  //     }
  //   }
  // }
})
