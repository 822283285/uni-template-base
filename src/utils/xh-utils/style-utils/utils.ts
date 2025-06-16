import { themeRegistry } from "./parser";
import { reactive } from 'vue'
import { theme } from './parser'
/** 
 * 获取主题颜色
 * @param color 颜色值[主题色/rgba颜色/rgb颜色/16进制颜色]
 * @returns 颜色值
 */
function getColor(color: string): string {
    const themeObj = themeRegistry.getAllThemesObj()[theme.value]
    if (color.startsWith('#')) {
        return color
    }
    if (color.includes('rgb')) {
        return color
    }
    if (themeObj[color]) {
        return themeObj[color].toString()
    }

    return color
}
/**
 * 获取主题尺寸
 * @param size 尺寸值[主题尺寸/px值/rpx值/数值]
 * @returns 尺寸值(单位rpx)
 */
function getSize(size: string | number): string {
    const themeObj = themeRegistry.getAllThemesObj()[theme.value]
    if (typeof size === 'string') {
        if (size.includes('px')) {
            return size
        }
        if (themeObj[size]) {
            return themeObj[size].toString()
        }
    }
    if (typeof size === "number") {
        return size + 'rpx'
    }
    return size
}

function getThemeStr(value: string): string {
    const themeObj = themeRegistry.getAllThemesObj()[theme.value]
    if (themeObj[value]) {
        return themeObj[value].toString()
    }
    return value
}

export { getColor, getSize, getThemeStr }