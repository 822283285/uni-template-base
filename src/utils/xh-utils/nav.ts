/**
 * 导航工具集
 */

import * as pagesConfig from '@/pages.json'
const { pages, subPackages, tabBar = { list: [] } } = { ...pagesConfig }

interface ParamMap {
    [key: string]: any;
}

interface PageOption {
    [key: string]: any;
}

/**
 * 向URL插入参数
 * @param {string} url - 要处理的URL字符串
 * @param {Object} paramMap - 要添加的参数对象
 * @param {boolean} isUseEncode - 是否使用encodeURIComponent编码，默认为true
 * @returns {string} 处理后的URL
 */
const insertParamsToUrl = (url: string, paramMap: ParamMap, isUseEncode: boolean = true): string => {
    let questionPos: number = url.indexOf("?");
    let tokens: string[] = [];
    let tokenMap: ParamMap = {};

    if (questionPos > 0) {
        let urlParam: string = url.substring(questionPos + 1);
        url = url.substring(0, questionPos);
        tokens = urlParam.split("&");

        tokens.forEach((item: string) => {
            let paramTokens: string[] = item.split("=");
            if (paramTokens.length == 2) {
                tokenMap[encodeURIComponent(paramTokens[0])] = encodeURIComponent(
                    paramTokens[1]
                );
            }
        });
    }

    Object.keys(paramMap).forEach((key: string) => {
        if (isUseEncode) {
            tokenMap[encodeURIComponent(key)] = encodeURIComponent(
                JSON.stringify(paramMap[key])
            );
        } else {
            tokenMap[key] = paramMap[key];
        }
    });

    tokens = [];
    Object.keys(tokenMap).forEach((key: string) => {
        tokens.push(key + "=" + tokenMap[key]);
    });

    if (tokens.length > 0) {
        url = url + "?" + tokens.join("&");
    }

    return url;
};

/**
 * 页面导航函数
 * @param {string} url - 导航目标路径
 * @param {Object} urlParams - 要传递的URL参数，默认为空对象
 */
const gotoPage = (url: string, urlParams: ParamMap = {}): void => {
    if (url.indexOf("/") >= 0) {
        if (!url.startsWith("/")) {
            url = "/" + url;
        }

        url = insertParamsToUrl(url, urlParams);

        uni.navigateTo({
            url: url,
            fail: (err: any) => {
                uni.switchTab({
                    url: url,
                });
            },
        });
        return;
    }
};

/**
 * 获取页面参数
 * @param {Object} option - 页面参数对象
 * @param {string} varName - 要获取的参数名
 * @param {*} defaultValue - 参数不存在时的默认值
 * @returns {*} 解析后的参数值或默认值
 */
const getUniPageParam = <T>(option: PageOption, varName: string, defaultValue: T): T => {
    if (option && typeof option === "object") {
        if (varName in option) {
            try {
                let text = JSON.parse(decodeURIComponent(option[varName]));
                return text as T;
            } catch (e) {
                return decodeURIComponent(option[varName]) as T;
            }
        } else {
            return defaultValue;
        }
    } else {
        return defaultValue;
    }
};
/**
 * 重定向到指定页面
 * @param {string} url - 要重定向的页面路径
 */
const redirectTo = (url: string): void => {
    uni.redirectTo({
        url: url,
        fail() {
            uni.switchTab({
                url: url
            })
        }
    })
}

/**
 * 回退至上一个页面
 */
const back = (): void => {
    uni.navigateBack()
}

/**
 * 获取上一个页面实例
 * @returns {UniApp.PageInstance | null} 上一个页面实例，如果不存在则返回 null
 */
const getPrePage = () => {
    const pageStack = getCurrentPages();
    if (pageStack.length > 1) {
        return pageStack[pageStack.length - 2];
    }
    return null;
}

/**
 * 获取当前页面实例
 * @returns {UniApp.PageInstance | null} 当前页面实例，如果不存在则返回 null
 */
const getCurrentPage = () => {
    const pageStack = getCurrentPages();
    if (pageStack.length > 0) {
        return pageStack[pageStack.length - 1];
    }
    return null;
}

/**
 * 获取当前页面配置信息
 * @returns {Object | null} 当前页面的配置信息，如果不存在则返回 null
 * @description 从pages.json中获取当前页面的配置信息，包含页面路径、样式等配置
 */
const getCurrentPageInfo = () => {
    const pageStack = getCurrentPages();
    if (pages.length > 0) {
        const currentRoute = pageStack[pageStack.length - 1]?.route;

        return pages.find(pageConfig => pageConfig.path === currentRoute);
    }
    return null;
}

/**
 * 获取页面是否为tabbar页面
 * @param {string} url - 页面路径(不传默认为当前页)
 * @returns {boolean} 是否在tabbar中
 */
const getIsTabbar = (url?: string) => {
    if (!url) {
        url = getCurrentPage()?.route;
    }
    if (!url) {
        return false;
    }
    if (url.startsWith('/')) {
        url = url.substring(1)
    }
    const { list } = tabBar;
    const isTabbar = list.some(item => item.pagePath === url);
    return isTabbar;
}

/**
 * 导航工具类
 * @module nav
 * @description 提供页面导航、参数获取、重定向等功能
 * @property {Function} gotoPage - 页面导航函数
 * @property {Function} getUniPageParam - 获取页面参数
 * @property {Function} redirectTo - 重定向函数
 * @property {Function} back - 回退函数
 * @property {Function} getPrePage - 获取上一个页面实例
 * @property {Function} getCurrentPage - 获取当前页面实例
 * @property {Function} getCurrentPageInfo - 获取当前页面信息
 * @property {Function} getIsTabbar - 获取页面是否为tabbar页面
 */
export default {
    gotoPage,
    getUniPageParam,
    redirectTo,
    back,
    getPrePage,
    getCurrentPage,
    getCurrentPageInfo,
    getIsTabbar
}