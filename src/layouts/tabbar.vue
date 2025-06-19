<template>
    <slot></slot>
</template>
<script setup lang="ts">
import { $c } from '@/utils/xh-utils';
import { onShow } from '@dcloudio/uni-app';
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