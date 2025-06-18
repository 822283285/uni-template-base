import { $store, $nav } from "@/utils/xh-utils"
const baseConfig = {
    // 基础配置
    baseUrl: 'https://api.example.com',
    retry: 3,
    retryDelay: 1000,
    timeout: 8000,
    // token配置
    tokenStorageKey: '__token_storage_key__',
    tokenHeaderKey: 'Authorization',
    tokenHeaderPrefix: 'Bearer ',
    getToken: () => {
        const key = $store.get(baseConfig.tokenStorageKey)
        if (key) {
            return key
        } else {
            return false
        }
    }
}
export default baseConfig