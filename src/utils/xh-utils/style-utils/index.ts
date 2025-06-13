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
import { getColor } from './utils'

// 导入类型定义
import type { layout as LayoutType } from './theme/layout';
import type { boxModel as BoxModelType } from './theme/box-model';
import type { typography as TypographyType } from './theme/typography';
import type { visual as VisualType } from './theme/visual';
import type { themeObj as ThemeObjType } from './theme/theme-base';
import type { ThemeType, ThemeMap, ThemeRegistry } from './parser';

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

// 默认导出解析器
export default parser;