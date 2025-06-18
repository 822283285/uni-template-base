import config from '@/project/request'
import { getSimpleHash } from './data';
import { $store } from '.';

// 请求方法类型
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// 请求选项接口
interface RequestOptions {
    url: string;
    method?: HttpMethod;
    params?: Record<string, any>;
    data?: Record<string, any>;
    header?: Record<string, string>;
    needToken?: boolean;
    timeout?: number;
    retry?: number;
    retryDelay?: number;
    cacheTime?: number;
}

// 响应错误接口
interface RequestError {
    statusCode?: number;
    message: string;
    data?: any;
    error?: any;
}

// 配置常量
const REQUEST_CONFIG = {
    baseUrl: config.baseUrl,
    retry: config.retry,
    retryDelay: config.retryDelay,
    timeout: config.timeout,
    tokenHeaderKey: config.tokenHeaderKey,
    tokenHeaderPrefix: config.tokenHeaderPrefix,
    getToken: config.getToken,
} as const;

/**
 * 生成缓存键
 * @param url 请求URL
 * @param method 请求方法
 * @param params 请求参数
 * @param data 请求数据
 * @returns 缓存键
 */
function generateCacheKey(url: string, method: string, params: Record<string, any>, data: Record<string, any>): string {
    const requestInfo = {
        url,
        method,
        params,
        data
    };
    const hash = getSimpleHash(JSON.stringify(requestInfo));
    return `__request_cache_${hash}__`;
}

/**
 * 处理token验证
 * @param needToken 是否需要token
 * @returns 包含token的header对象或Promise.reject
 */
function handleToken(needToken: boolean): Record<string, string> | Promise<never> {
    if (!needToken) {
        return {};
    }

    const token = REQUEST_CONFIG.getToken();
    if (!token) {
        return Promise.reject<never>({
            message: "未登录或token已失效",
        } as RequestError);
    }

    return {
        [REQUEST_CONFIG.tokenHeaderKey]: REQUEST_CONFIG.tokenHeaderPrefix + token
    };
}
/**
 * 构建完整的URL
 * @param url 基础URL
 * @param params 查询参数
 * @returns 完整的URL
 */
function buildUrl(url: string, params: Record<string, any>): string {
    let finalUrl = url.startsWith('http') ? url : REQUEST_CONFIG.baseUrl + url;

    if (Object.keys(params).length > 0) {
        const queryString = Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
        finalUrl += (finalUrl.includes('?') ? '&' : '?') + queryString;
    }

    return finalUrl;
}

/**
 * 构建请求头
 * @param customHeaders 自定义请求头
 * @param tokenHeader token请求头
 * @returns 完整的请求头
 */
function buildHeaders(customHeaders: Record<string, string>, tokenHeader: Record<string, string>): Record<string, string> {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...customHeaders,
        ...tokenHeader,
    };
}

/**
 * 处理重试逻辑
 * @param retryCount 当前重试次数
 * @param maxRetry 最大重试次数
 * @param retryDelay 重试延迟
 * @param executeRequest 执行请求的函数
 * @param resolve Promise resolve
 * @param reject Promise reject
 */
function handleRetry(retryCount: number, maxRetry: number, retryDelay: number, executeRequest: (count: number) => Promise<any>, resolve: (value: any) => void, reject: (reason: any) => void): void {
    if (retryCount < maxRetry) {
        setTimeout(() => {
            executeRequest(retryCount + 1).then(resolve).catch(reject);
        }, retryDelay);
    } else {
        reject({
            message: '请求重试次数已达上限',
        } as RequestError);
    }
}

/**
 * 发起请求
 * @param options 请求参数
 * @returns 请求结果
 */
function baseRequest(options: RequestOptions): Promise<any> {
    const {
        url,
        method = 'GET',
        params = {},
        data = {},
        header = {},
        needToken = false,
        timeout = REQUEST_CONFIG.timeout,
        retry = REQUEST_CONFIG.retry,
        retryDelay = REQUEST_CONFIG.retryDelay,
        cacheTime = 0
    } = options;

    // 检查缓存
    const cacheKey = generateCacheKey(url, method, params, data);
    const cacheData = $store.get(cacheKey);
    if (cacheData) {
        return Promise.resolve(cacheData);
    }

    // 处理token
    const tokenHeader = handleToken(needToken);
    if (tokenHeader instanceof Promise) {
        return tokenHeader;
    }

    // 构建URL和请求头
    const finalUrl = buildUrl(url, params);
    const requestHeaders = buildHeaders(header, tokenHeader);
    // 执行请求并支持重试
    const executeRequest = (retryCount: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            uni.request({
                url: finalUrl,
                data: method.toUpperCase() === 'GET' ? {} : data,
                header: requestHeaders,
                method: method as any,
                timeout,
                sslVerify: true,
                success: ({ data: responseData, statusCode }) => {
                    if (statusCode >= 200 && statusCode < 300) {
                        // 缓存成功响应
                        if (cacheTime > 0) {
                            $store.set(cacheKey, responseData, cacheTime);
                        }
                        resolve(responseData);
                    } else {
                        const error: RequestError = {
                            statusCode,
                            message: '请求失败',
                            data: responseData,
                        };
                        handleRetry(retryCount, retry, retryDelay, executeRequest, resolve, () => reject(error));
                    }
                },
                fail: (error) => {
                    const requestError: RequestError = {
                        message: '网络请求失败',
                        error,
                    };
                    handleRetry(retryCount, retry, retryDelay, executeRequest, resolve, () => reject(requestError));
                },
                complete: () => {
                    // 请求完成后的处理逻辑可以在这里添加
                },
            });
        });
    };

    return executeRequest(0);
}

/**
 * 发起GET请求
 * @param options 请求参数
 * @returns 请求结果
 */
function getAction(options: RequestOptions) {
    return baseRequest({ ...options, method: 'GET' });
}

/**
 * 发起POST请求
 * @param options 请求参数
 * @returns 请求结果
 */
function postAction(options: RequestOptions) {
    return baseRequest({ ...options, method: 'POST' });
}

/**
 * 发起PUT请求
 * @param options 请求参数
 * @returns 请求结果
 */
function putAction(options: RequestOptions) {
    return baseRequest({ ...options, method: 'PUT' });
}

/**
 * 发起DELETE请求
 * @param options 请求参数
 * @returns 请求结果
 */
function deleteAction(options: RequestOptions) {
    return baseRequest({ ...options, method: 'DELETE' });
}

// 导出主要函数
export default { baseRequest, getAction, postAction, putAction, deleteAction };
export {
    type RequestOptions,
    type HttpMethod,
    getAction,
    postAction,
    putAction,
    deleteAction,
    baseRequest
}