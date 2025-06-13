import layout from './theme/layout';
import boxModel from './theme/box-model';
import typography from './theme/typography';
import visual from './theme/visual';
import { lightTheme, darkTheme, type themeObj } from './theme/theme-base'
import { ref, type Ref } from 'vue';
import store from '../storage'
import { deepMerge } from '../data';
import constant from '../constant';

// 定义主题类型 - 支持动态扩展
type ThemeType = string;
type ThemeMap = {
    [key: string]: themeObj;
};

// 主题注册接口
interface ThemeRegistry {
    registerTheme(name: string, themeConfig: themeObj): void;
    unregisterTheme(name: string): void;
    getTheme(name: string): themeObj | undefined;
    getAllThemes(): string[];
    setCurrentTheme(name: string): void;
    getCurrentTheme(): string;
    getCurrentThemeObj(): themeObj;
}

const theme: Ref<ThemeType> = ref((store.get(constant.NOW_THEME) as ThemeType) || 'light');

// 初始化主题映射，包含内置主题
const allTheme: ThemeMap = {
    light: mergeTheme(lightTheme),
    dark: mergeTheme(darkTheme),
};
// 合并完整主题对象
function mergeTheme(sourceTheme: themeObj) {
    return deepMerge<object>(layout, boxModel, typography, visual, sourceTheme) as themeObj;
}
// 主题注册器实现
const themeRegistry: ThemeRegistry = {
    /**
     * 注册新主题
     * @param name 主题名称
     * @param themeConfig 主题配置对象
     */
    registerTheme(name: string, themeConfig: themeObj): void {
        if (!name || typeof name !== 'string') {
            throw new Error('主题名称必须是非空字符串');
        }
        if (!themeConfig || typeof themeConfig !== 'object') {
            throw new Error('主题配置必须是有效的对象');
        }
        allTheme[name] = mergeTheme(themeConfig);
        console.log(`主题 "${name}" 注册成功`);
    },

    /**
     * 注销主题
     * @param name 主题名称
     */
    unregisterTheme(name: string): void {
        if (name === 'light' || name === 'dark') {
            throw new Error('不能注销内置主题');
        }
        if (allTheme[name]) {
            delete allTheme[name];
            // 如果当前使用的主题被注销，切换到默认主题
            if (theme.value === name) {
                this.setCurrentTheme('light');
            }
            console.log(`主题 "${name}" 注销成功`);
        } else {
            console.warn(`主题 "${name}" 不存在`);
        }
    },

    /**
     * 获取指定主题
     * @param name 主题名称
     * @returns 主题配置对象或undefined
     */
    getTheme(name: string): themeObj | undefined {
        return allTheme[name];
    },

    /**
     * 获取所有已注册的主题名称
     * @returns 主题名称数组
     */
    getAllThemes(): string[] {
        return Object.keys(allTheme);
    },

    /**
     * 设置当前主题
     * @param name 主题名称
     */
    setCurrentTheme(name: string): void {
        if (!allTheme[name]) {
            throw new Error(`主题 "${name}" 不存在，请先注册该主题`);
        }
        theme.value = name;
        store.set(constant.NOW_THEME, name);
        console.log(`当前主题已切换为: ${name}`);
    },

    /**
     * 获取当前主题名称
     * @returns 当前主题名称
     */
    getCurrentTheme(): string {
        return theme.value;
    },

    /**
     * 获取当前主题对象
     * @returns 当前主题对象
     */
    getCurrentThemeObj(): themeObj {
        return allTheme[theme.value] || allTheme['light'];
    }
};

/**
 * 样式解析器
 * @param args 样式参数
 */
const parser = (...args: string[]): string => {
    const currentTheme: themeObj = allTheme[theme.value] || allTheme['light'];

    // 处理直接CSS样式
    const handleDirectCSS = (style: string): string => {
        return style.split(';').filter(prop => prop.trim()).map(prop => {
            const [key, value] = prop.split(':').map(part => part.trim());
            return `${key}: ${value};`;
        }).join('');
    };

    // 处理主题样式
    const handleThemeStyle = (style: string): string => {
        
        const trimmedStyle = style.trim();
        if (!trimmedStyle) return '';
        
        // 获取样式前缀
        const getStylePrefix = (style: string): string => {
            return style.split('-').slice(0, -1).join('-') + '-';
        };
        
        // 特殊处理背景和文字颜色
        const handleColorStyle = (style: string, prefix: string, property: string): string => {
            const colorName = style.replace(prefix, '');
            if(currentTheme[style]){
                return `${property}: ${currentTheme[style]};`;
            }
            if (currentTheme[colorName] && typeof currentTheme[colorName] === 'string') {
                return `${property}: ${currentTheme[colorName]};`;
            }
            // 如果不是主题颜色，使用原始处理函数
            if (typeof currentTheme[prefix] === 'function') {
                return currentTheme[prefix](style);
            }
            return '';
        };
        
        // 处理背景颜色
        if (trimmedStyle.startsWith('bg-') && !trimmedStyle.includes('filter') && !trimmedStyle.includes('repeat') && !trimmedStyle.includes('size') && !trimmedStyle.includes('position')) {
            
            return handleColorStyle(trimmedStyle, 'bg-', 'background');
        }
        
        // 处理文字颜色
        if (trimmedStyle.startsWith('text-') && !trimmedStyle.includes('align') && !trimmedStyle.includes('decoration') && !['text-xs', 'text-sm', 'text-md', 'text-lg', 'text-xl', 'text-xxl', 'text-2xl'].includes(trimmedStyle)) {
            return handleColorStyle(trimmedStyle, 'text-', 'color');
        }
        
        // 如果是主题中定义的直接样式
        if (currentTheme[trimmedStyle] && typeof currentTheme[trimmedStyle] === 'string') {
            if (currentTheme[trimmedStyle].includes(';')) {
                return currentTheme[trimmedStyle];
            }

            const prefix = getStylePrefix(trimmedStyle);
            if (typeof currentTheme[prefix] === 'function') {
                return currentTheme[prefix](`${prefix}${currentTheme[trimmedStyle]}`);
            }
        } else { // 如果是需要通过函数处理的样式
            const prefix = getStylePrefix(trimmedStyle);
            if (typeof currentTheme[prefix] === 'function') {
                return currentTheme[prefix](trimmedStyle);
            }
        }

        console.warn(`样式 "${trimmedStyle}" 无法解析`);
        return '';
    };

    // 处理所有输入样式
    return args.map(input => {
        if (input.includes(':')) {
            return handleDirectCSS(input);
        }
        return input.split(' ').map(style => handleThemeStyle(style)).filter(Boolean).join('');
    }).join('');
};

// 导出主题注册器和解析器
export {
    themeRegistry,
    parser,
    theme,
};

export type {
    ThemeType,
    ThemeMap,
    ThemeRegistry
};
