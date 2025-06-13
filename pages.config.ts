import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
    pages: [],
    globalStyle: {
        navigationBarTextStyle: 'white',
        navigationBarTitleText: '@uni-helper',
    },
    easycom:{
        custom: {
            '^xh-(.*)': '@/components/xh-$1/xh-$1.vue',
        },
    }
})