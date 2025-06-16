import { themeRegistry } from "./parser";
import { reactive } from 'vue'
import { theme } from './parser'
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