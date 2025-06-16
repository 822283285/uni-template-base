import $store from './storage'
import { parser, themeRegistry, getColor } from './style-utils/index'
import $nav from './nav'
import $constant from './constant'
import $data from './data'
const $c = (...args: string[]) => parser(...args)
$c.getColor = getColor
$c.themeRegistry = themeRegistry
$c.getColor = getColor
export {
    $store,
    $c,
    $nav,
    $constant,
    $data,

    themeRegistry,
    getColor,
    parser
}
