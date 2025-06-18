// 样式工具库主入口文件

// 导入主题模块
import layout from './theme/layout';
import boxModel from './theme/box-model';
import typography from './theme/typography';
import visual from './theme/visual';
import { lightTheme, darkTheme } from './theme/theme-base';

// 导入解析器和主题注册器
import { parser, themeRegistry, theme } from './parser';

// 导入样式工具
import { getColor, getSize, getThemeStr } from './utils'

// 导入类型定义
import type { layout as LayoutType } from './theme/layout';
import type { boxModel as BoxModelType } from './theme/box-model';
import type { typography as TypographyType } from './theme/typography';
import type { visual as VisualType } from './theme/visual';
import type { themeObj as ThemeObjType } from './theme/theme-base';
import type { ThemeType, ThemeMap, ThemeRegistry } from './parser';

const { screenHeight, screenWidth, statusBarHeight } = uni.getWindowInfo()
function px2rpx(px: number) {
  return px * 750 / screenWidth
}
function rpx2px(rpx: number) {
  return rpx * screenWidth / 750
}
const tabh = px2rpx(50)
const sbh = px2rpx(statusBarHeight)
const fullh = px2rpx(screenHeight)
const sxh = fullh - sbh

// const $c = (...args: string[]) => parser(...args)
function $c(...args: string[]) {
  return parser(...args)
}
$c.themeRegistry = themeRegistry;
$c.getAllThemes = themeRegistry.getAllThemes;
$c.getAllThemesObj = themeRegistry.getAllThemesObj
$c.getCurrentTheme = themeRegistry.getCurrentTheme;
$c.getCurrentThemeObj = themeRegistry.getCurrentThemeObj;
$c.getTheme = themeRegistry.getTheme;
$c.registerTheme = themeRegistry.registerTheme;
$c.setCurrentTheme = themeRegistry.setCurrentTheme;
$c.unregisterTheme = themeRegistry.unregisterTheme;
$c.getColor = getColor;
$c.getSize = getSize;
$c.getThemeStr = getThemeStr;
$c.px2rpx = px2rpx;
$c.rpx2px = rpx2px;
$c.tabh = tabh;
$c.sbh = sbh;
$c.fullh = fullh;
$c.sxh = sxh;


// 导出所有主题模块
export {
  // 主题模块
  layout,
  boxModel,
  typography,
  visual,
  lightTheme,
  darkTheme,

  // 解析器和主题管理
  parser,
  themeRegistry,
  theme,

  // 样式工具
  getColor,
  getSize,
  getThemeStr
};

// 导出所有类型
export type {
  LayoutType,
  BoxModelType,
  TypographyType,
  VisualType,
  ThemeObjType,
  ThemeType,
  ThemeMap,
  ThemeRegistry
};

/**
 * 样式工具集模块
 * @module $c
 * @description 提供样式解析和主题管理的工具集，包括主题注册、颜色获取、尺寸转换等功能
 * @property {Function} themeRegistry - 主题注册器
 * @property {Function} getAllThemes - 获取所有已注册主题
 * @property {Function} getAllThemesObj - 获取所有已注册主题对象
 * @property {Function} getCurrentTheme - 获取当前主题名称
 * @property {Function} getCurrentThemeObj - 获取当前主题对象
 * @property {Function} getTheme - 获取指定主题
 * @property {Function} registerTheme - 注册新主题
 * @property {Function} setCurrentTheme - 设置当前主题
 * @property {Function} unregisterTheme - 注销主题
 * @property {Function} getColor - 获取主题颜色
 * @property {Function} getSize - 获取主题尺寸
 * @property {Function} getThemeStr - 获取主题字符串
 * @property {Function} px2rpx - px转rpx
 * @property {Function} rpx2px - rpx转px
 * @property {number} tabh - 底部标签栏高度
 * @property {number} sbh - 状态栏高度
 * @property {number} fullh - 屏幕完整高度
 * @property {number} sxh - 除状态栏外的屏幕高度
 */
export default $c;