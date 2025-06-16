import layout from './theme/layout';
import boxModel from './theme/box-model';
import typography from './theme/typography';
import visual from './theme/visual';
import { lightTheme, darkTheme, type themeObj } from './theme/theme-base'
import { ref, type Ref } from 'vue';
import store from '../storage'
import $data from '../data';
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
    getAllThemesObj(): ThemeMap;
    setCurrentTheme(name: string): void;
    getCurrentTheme(): string;
    getCurrentThemeObj(): themeObj;
}

const theme: Ref<ThemeType> = ref((store.get(constant.NOW_THEME) as ThemeType) || 'light');

// 缓存系统
interface CacheSystem {
    // 整体CSS解析缓存 - key: 完整参数字符串, value: 解析结果
    fullParseCache: Map<string, string>;
    // 类CSS处理缓存 - key: 类CSS字符串, value: 解析结果
    classStringCache: Map<string, string>;
    // 单个类处理缓存 - key: 单个类名, value: 解析结果
    singleClassCache: Map<string, string>;
    // 清空所有缓存
    clearAll(): void;
}

const cacheSystem: CacheSystem = {
    fullParseCache: new Map<string, string>(),
    classStringCache: new Map<string, string>(),
    singleClassCache: new Map<string, string>(),
    clearAll() {
        this.fullParseCache.clear();
        this.classStringCache.clear();
        this.singleClassCache.clear();
        console.log('样式缓存已清空');
    }
};

// 初始化主题映射，包含内置主题
const allTheme: ThemeMap = {
    light: mergeTheme(lightTheme),
    dark: mergeTheme(darkTheme),
};
// 合并完整主题对象
function mergeTheme(sourceTheme: themeObj) {
    return $data.deepMerge<object>(layout, boxModel, typography, visual, sourceTheme) as themeObj;
}

