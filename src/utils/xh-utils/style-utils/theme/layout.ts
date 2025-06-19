interface layout {
    [key: string]: string | Function;
}

// 创建通用的CSS属性处理函数
const createPropertyHandler = (property: string, prefix: string, defaultUnit: string = 'rpx') => {
    return (value: string) => {
        const _value = value.replace(`${prefix}-`, "");
        if (_value.includes("px") || _value.includes("%") || _value.includes("rpx")) {
            return `${property}: ${_value};`;
        }
        return `${property}: ${_value}${defaultUnit};`;
    };
};

const layout: layout = {
    /** 定位相关 */
    // 定位
    "static": "position: static;",
    "relative": "position: relative;",
    "absolute": "position: absolute;",
    "fixed": "position: fixed;",
    "sticky": "position: sticky;",
    // 层级
    "z-": (value: string) => {
        value = value.replace("z-", "")
        return `z-index: ${value};`
    },
    // 偏移
    "top-": createPropertyHandler("top", "top"),
    "right-": createPropertyHandler("right", "right"),
    "bottom-": createPropertyHandler("bottom", "bottom"),
    "left-": createPropertyHandler("left", "left"),
    /** 弹性布局相关 */
    // 横向flex布局
    "hflex": "display: flex; flex-direction: row;",
    "hflex-hleft": "justify-content: flex-start;",
    "hflex-hcenter": "justify-content: center;",
    "hflex-hright": "justify-content: flex-end;",
    "hflex-hbetween": "justify-content: space-between;",
    "hflex-haround": "justify-content: space-around;",
    "hflex-hevenly": "justify-content: space-evenly;",
    "hflex-vtop": "align-items: flex-start;",
    "hflex-vcenter": "align-items: center;",
    "hflex-vbottom": "align-items: flex-end;",
    "hflex-vstretch": "align-items: stretch;",
    "hflex-vbaseline": "align-items: baseline;",
    "hflex-hvcenter": "justify-content: center; align-items: center;",
    // 纵向flex布局
    "vflex": "display: flex; flex-direction: column;",
    "vflex-hleft": "align-items: flex-start;",
    "vflex-hcenter": "align-items: center;",
    "vflex-hright": "align-items: flex-end;",
    "vflex-hbetween": "align-items: space-between;",
    "vflex-haround": "align-items: space-around;",
    "vflex-hevenly": "align-items: space-evenly;",
    "vflex-vtop": "justify-content: flex-start;",
    "vflex-vcenter": "justify-content: center;",
    "vflex-vbottom": "justify-content: flex-end;",
    "vflex-vstretch": "justify-content: stretch;",
    "vflex-vbaseline": "justify-content: baseline;",
    "vflex-hvcenter": "justify-content: center; align-items: center;",
    // flex杂项
    "flex-1": "flex: 1;",
    "flex-2": "flex: 2;",
    "flex-3": "flex: 3;",
    "flex-4": "flex: 4;",
    "flex-5": "flex: 5;",
    "flex-wrap": "flex-wrap: wrap;",
    "flex-nowrap": "flex-wrap: nowrap;",
    // 间距
    "gap-": createPropertyHandler("gap", "gap"),
    /**  */
    // 溢出处理
    "overflow-hidden": "overflow: hidden;",
    "overflow-scroll": "overflow: scroll;",
    "overflow-auto": "overflow: auto;",
    "overflow-x-hidden": "overflow-x: hidden;",
    "overflow-x-scroll": "overflow-x: scroll;",
    "overflow-x-auto": "overflow-x: auto;",
    "overflow-y-hidden": "overflow-y: hidden;",
    "overflow-y-scroll": "overflow-y: scroll;",
    "overflow-y-auto": "overflow-y: auto;",
    // 滚动条
    "scrollbar": "scrollbar-width: thin;",
    "scrollbar-none": "scrollbar-width: none;",
    "scrollbar-thin": "scrollbar-width: thin;",
    "scrollbar-thick": "scrollbar-width: thick;",
    "scrollbar-auto": "scrollbar-width: auto;",
    "scrollbar-hidden": "scrollbar-width: none; -ms-overflow-style: none;",
}

export default layout;
export type {
    layout
}