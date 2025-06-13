interface boxModel {
    [key: string]: string | Function;
}

// 创建通用的CSS属性处理函数
const createPropertyHandler = (property: string, prefix: string, defaultUnit: string = 'rpx', additionalUnits: string[] = []) => {
    return (value: string) => {
        const _value = value.replace(`${prefix}-`, "");
        const units = ['px', '%', 'rpx', ...additionalUnits];

        // 检查是否已包含单位
        if (units.some(unit => _value.includes(unit))) {
            return `${property}: ${_value};`;
        }

        // 使用默认单位
        return `${property}: ${_value}${defaultUnit};`;
    };
};

// 创建特定单位的处理函数
const createUnitHandler = (property: string, prefix: string, unit: string) => {
    return (value: string) => {
        const _value = value.replace(`${prefix}-`, "");
        if (_value.includes(unit)) {
            return `${property}: ${_value};`;
        }
        return `${property}: ${_value}${unit};`;
    };
};

// 创建双向属性处理函数（如padding-left和padding-right）
const createDualPropertyHandler = (property1: string, property2: string, prefix: string, defaultUnit: string = 'rpx') => {
    return (value: string) => {
        const _value = value.replace(`${prefix}-`, "");
        if (_value.includes("px") || _value.includes("%") || _value.includes("rpx")) {
            return `${property1}: ${_value}; ${property2}: ${_value};`;
        }
        return `${property1}: ${_value}${defaultUnit}; ${property2}: ${_value}${defaultUnit};`;
    };
};

const boxModel: boxModel = {
    /** 尺寸 */
    // 宽度
    "w-": createPropertyHandler("width", "w", "rpx", ["vw"]),
    "min-w-": createPropertyHandler("min-width", "min-w", "rpx", ["vw"]),
    "max-w-": createPropertyHandler("max-width", "max-w", "rpx", ["vw"]),
    "wv-": createUnitHandler("width", "wv", "vw"),
    "wp-": createUnitHandler("width", "wp", "%"),
    // 高度
    "h-": createPropertyHandler("height", "h", "rpx", ["vh"]),
    "min-h-": createPropertyHandler("min-height", "min-h", "rpx", ["vh"]),
    "max-h-": createPropertyHandler("max-height", "max-h", "rpx", ["vh"]),
    "hv-": createUnitHandler("height", "hv", "vh"),
    "hp-": createUnitHandler("height", "hp", "%"),
    /** 内边距 */
    // 整体
    "p-": createPropertyHandler("padding", "p"),
    // 单方向
    "pt-": createPropertyHandler("padding-top", "pt"),
    "pb-": createPropertyHandler("padding-bottom", "pb"),
    "pl-": createPropertyHandler("padding-left", "pl"),
    "pr-": createPropertyHandler("padding-right", "pr"),
    // 纵横方向
    "px-": createDualPropertyHandler("padding-left", "padding-right", "px"),
    "py-": createDualPropertyHandler("padding-top", "padding-bottom", "py"),
    /** 外边距 */
    // 整体
    "m-": createPropertyHandler("margin", "m"),
    // 单方向
    "mt-": createPropertyHandler("margin-top", "mt"),
    "mb-": createPropertyHandler("margin-bottom", "mb"),
    "ml-": createPropertyHandler("margin-left", "ml"),
    "mr-": createPropertyHandler("margin-right", "mr"),
    // 纵横方向
    "mx-": createDualPropertyHandler("margin-left", "margin-right", "mx"),
    "my-": createDualPropertyHandler("margin-top", "margin-bottom", "my"),
    /** 边框 */
    // 整体
    "border-": createPropertyHandler("border", "border"),
    // 单方向
    "border-t-": createPropertyHandler("border-top", "border-t"),
    "border-b-": createPropertyHandler("border-bottom", "border-b"),
    "border-l-": createPropertyHandler("border-left", "border-l"),
    "border-r-": createPropertyHandler("border-right", "border-r"),
    // 纵横方向
    "border-x-": createDualPropertyHandler("border-left", "border-right", "border-x"),
    "border-y-": createDualPropertyHandler("border-top", "border-bottom", "border-y"),
    /** 圆角 */
    // 整体
    "rounded-": createPropertyHandler("border-radius", "rounded"),
    // 单方向
    "rounded-t-": createDualPropertyHandler("border-top-left-radius", "border-top-right-radius", "rounded-t"),
    "rounded-b-": createDualPropertyHandler("border-bottom-left-radius", "border-bottom-right-radius", "rounded-b"),
    "rounded-l-": createDualPropertyHandler("border-top-left-radius", "border-bottom-left-radius", "rounded-l"),
    "rounded-r-": createDualPropertyHandler("border-top-right-radius", "border-bottom-right-radius", "rounded-r"),
    // 单个圆角
    "rounded-tl-": createPropertyHandler("border-top-left-radius", "rounded-tl"),
    "rounded-tr-": createPropertyHandler("border-top-right-radius", "rounded-tr"),
    "rounded-bl-": createPropertyHandler("border-bottom-left-radius", "rounded-bl"),
    "rounded-br-": createPropertyHandler("border-bottom-right-radius", "rounded-br"),
    /** 常用尺寸 */
    // 全屏高度
    "min-h-100vh": "min-height: 100vh;",
    "h-100vh": "height: 100vh;",
    "max-h-100vh": "max-height: 100vh;",
    // 全屏宽度
    "w-100vw": "width: 100vw;",
    "min-w-100vw": "min-width: 100vw;",
    "max-w-100vw": "max-width: 100vw;",
    // 百分比尺寸
    "w-full": "width: 100%;",
    "h-full": "height: 100%;",
    "w-screen": "width: 100vw;",
    "h-screen": "height: 100vh;"
}
export default boxModel;
export type {
    boxModel
}