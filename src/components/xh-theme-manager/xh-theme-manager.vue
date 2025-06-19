<template>
    <view class="theme-manager">
        <!-- 遮罩层 -->
        <view v-if="visible" class="mask" :class="{ 'closing': isClosing }" @click="close"></view>

        <!-- 弹出层 -->
        <view v-if="visible" class="action-sheet" :class="{ 'closing': isClosing }" :style="$c('bg-base')">
            <!-- 标题 -->
            <view :style="$c('border-b-light py-12 text-align-center')">
                <text :style="$c(`text-xl text-base`)">请选择主题</text>
            </view>

            <!-- 主题列表 -->
            <view>
                <view v-for="(item, index) in themeList" :key="index"
                    :style="$c('text-base border-b-light text-align-center text-lg py-12')" @click="selectItem(item)">
                    <text>{{ item.name }}</text>
                </view>
            </view>

            <!-- 取消按钮 -->
            <view :style="$c(`py-8 hflex hflex-hvcenter`)">
                <view :style="$c('text-base bg-card py-8 px-24 m-8 rounded-md text-align-center wp-100')"
                    @click="close">
                    <text>取消</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { $c } from '@/utils/xh-utils';
import { ref } from 'vue';

const themeList = $c.getAllThemes().map(item => {
    if (item === 'light') {
        return { name: '浅色模式', value: 'light' }
    } else if (item === 'dark') {
        return { name: '深色模式', value: 'dark' }
    } else {
        return { name: item, value: item }
    }
})

const visible = ref(false)
const isClosing = ref(false)

const open = () => {
    visible.value = true
    isClosing.value = false
}

const close = () => {
    isClosing.value = true
    setTimeout(() => {
        visible.value = false
        isClosing.value = false
    }, 300) // 与动画时间保持一致
}

defineExpose({
    open
});

const emit = defineEmits(['confirm'])

const selectItem = (item: Record<string, string>) => {
    $c.setCurrentTheme(item.value)
    emit('confirm', item)
    close()
}
</script>

<style scoped>
.theme-manager {
    position: relative;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    animation: fadeIn 0.3s ease-out;
}

.mask.closing {
    animation: fadeOut 0.3s ease-out;
}

.action-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px 16px 0 0;
    z-index: 1000;
    animation: slideUp 0.3s ease-out;
}

.action-sheet.closing {
    animation: slideDown 0.3s ease-out;
}

@keyframes slideUp {
    from {
        transform: translateY(100%);
    }

    to {
        transform: translateY(0);
    }
}

@keyframes slideDown {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(100%);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}
</style>