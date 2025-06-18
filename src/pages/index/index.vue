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
  <view :style="$c(`vflex vflex-hcenter bg-base  h-${$c.sxh - $c.tabh}`)">
    <xh-navbar :title="title" :is-show-back="false">
      <template #right>
        <text :style="$c(`text-xl hflex hflex-hright wp-100`)" @click="toggleTheme">
          {{ currentTheme == 'light' ? '☀️' : '🌙' }}
        </text>
      </template>
    </xh-navbar>
    <scroll-view scroll-y :style="$c(`flex-1 px-30 h-${$c.sxh - $c.tabh - 100} scrollbar-hidden py-20`)">
      <button @click="gotoPage('/pages/index/theme-example')">主题示例页</button>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { $c, $nav } from '@utils/xh-utils'

const title = ref('首页')

// 当前主题
const currentTheme = computed(() => $c.getCurrentTheme())
const toggleTheme = () => {
  const newTHeme = currentTheme.value == 'light' ? 'dark' : 'light'
  $c.setCurrentTheme(newTHeme)
  uni.setTabBarStyle({
    backgroundColor: $c.getColor('bg-base'),
    color: $c.getColor('text-secondary'),
    selectedColor: $c.getColor('text-base'),
  })
}

const gotoPage = (url: string) => {
  $nav.gotoPage(url)
}

</script>