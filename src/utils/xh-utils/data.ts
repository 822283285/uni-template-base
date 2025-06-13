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
export { deepMerge };
