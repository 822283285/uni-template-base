interface themeObj {
    [key: string]: string | Function;
}
const lightTheme: themeObj = {
    // 主题色系
    "primary": "#1677FF", // 主题蓝
    "success": "#52C41A", // 成功绿
    "warning": "#FAAD14", // 警告黄
    "danger": "#FF4D4F", // 危险红
    "info": "#13C2C2", // 信息青
    "error": "#FF4D4F", // 错误红

    // 文字色
    "text-base": "#333333", // 主要文字   
    "text-secondary": "#666666", // 次要文字
    "text-disabled": "#999999", // 禁用文字
    "text-inverse": "#FFFFFF", // 反色文字

    // 背景色
    "bg-base": "#FFFFFF", // 全局背景
    "bg-light": "#FAFAFA", // 浅背景
    "bg-card": "#FFFFFF", // 卡片背景
    "bg-mask": "rgba(0,0,0,0.45)", // 遮罩层

    // 字体尺寸
    "text-xs": "20rpx", // 极小 (20rpx)
    "text-sm": "24rpx", // 小号 (24rpx)
    "text-md": "28rpx", // 基础 (28rpx)
    "text-lg": "32rpx", // 大号 (32rpx)
    "text-xl": "36rpx", // 超大 (36rpx)
    "text-xxl": "40rpx", // 极大 (40rpx)
    "text-2xl": "40rpx", // 极大 (40rpx)

    // 圆角
    "rounded-xs": "4rpx", // 小圆角 (4rpx)
    "rounded-sm": "8rpx", // 中圆角 (8rpx)
    "rounded-md": "12rpx", // 常规圆角 (12rpx)
    "rounded-lg": "16rpx",  // 大圆角 (16rpx)
    "rounded-circle": "9999rpx", // 圆形

    // 边框
    "border": "2rpx solid #EEEEEE", // 边框
    "border-light": "2rpx solid #F5F5F5", // 浅边框

    // 投影
    "shadow-sm": "0 4rpx 8rpx rgba(0,0,0,0.08)", // 小投影
    "shadow-md": "0 8rpx 16rpx rgba(0,0,0,0.12)", // 基础投影
    "shadow-lg": "0 12rpx 24rpx rgba(0,0,0,0.16)" // 大投影
}
const darkTheme: themeObj = {
    // 主题色系
    "primary": "#1668DC", // 深主题蓝
    "success": "#49AA19", // 深成功绿
    "warning": "#D89614", // 深警告黄
    "danger": "#A61D24", // 深危险红
    "info": "#08979C", // 深信息青
    "error": "#A61D24", // 深错误红

    // 文字色
    "text-base": "rgba(255,255,255,0.85)", // 主要文字
    "text-secondary": "rgba(255,255,255,0.65)", // 次要文字
    "text-disabled": "rgba(255,255,255,0.35)", // 禁用文字
    "text-inverse": "#141414", // 反色文字

    // 背景色
    "bg-base": "#111111", // 全局背景
    "bg-light": "#1A1A1A", // 浅背景
    "bg-card": "#1E1E1E", // 卡片背景
    "bg-mask": "rgba(0,0,0,0.65)", // 遮罩层

    // 字体尺寸
    "text-xs": "20rpx", // 极小 (20rpx)
    "text-sm": "24rpx", // 小号 (24rpx)
    "text-md": "28rpx", // 基础 (28rpx)
    "text-lg": "32rpx", // 大号 (32rpx)
    "text-xl": "36rpx", // 超大 (36rpx)
    "text-xxl": "40rpx", // 极大 (40rpx)
    "text-2xl": "40rpx", // 极大 (40rpx)

    // 圆角
    "rounded-xs": "4rpx", // 小圆角 (4rpx)
    "rounded-sm": "8rpx", // 中圆角 (8rpx)
    "rounded-md": "12rpx", // 常规圆角 (12rpx)
    "rounded-lg": "16rpx", // 大圆角 (16rpx)
    "rounded-circle": "9999rpx", // 圆形

    // 边框
    "border-dark": "2rpx solid #333333", // 深边框

    "border-light": "2rpx solid #444444", // 深浅边框

    // 投影
    "shadow-sm": "0 4rpx 8rpx rgba(0,0,0,0.32)", // 小投影
    "shadow-md": "0 8rpx 16rpx rgba(0,0,0,0.48)", // 基础投影
    "shadow-lg": "0 12rpx 24rpx rgba(0,0,0,0.64)" // 大投影
}

export {
    lightTheme,
    darkTheme
}
export type {
    themeObj
}