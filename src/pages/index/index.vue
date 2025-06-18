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
    <xh-navbar :title="title" :is-show-back="false">
      <template #right>
        <text :style="$c(`text-xl hflex hflex-hright wp-100`)" @click="onThemeToggle">
          {{ nowTheme == 'light' ? '☀️' : '🌙' }}
        </text>
      </template>
    </xh-navbar>
    <view>
      <button @click="gotoPage('/pages/index/theme-example')">主题示例页</button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { $c, $nav } from '@utils/xh-utils'

const title = ref('首页')
const nowTheme = ref($c.getCurrentTheme())
const onThemeToggle = () => {
  nowTheme.value = nowTheme.value == 'light' ? 'dark' : 'light'
  $c.setCurrentTheme(nowTheme.value)
  console.log('主题已切换为:', $c.getCurrentTheme())
}

const gotoPage = (url: string) => {
  $nav.gotoPage(url)
}

</script>