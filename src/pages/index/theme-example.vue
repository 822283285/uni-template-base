<route lang="json5">
{
  name:'test',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '主题示例页面',
  },
}
</route>
<template>
  <view :style="$c(`vflex bg-base h-${screenHeight}`)">
    <!-- 顶部导航栏 -->
    <view :style="$c(`hflex hflex-hbetween hflex-vcenter h-120 px-30 bg-card border-b`)">
      <view :style="$c(`w-120 h-80`)">
        <!-- 返回按钮位置 -->
      </view>
      <view :style="$c(`vflex vflex-hvcenter`)">
        <text :style="$c(`text-lg text-base font-bold`)">{{ title }}</text>
        <text :style="$c(`text-xs text-secondary`)">{{ subTitle }}</text>
      </view>
      <view :style="$c(`w-120 hflex hflex-hright hflex-vcenter h-80`)">
        <!-- 主题切换按钮 -->
        <view 
          :style="$c(`px-20 py-10 rounded-md`)"
          @click="toggleTheme"
        >
          <text :style="$c(`text-2xl text-inverse`)">{{ currentTheme === 'light' ? '🌙' : '☀️' }}</text>
        </view>
      </view>
    </view>

    <!-- 滚动内容区域 -->
    <scroll-view 
      scroll-y 
      :style="$c(`flex-1 px-30 h-${screenHeight-80} scrollbar-hidden`)"
    >
      <!-- 主题色彩展示 -->
      <view :style="$c(`mb-40`)">
        <text :style="$c(`text-md text-base font-bold mb-20 block`)">主题色彩</text>
        <view :style="$c(`hflex flex-wrap gap-20`)">
          <view 
            v-for="color in themeColors" 
            :key="color.name"
            :style="$c(`vflex vflex-hvcenter w-140 h-120 rounded-md`, `bg-${color.value}`)"
          >
            <text :style="$c(`text-xs text-inverse text-center`)">{{ color.name }}</text>
            <text :style="$c(`text-xs text-inverse text-center opacity-80`)">{{ color.value }}</text>
          </view>
        </view>
      </view>

      <!-- 文字大小展示 -->
      <view :style="$c(`mb-40`)">
        <text :style="$c(`text-md text-base font-bold mb-20 block`)">文字大小</text>
        <view :style="$c(`vflex gap-15`)">
          <view 
            v-for="textSize in textSizes"
            :key="textSize.name"
            :style="$c(`hflex hflex-hbetween hflex-vcenter py-15 px-20 bg-card rounded-sm border-dark`)"
          >
            <text :style="$c(`text-sm text-secondary`)">{{ textSize.name }}</text>
            <text :style="$c(`text-secondary`, textSize.class)">示例文字</text>
          </view>
        </view>
      </view>

      <!-- 布局示例 -->
      <view :style="$c(`mb-40`)">
        <text :style="$c(`text-md text-base font-bold mb-20 block`)">布局示例</text>
        
        <!-- 水平布局 -->
        <view :style="$c(`mb-20`)">
          <text :style="$c(`text-sm text-secondary mb-10 block`)">水平布局 (hflex)</text>
          <view :style="$c(`hflex gap-10 p-20 bg-card rounded-sm border-dark`)">
            <view :style="$c(`w-80 h-60 bg-primary rounded-xs`)"></view>
            <view :style="$c(`w-80 h-60 bg-success rounded-xs`)"></view>
            <view :style="$c(`w-80 h-60 bg-warning rounded-xs`)"></view>
          </view>
        </view>

        <!-- 垂直布局 -->
        <view :style="$c(`mb-20`)">
          <text :style="$c(`text-sm text-secondary mb-10 block`)">垂直布局 (vflex)</text>
          <view :style="$c(`vflex gap-10 p-20 bg-card rounded-sm border-dark w-200`)">
            <view :style="$c(`h-40 bg-primary rounded-xs`)"></view>
            <view :style="$c(`h-40 bg-success rounded-xs`)"></view>
            <view :style="$c(`h-40 bg-warning rounded-xs`)"></view>
          </view>
        </view>

        <!-- 居中布局 -->
        <view :style="$c(`mb-20`)">
          <text :style="$c(`text-sm text-secondary mb-10 block`)">居中布局 (hflex-hvcenter)</text>
          <view :style="$c(`hflex hflex-hvcenter h-120 bg-card rounded-sm border-dark`)">
            <view :style="$c(`w-60 h-60 bg-info rounded-circle`)"></view>
          </view>
        </view>
      </view>

      <!-- 圆角示例 -->
      <view :style="$c(`mb-40`)">
        <text :style="$c(`text-md text-base font-bold mb-20 block`)">圆角示例</text>
        <view :style="$c(`hflex flex-wrap gap-20`)">
          <view 
            v-for="radius in borderRadius"
            :key="radius.name"
            :style="$c(`vflex vflex-hvcenter w-120 h-80 bg-primary`, radius.class)"
          >
            <text :style="$c(`text-xs text-inverse text-center`)">{{ radius.name }}</text>
          </view>
        </view>
      </view>

      <!-- 阴影示例 -->
      <view :style="$c(`mb-40`)">
        <text :style="$c(`text-md text-base font-bold mb-20 block`)">阴影示例</text>
        <view :style="$c(`hflex flex-wrap gap-30`)">
          <view 
            v-for="shadow in shadows"
            :key="shadow.name"
            :style="$c(`vflex vflex-hvcenter w-140 h-100 bg-card rounded-md`, shadow.class)"
          >
            <text :style="$c(`text-xs text-base text-center`)">{{ shadow.name }}</text>
          </view>
        </view>
      </view>

      <!-- 间距示例 -->
      <view :style="$c(`mb-40`)">
        <text :style="$c(`text-md text-base font-bold mb-20 block`)">间距示例</text>
        <view :style="$c(`vflex gap-20`)">
          <view :style="$c(`hflex gap-10 p-20 bg-card rounded-sm border-dark`)">
            <text :style="$c(`text-sm text-secondary`)">gap-10:</text>
            <view :style="$c(`w-40 h-40 bg-primary rounded-xs`)"></view>
            <view :style="$c(`w-40 h-40 bg-success rounded-xs`)"></view>
            <view :style="$c(`w-40 h-40 bg-warning rounded-xs`)"></view>
          </view>
          <view :style="$c(`hflex gap-20 p-20 bg-card rounded-sm border-dark`)">
            <text :style="$c(`text-sm text-secondary`)">gap-20:</text>
            <view :style="$c(`w-40 h-40 bg-primary rounded-xs`)"></view>
            <view :style="$c(`w-40 h-40 bg-success rounded-xs`)"></view>
            <view :style="$c(`w-40 h-40 bg-warning rounded-xs`)"></view>
          </view>
        </view>
      </view>

      <!-- 使用说明 -->
      <view :style="$c(`mb-40`)">
        <text :style="$c(`text-md text-base font-bold mb-20 block`)">使用说明</text>
        <view :style="$c(`p-20 bg-card rounded-sm border-dark`)">
          <text :style="$c(`text-sm text-base block mb-10`)">1. 使用 $c() 函数来应用样式类</text>
          <text :style="$c(`text-sm text-base block mb-10`)">2. 支持多个样式类组合使用</text>
          <text :style="$c(`text-sm text-base block mb-10`)">3. 点击右上角按钮切换主题</text>
          <text :style="$c(`text-sm text-base block`)">4. 所有样式都支持响应式主题切换</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { $c, themeRegistry } from '@utils/xh-utils'
