<route lang="json5" type="home">
{
  name: "home",
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
  needLogin: true,
}
</route>
<template>
  <view :style="$c(`vflex vflex-hcenter bg-base  h-${$c.fullh - $c.tabh}`)">
    <xh-navbar :title="title" :is-show-back="false">
      <template #right>
        <text :style="$c(`text-xl hflex hflex-hright wp-100`)" @click="toggleTheme">
          {{ currentTheme == 'light' ? '☀️' : '🌙' }}
        </text>
      </template>
    </xh-navbar>
    <scroll-view scroll-y :style="$c(`flex-1 px-30 h-${$c.fullh - $c.tabh - 100} scrollbar-hidden py-20`)">
      <view :style="$c(`overflow-hidden`)">
        <button :style="$c(`bg-card rounded-md text-md text-base border-light mb-20`)"
          @click="gotoPage('/pages/index/theme-example')">主题示例页</button>
        <button :style="$c(`bg-card rounded-md text-md text-base border-light mb-20`)"
          @click="testRequest">测试请求</button>
        <button :style="$c(`bg-card rounded-md text-md text-base border-light mb-20`)"
          @click="getCurrentPage">获取当前页面实例</button>
        <button :style="$c(`bg-card rounded-md text-md text-base border-light mb-20`)"
          @click="getCurrentPageInfo">获取当前页面信息</button>
      </view>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { $c, $nav, $http } from '@utils/xh-utils'
import { onShow } from '@dcloudio/uni-app'

const title = ref('首页')

// 当前主题
const currentTheme = computed(() => $c.getCurrentTheme())
const toggleTheme = () => {
  const newTHeme = $c.getCurrentTheme() == 'light' ? 'dark' : 'light'
  $c.setCurrentTheme(newTHeme)
}

const gotoPage = (url: string) => {
  $nav.gotoPage(url)
}
const testRequest = () => {
  $http.getAction({ url: 'https://api.pearktrue.cn/api/hitokoto/' }).then(res => {
    console.log(res)
  })
}
const getCurrentPage = () => {
  const currentPage = $nav.getCurrentPage()
  console.log('当前页面实例', currentPage);

}
const getCurrentPageInfo = () => {
  const currentPageInfo = $nav.getCurrentPageInfo()
  console.log('当前页面信息', currentPageInfo);
}
onMounted(() => {
  setTimeout(() => {
    uni.setTabBarStyle({
      backgroundColor: $c.getColor('bg-base'),
      color: $c.getColor('text-secondary'),
      selectedColor: $c.getColor('text-base'),
      borderStyle: $c.getCurrentTheme() == 'dark' ? 'white' : 'black',
    })
    uni.setNavigationBarColor({
      frontColor: $c.getColor('status-light'),
    })
  }, 0)
})
onShow(() => {
  uni.setTabBarStyle({
    backgroundColor: $c.getColor('bg-base'),
    color: $c.getColor('text-secondary'),
    selectedColor: $c.getColor('text-base'),
    borderStyle: $c.getCurrentTheme() == 'dark' ? 'white' : 'black',
  })
  uni.setNavigationBarColor({
    frontColor: $c.getColor('status-light'),
  })
})
</script>