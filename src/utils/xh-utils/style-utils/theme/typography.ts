interface typography {
    [key: string]: string | Function;
}

// 创建带单位检测的CSS属性处理函数
const createPropertyHandler = (property: string, prefix: string, defaultUnit: string = 'rpx') => {
    return (value: string) => {
        const _value = value.replace(`${prefix}-`, "");
        if (_value.includes("px") || _value.includes("%") || _value.includes("rpx")) {
            return `${property}: ${_value};`;
        }
        return `${property}: ${_value}${defaultUnit};`;
    };
};

// 创建简单的CSS属性处理函数
const createSimpleHandler = (property: string, prefix: string) => {
    return (value: string) => {
        const _value = value.replace(`${prefix}-`, "");
        return `${property}: ${_value};`;
    };
};

// 创建复杂CSS组合处理函数
const createComplexHandler = (baseCSS: string, prefix: string, additionalProperty?: string) => {
    return (value: string) => {
        const _value = value.replace(`${prefix}-`, "");
        if (additionalProperty) {
            return `${baseCSS} ${additionalProperty}: ${_value};`;
        }
        return baseCSS;
    };
};

const typography: typography = {
    /** 字体相关 */
    // 字体大小
    "text-": createPropertyHandler("font-size", "text"),
    // 字体粗细
    "font-": createSimpleHandler("font-weight", "font"),
    "font-bold": "font-weight: bold;",
    "font-normal": "font-weight: normal;",
    "font-light": "font-weight: 300;",
    "font-medium": "font-weight: 500;",
    "font-semibold": "font-weight: 600;",
    /** 文本相关 */
    // 对齐方式
    "text-align-": createSimpleHandler("text-align", "text-align"),
    "text-left": "text-align: left;",
    "text-center": "text-align: center;",
    "text-right": "text-align: right;",
    // 文字修饰
    "text-decoration-": createSimpleHandler("text-decoration", "text-decoration"),
    // 显示方式
    "block": "display: block;",
    "inline": "display: inline;",
    "inline-block": "display: inline-block;",
    "none": "display: none;",
    // 超出省略
    "w-elips": "overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
    "w-elips-": createComplexHandler(
        "overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
        "w-elips",
        "-webkit-line-clamp"
    )
}
export default typography;
export type {
    typography
}