// 简单哈希函数
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; // 转换为32位整数
    }
    return hash.toString();
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
        allTheme[name] = mergeTheme($data.deepMerge(this.getCurrentThemeObj(), themeConfig));
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

    getAllThemesObj(): ThemeMap {
        return allTheme;
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
        // 切换主题时清空缓存
        cacheSystem.clearAll();
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

// ==================== 缓存装饰器 ====================
/**
 * 缓存装饰器函数
 * @param fn 需要缓存的函数
 * @param cacheMap 缓存映射
 * @returns 带缓存的函数
 */
function withCache<T extends (...args: any[]) => string>(fn: T, cacheMap: Map<string, string>): (cacheKey: string, ...args: Parameters<T>) => string {
    return (cacheKey: string, ...args: Parameters<T>): string => {
        if (cacheMap.has(cacheKey)) {
            return cacheMap.get(cacheKey)!;
        }
        const result = fn(...args);
        cacheMap.set(cacheKey, result);
        return result;
    };
}

// ==================== 样式处理器 ====================
/**
 * 获取样式前缀
 * @param style 样式字符串
 * @returns 样式前缀
 */
function getStylePrefix(style: string): string {
    return style.split('-').slice(0, -1).join('-') + '-';
}

/**
 * 处理直接CSS样式
 * @param style CSS样式字符串
 * @returns 格式化的CSS字符串
 */
function parseDirectCSS(style: string): string {
    return style.split(';').filter(prop => prop.trim()).map(prop => {
        const [key, value] = prop.split(':').map(part => part.trim());
        return `${key}: ${value};`;
    }).join('');
}

/**
 * 处理颜色样式（背景色、文字色）
 * @param style 样式字符串
 * @param prefix 样式前缀
 * @param property CSS属性名
 * @param currentTheme 当前主题对象
 * @returns CSS字符串
 */
function parseColorStyle(style: string, prefix: string, property: string, currentTheme: themeObj): string {
    const colorName = style.replace(prefix, '');

    if (currentTheme[style]) {
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
}

/**
 * 处理边框样式
 * @param style 样式字符串
 * @param currentTheme 当前主题对象
 * @returns CSS字符串
 */
function parseBorderStyle(style: string, currentTheme: themeObj): string {
    if (!style.startsWith('border-')) return '';

    const prefix = getStylePrefix(style);

    // 处理完整边框样式
    if (currentTheme[style]) {
        return `border: ${currentTheme[style]};`;
    }

    // 处理单侧边框样式
    const sideMap = { t: 'top', r: 'right', b: 'bottom', l: 'left' };
    for (const [shortSide, fullSide] of Object.entries(sideMap)) {
        if (prefix === `border-${shortSide}-`) {
            const themeValue = currentTheme[style.replace(`-${shortSide}`, '')];
            if (themeValue) {
                return `border-${fullSide}: ${themeValue};`;
            }
        }
    }

    // 处理x/y轴边框样式
    const axisMap = {
        x: ['left', 'right'],
        y: ['top', 'bottom']
    };

    for (const [axis, sides] of Object.entries(axisMap)) {
        if (prefix === `border-${axis}-`) {
            const themeValue = currentTheme[style.replace(`-${axis}`, '')];
            if (themeValue) {
                return sides.map(side => `border-${side}: ${themeValue};`).join('');
            }
        }
    }

    return '';
}

/**
 * 处理圆角样式
 * @param style 样式字符串
 * @param currentTheme 当前主题对象
 * @returns CSS字符串
 */
function parseRoundedStyle(style: string, currentTheme: themeObj): string {
    const prefix = getStylePrefix(style);

    // 处理完整圆角样式
    if (currentTheme[style]) {
        return `border-radius: ${currentTheme[style]};`;
    }

    // 处理单侧圆角样式
    const sideMap = {
        t: ['top-left', 'top-right'],
        r: ['top-right', 'bottom-right'],
        b: ['bottom-left', 'bottom-right'],
        l: ['top-left', 'bottom-left']
    };

    for (const [shortSide, corners] of Object.entries(sideMap)) {
        if (prefix === `rounded-${shortSide}-`) {
            const themeValue = currentTheme[style.replace(`-${shortSide}`, '')];
            if (themeValue) {
                return corners.map(corner => `border-${corner}-radius: ${themeValue};`).join('');
            }
        }
    }

    // 处理角落圆角样式
    const cornerMap = {
        tr: 'top-right',
        tl: 'top-left',
        br: 'bottom-right',
        bl: 'bottom-left'
    };

    for (const [shortCorner, fullCorner] of Object.entries(cornerMap)) {
        if (prefix === `rounded-${shortCorner}-`) {
            const themeValue = currentTheme[style.replace(`-${shortCorner}`, '')];
            if (themeValue) {
                return `border-${fullCorner}-radius: ${themeValue};`;
            }
        }
    }

    return '';
}

/**
 * 处理主题样式
 * @param style 样式字符串
 * @param currentTheme 当前主题对象
 * @returns CSS字符串
 */
function parseThemeStyle(style: string, currentTheme: themeObj): string {
    const trimmedStyle = style.trim();
    if (!trimmedStyle) return '';

    // 如果是主题中定义的直接样式
    if (currentTheme[trimmedStyle] && typeof currentTheme[trimmedStyle] === 'string') {
        if (currentTheme[trimmedStyle].includes(';')) {
            return currentTheme[trimmedStyle];
        }

        const prefix = getStylePrefix(trimmedStyle);
        if (typeof currentTheme[prefix] === 'function') {
            return currentTheme[prefix](`${prefix}${currentTheme[trimmedStyle]}`);
        }
    }

    // 如果是需要通过函数处理的样式
    const prefix = getStylePrefix(trimmedStyle);
    if (typeof currentTheme[prefix] === 'function') {
        return currentTheme[prefix](trimmedStyle);
    }

    return '';
}

// ==================== 样式处理策略映射 ====================
type StyleHandler = (style: string, currentTheme: themeObj) => string;

interface StyleRule {
    test: (style: string) => boolean;
    handler: StyleHandler;
}

/**
 * 样式处理规则数组
 */
const styleRules: StyleRule[] = [
    {
        test: (style) => style.startsWith('rounded-') && ['xs', 'sm', 'md', 'lg', 'circle'].some(size => style.includes(size)),
        handler: parseRoundedStyle
    },
    {
        test: (style) => style.startsWith('border-') && ['light', 'dark'].some(theme => style.includes(theme)),
        handler: parseBorderStyle
    },
    {
        test: (style) => style.startsWith('bg-') && !['filter', 'repeat', 'size', 'position'].some(prop => style.includes(prop)),
        handler: (style, theme) => parseColorStyle(style, 'bg-', 'background', theme)
    },
    {
        test: (style) => style.startsWith('text-') && !['align', 'decoration'].some(prop => style.includes(prop)) && !['text-xs', 'text-sm', 'text-md', 'text-lg', 'text-xl', 'text-xxl', 'text-2xl'].includes(style),
        handler: (style, theme) => parseColorStyle(style, 'text-', 'color', theme)
    },
    {
        test: () => true, // 默认处理器
        handler: parseThemeStyle
    }
];

/**
 * 处理单个样式类
 * @param style 样式字符串
 * @param currentTheme 当前主题对象
 * @returns CSS字符串
 */
function processSingleStyle(style: string, currentTheme: themeObj): string {
    const trimmedStyle = style.trim();
    if (!trimmedStyle) return '';

    // 查找匹配的处理规则
    const rule = styleRules.find(rule => rule.test(trimmedStyle));
    const result = rule ? rule.handler(trimmedStyle, currentTheme) : '';

    if (!result) {
        console.warn(`样式 "${trimmedStyle}" 无法解析`);
    }

    return result;
}

// ==================== 主解析器 ====================
/**
 * 样式解析器
 * @param args 样式参数
 * @returns 解析后的CSS字符串
 */
const parser = (...args: string[]): string => {
    const currentTheme: themeObj = allTheme[theme.value] || allTheme['light'];

    // 带缓存的处理函数
    const cachedFullParse = withCache(
        (args: string[]) => parseStylesInternal(args, currentTheme),
        cacheSystem.fullParseCache
    );

    const fullCacheKey = simpleHash(`${theme.value}:${args.join('|')}`);
    return cachedFullParse(fullCacheKey, args);
};

/**
 * 内部样式解析函数
 * @param args 样式参数数组
 * @param currentTheme 当前主题对象
 * @returns 解析后的CSS字符串
 */
function parseStylesInternal(args: string[], currentTheme: themeObj): string {
    const cachedClassParse = withCache((input: string) => parseClassString(input, currentTheme), cacheSystem.classStringCache);

    return args.map(input => {
        if (input.includes(':')) {
            return parseDirectCSS(input);
        }

        const classStringCacheKey = simpleHash(`${theme.value}:${input}`);
        return cachedClassParse(classStringCacheKey, input);
    }).join('');
}

/**
 * 解析类字符串
 * @param input 输入的类字符串
 * @param currentTheme 当前主题对象
 * @returns 解析后的CSS字符串
 */
function parseClassString(input: string, currentTheme: themeObj): string {
    const cachedSingleParse = withCache((style: string) => processSingleStyle(style, currentTheme), cacheSystem.singleClassCache);

    return input.split(' ').map(style => {
        const singleClassCacheKey = simpleHash(`${theme.value}:${style}`);
        return cachedSingleParse(singleClassCacheKey, style);
    }).filter(Boolean).join('');
}

// 导出主题注册器、解析器和缓存系统
export {
    themeRegistry,
    parser,
    theme,
    cacheSystem,
};

export type {
    ThemeType,
    ThemeMap,
    ThemeRegistry
};
