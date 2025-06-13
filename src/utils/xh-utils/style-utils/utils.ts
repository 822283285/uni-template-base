import { themeRegistry } from "./parser";
import { reactive } from "vue"
function getColor(color: string): string {
    const themeObj = reactive(themeRegistry.getCurrentThemeObj())
    if (color.startsWith('#')) {
        return color
    }
    if (color.includes('rgb')) {
        return color
    }

    if (Object.prototype.hasOwnProperty.call(themeObj, color)) {
        return themeObj[color as keyof typeof themeObj].toString()
    }
    return color
}

export { getColor }