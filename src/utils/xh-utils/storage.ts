/**
 * 从本地存储中获取数据
 * @param key - 存储键名
 * @returns 存储的值，如果过期或不存在则返回null
 */
const get = (key: string): any => {
    const valueObj: { value: any; expire: number | null } = uni.getStorageSync(key);
    if (valueObj?.expire && valueObj.expire < Date.now()) {
        uni.removeStorageSync(key);
        return null;
    } else {
        return valueObj?.value;
    }
}

/**
 * 将数据存储到本地存储中
 * @param key - 存储键名
 * @param value - 要存储的值
 * @param expire - 过期时间(毫秒)，可选
 */
const set = (key: string, value: any, expire?: number): void => {
    uni.setStorageSync(key, {
        value,
        expire: expire ? Date.now() + expire : null
    });
}

/**
 * 从本地存储中移除指定键的数据
 * @param key - 要移除的存储键名
 */
const remove = (key: string): void => {
    uni.removeStorageSync(key);
}

/**
 * 清空本地存储中的所有数据
 */
const clear = (): void => {
    uni.clearStorageSync();
}

export default {
    get,
    set,
    remove,
    clear
};
