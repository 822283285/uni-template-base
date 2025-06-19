<template>
  <view v-if="isSafe" :style="$c(`h-${$c.sbh} w-750 bg-base`)" />
  <view :style="$c(`hflex hflex-hbetween hflex-vcenter h-${height} w-${width} px-20 border-b-light bg-base`)">
    <!-- 左侧区域 -->
    <view :style="$c(`w-160 h-${height} hflex hflex-vcenter`)">
      <slot name="left">
        <view v-if="isShowBack" @click="back" :style="$c(`hflex hflex-hleft hflex-vcenter h-${height}`)">
          <sar-icon name="left" :root-style="$c(`text-base text-md mt-2`)" />
          <text :style="$c(`text-md text-base`)">返回</text>
        </view>
      </slot>
    </view>

    <!-- 中间标题区域 -->
    <view :style="$c(`vflex vflex-hvcenter`)">
      <slot name="center">
        <text :style="$c(`text-${titleSize} text-${titleColor} font-bold`)">{{ title }}</text>
        <text v-if="desc" :style="$c(`text-${descSize} text-${descColor}`)">{{ desc }}</text>
      </slot>
    </view>

    <!-- 右侧区域 -->
    <view :style="$c(`w-160 h-${height} hflex hflex-vcenter`)">
      <!-- 自定义右侧内容插槽 -->
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">

import { $c, $nav } from '@/utils/xh-utils';

const props = defineProps({
  title: {
    type: String,
    default: '首页',
  },
  desc: {
    type: String,
    default: '',
  },
  height: {
    type: [String, Number],
    default: 80
  },
  width: {
    type: [String, Number],
    default: 750
  },
  titleSize: {
    type: [String, Number],
    default: 'lg'
  },
  descSize: {
    type: [String, Number],
    default: 'xs'
  },
  titleColor: {
    type: String,
    default: 'base'
  },
  descColor: {
    type: String,
    default: 'secondary'
  },
  isShowBack: {
    type: Boolean,
    default: true
  },
  isHookBack: {
    type: Boolean,
    default: false
  },
  isSafe: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['back'])

const back = () => {
  if (props.isHookBack) {
    emit('back')
  } else {
    $nav.back()
  }
}

</script>