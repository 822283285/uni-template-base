import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
    pages: [],
    globalStyle: {
        navigationBarTextStyle: 'white',
        navigationBarTitleText: '@uni-helper',
    },
    easycom: {
        custom: {
            '^xh-(.*)': '@/components/xh-$1/xh-$1.vue',
        },
    },
    tabBar: {
        color: '#999999',
        selectedColor: '#333333',
        custom: true,
        list: [{
            "pagePath": "pages/index/index",
            "text": "首页",
            "iconPath": "static/logo.png",
            "selectedIconPath": "static/logo.png"
        },
        {
            "pagePath": "pages/index/theme-example",
            "text": "主题示例",
            "iconPath": "static/logo.png",
            "selectedIconPath": "static/logo.png"
        }]
    }
})