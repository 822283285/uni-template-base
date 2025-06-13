import $store from './storage'
import { parser, themeRegistry, getColor } from './style-utils/index'
// import { $nav, route as $route } from './nav'
const $c = (...args: string[]) => parser(...args)
$c.getColor = getColor
$c.themeRegistry = themeRegistry
$c.getColor = getColor
export {
    $store,
    $c,
    // $nav,
    // $route,

    themeRegistry,
    getColor,
    parser
}