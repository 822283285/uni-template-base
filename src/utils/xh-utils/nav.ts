/**
 * 导航工具集
 */

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

const back = (): void => {
    uni.navigateBack()
}
const $nav = {
    gotoPage,
    getUniPageParam,
    redirectTo,
    back
}
/**
 * 导航工具类
 * @namespace navUtils
 * @property {Function} insertParamsToUrl - 向URL中插入参数
 * @property {Function} gotoPage - 页面导航函数
 * @property {Function} getUniPageParam - 获取页面参数
 */
export {
    $nav
};