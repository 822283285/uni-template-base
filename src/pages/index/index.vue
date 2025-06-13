<route lang="json5" type="home">
{
  name: "home",
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view :style="$c(`vflex vflex-hcenter hv-100 bg-base w-750`)">
    <view :style="$c(`hflex hflex-hbetween hflex-vcenter h-80 w-750 px-20 border-light`)">
      <view :style="$c(`w-160 h-80`)">

      </view>
      <view :style="$c(`vflex vflex-hvcenter`)">
        <text :style="$c(`text-lg text-base`)">{{ title }}</text>
        <text :style="$c(`text-xs text-secondary`)">{{ subTitle }}</text>
      </view>
      <view :style="$c(`w-160 hflex hflex-hright hflex-vcenter h-80`)">
        <text @click="toggleTheme" :style="$c(`text-2xl`)">
          {{ theme == 'dark' ? '🌙' : '☀️' }}
        </text>
      </view>
    </view>
    <view>
      <button @click="gotoPage('/pages/index/theme-example')">主题示例页</button>
    </view>
  </view>

</template>
<script setup lang="ts">
import { ref } from 'vue'
import { $c, $nav } from '@utils/xh-utils'
const title = ref('首页')
const subTitle = ref('欢迎使用')
const theme = ref($c.themeRegistry.getCurrentTheme())
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  $c.themeRegistry.setCurrentTheme(theme.value)
}
const gotoPage = (url: string) => {
  $nav.gotoPage(url)
}

</script>