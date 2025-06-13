interface visual {
    [key: string]: string | Function;
}

// 创建数值转换处理函数
const createNumericHandler = (property: string, prefix: string, transform?: (value: number) => number) => {
    return (value: string) => {
        const _value = Number(value.replace(`${prefix}-`, ""));
        const finalValue = transform ? transform(_value) : _value;
        return `${property}: ${finalValue};`;
    };
};

// 创建滤镜处理函数
const createFilterHandler = (property: string, prefix: string, filterType: string = 'blur') => {
    return (value: string) => {
        const _value = value.replace(`${prefix}-`, "");
        if (_value.includes("rpx") || _value.includes("px") || _value.includes("%")) {
            return `${property}: ${filterType}(${_value});`;
        }
        return `${property}: ${filterType}(${_value}rpx);`;
    };
};

// 创建静态属性映射
const createStaticProperties = (propertyName: string, valueMap: Record<string, string>) => {
    const result: Record<string, string> = {};
    Object.entries(valueMap).forEach(([key, value]) => {
        result[key] = `${propertyName}: ${value};`;
    });
    return result;
};

// 背景位置映射
const backgroundPositions = createStaticProperties('background-position', {
    'bg-center': 'center',
    'bg-top': 'top',
    'bg-bottom': 'bottom',
    'bg-left': 'left',
    'bg-right': 'right'
});

// 背景重复映射
const backgroundRepeats = createStaticProperties('background-repeat', {
    'bg-norepeat': 'no-repeat',
    'bg-repeat': 'repeat',
    'bg-repeat-x': 'repeat-x',
    'bg-repeat-y': 'repeat-y'
});

// 背景尺寸映射
const backgroundSizes = createStaticProperties('background-size', {
    'bg-cover': 'cover',
    'bg-contain': 'contain',
    'bg-auto': 'auto'
});

const visual: visual = {
    // 透明度处理（百分比转小数）
    "opacity-": createNumericHandler("opacity", "opacity", (value) => value / 100),
    // 滤镜处理
    "bg-filter-": createFilterHandler("backdrop-filter", "bg-filter"),
    "filter-": createFilterHandler("filter", "filter"),
    "bg-": (value: string) => {
        return `background: ${value.replace("bg-", "")};`
    },
    "text-": (value: string) => {
        if (value.includes("#") || value.includes("rgb")) {
            return `color: ${value.replace("text-", "")};`
        } else {
            if (value.includes("rpx") || value.includes("px") || value.includes("%")) {
                return `font-size: ${value.replace("text-", "")};`;
            } else {
                return `font-size: ${value.replace("text-", "")}rpx;`;
            }
        }
    },
    // 背景相关属性
    ...backgroundPositions,
    ...backgroundRepeats,
    ...backgroundSizes,
}

export default visual;
export type {
    visual
}