let {screenHeight,screenWidth} = uni.getWindowInfo()
screenHeight = (screenHeight/screenWidth)*750
const title = ref('主题示例页面')
const subTitle = ref('欢迎使用主题工具')

// 当前主题
const currentTheme = computed(() => themeRegistry.getCurrentTheme())

// 主题切换函数
const toggleTheme = () => {
  const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
  themeRegistry.setCurrentTheme(newTheme)
}

// 主题色彩数据
const themeColors = ref([
  { name: '主题色', value: 'primary' },
  { name: '成功色', value: 'success' },
  { name: '警告色', value: 'warning' },
  { name: '危险色', value: 'danger' },
  { name: '信息色', value: 'info' },
  { name: '错误色', value: 'error' }
])

// 文字大小数据
const textSizes = ref([
  { name: '极小 (text-xs)', class: 'text-xs' },
  { name: '小号 (text-sm)', class: 'text-sm' },
  { name: '基础 (text-md)', class: 'text-md' },
  { name: '大号 (text-lg)', class: 'text-lg' },
  { name: '超大 (text-xl)', class: 'text-xl' },
  { name: '极大 (text-xxl)', class: 'text-xxl' }
])

// 圆角数据
const borderRadius = ref([
  { name: '小圆角', class: 'rounded-xs' },
  { name: '中圆角', class: 'rounded-sm' },
  { name: '常规圆角', class: 'rounded-md' },
  { name: '大圆角', class: 'rounded-lg' },
  { name: '圆形', class: 'rounded-circle' }
])

// 阴影数据
const shadows = ref([
  { name: '小投影', class: 'shadow-sm' },
  { name: '基础投影', class: 'shadow-md' },
  { name: '大投影', class: 'shadow-lg' }
])
</script>