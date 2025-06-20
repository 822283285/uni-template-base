import { themeRegistry } from "./parser";
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

/**
 * 获取主题字符串
 * @param value 字符串[主题字符串/普通字符串]
 * @returns 字符串
 */
function getThemeStr(value: string): string {
    const themeObj = themeRegistry.getAllThemesObj()[theme.value]
    if (themeObj[value]) {
        return themeObj[value].toString()
    }
    return value
}


/**
 * 颜色转换为RGBA格式
 * @param color 颜色值[主题色/rgba颜色/rgb颜色/16进制颜色]
 * @param alpha 透明度[0-1]
 * @returns RGBA颜色值
 */
function color2rgba(color: string, alpha: number) {
    color = getColor(color)

    // 处理16进制颜色
    if (color.startsWith('#')) {
        let r = parseInt(color.slice(1, 3), 16)
        let g = parseInt(color.slice(3, 5), 16)
        let b = parseInt(color.slice(5, 7), 16)
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    // 处理rgb颜色
    if (color.startsWith('rgb(')) {
        const rgb = color.slice(4, -1).split(',').map(x => x.trim())
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
    }

    // 处理rgba颜色
    if (color.startsWith('rgba(')) {
        const rgba = color.slice(5, -1).split(',').map(x => x.trim())
        return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${alpha})`
    }

    return color
}
/**
 * 颜色转换为RGB格式
 * @param color 颜色值[主题色/rgba颜色/rgb颜色/16进制颜色]
 * @returns RGB颜色值
 */
function color2rgb(color: string) {
    color = getColor(color)

    // 处理16进制颜色
    if (color.startsWith('#')) {
        let r = parseInt(color.slice(1, 3), 16)
        let g = parseInt(color.slice(3, 5), 16)
        let b = parseInt(color.slice(5, 7), 16)
        return `rgb(${r}, ${g}, ${b})`
    }

    // 处理rgb颜色
    if (color.startsWith('rgb(')) {
        const rgb = color.slice(4, -1).split(',').map(x => x.trim())
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    }

    // 处理rgba颜色
    if (color.startsWith('rgba(')) {
        const rgba = color.slice(5, -1).split(',').map(x => x.trim())
        return `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]})`
    }
}


export { getColor, getSize, getThemeStr, color2rgb, color2rgba }