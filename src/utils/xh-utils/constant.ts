interface constantObj {
    [key: string]: any
}
const constant: constantObj = {
    "NOW_THEME": "__now_theme__",
} as const;

export default constant;
export type {
    constantObj
}