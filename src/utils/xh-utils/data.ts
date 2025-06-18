/**
 * 深度合并对象工具函数
 * @param objects 待合并的对象列表
 * @returns 合并后的对象
 */
function deepMerge<T extends object>(...objects: Partial<T>[]): T {
    if (objects.length === 0) return {} as T;
    if (objects.length === 1) return objects[0] as T;

    const result = { ...objects[0] };

    for (let i = 1; i < objects.length; i++) {
        const source = objects[i];

        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                const sourceValue = source[key];
                const targetValue = result[key];

                if (
                    sourceValue &&
                    targetValue &&
                    typeof sourceValue === 'object' &&
                    typeof targetValue === 'object' &&
                    !Array.isArray(sourceValue) &&
                    !Array.isArray(targetValue)
                ) {
                    result[key] = deepMerge<object>(targetValue as object, sourceValue as object) as T[Extract<keyof T, string>];
                } else {
                    result[key] = sourceValue as T[Extract<keyof T, string>];
                }
            }
        }
    }

    return result as T;
}

/**
 * 深拷贝对象
 * @param obj 待拷贝对象
 * @returns 拷贝后的对象
 */
function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    const temp: any = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            temp[key] = deepClone(obj[key]);
        }
    }

    return temp as T;
}

/**
 * 获取uuid
 * @returns uuid
 */
function getUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
/**
 * 简单哈希函数
 * @param str 待哈希字符串
 * @returns 哈希值
 */
function getSimpleHash(str: string) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
export { deepMerge, deepClone, getUUID, getSimpleHash };
export default { deepMerge, deepClone, getUUID, getSimpleHash };
    