interface constantObj {
    [key: string]: any
}
const time_constant: constantObj = {
    SECOND: 1000,
    "SECOND_1": 1000,
    "SECOND_5": 5000,
    "SECOND_10": 10000,
    "SECOND_15": 15000,
    "SECOND_30": 30000,
    "MINUTE": 60000,
    "MINUTE_1": 60000,
    "MINUTE_5": 300000,
    "MINUTE_10": 600000,
    "MINUTE_15": 900000,
    "MINUTE_30": 1800000,
    "HOUR": 3600000,
    "HOUR_1": 3600000,
    "HOUR_5": 18000000,
    "HOUR_10": 36000000,
    "HOUR_15": 54000000,
    "DAY": 86400000,
    "DAY_1": 86400000,
    "DAY_5": 432000000,
    "DAY_10": 864000000,
    "DAY_15": 1296000000,
    "MONTH": 2592000000,
    "MONTH_1": 2592000000,
    "MONTH_5": 12460000000,
    "MONTH_10": 25920000000,
    "YEAR": 31536000000,
    "YEAR_1": 31536000000,
    "YEAR_5": 157760000000,
    "YEAR_10": 315360000000,
    "YEAR_100": 3153600000000,
}
const constant: constantObj = {
    "NOW_THEME": "__now_theme__",
    ...time_constant
} as const;

export default constant;
export type {
    constantObj
}