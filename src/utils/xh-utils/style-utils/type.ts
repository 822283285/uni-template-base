// 样式工具库类型定义文件

// 基础样式处理函数类型
type StyleHandler = (value: string) => string;

// 样式值类型 - 可以是字符串或处理函数
type StyleValue = string | StyleHandler;

// 基础主题对象接口
interface BaseThemeObject {
  [key: string]: StyleValue;
}

// 布局相关类型
interface LayoutStyles extends BaseThemeObject {
  // 定位相关
  static: string;
  relative: string;
  absolute: string;
  fixed: string;
  sticky: string;
  
  // 偏移处理函数
  'top-': StyleHandler;
  'right-': StyleHandler;
  'bottom-': StyleHandler;
  'left-': StyleHandler;
  
  // Flex布局
  hflex: string;
  vflex: string;
  'flex-1': string;
  'flex-2': string;
  'flex-3': string;
  'flex-4': string;
  'flex-5': string;
  
  // 溢出处理
  'overflow-hidden': string;
  'overflow-scroll': string;
  'overflow-auto': string;
}

// 盒模型相关类型
interface BoxModelStyles extends BaseThemeObject {
  // 尺寸处理函数
  'w-': StyleHandler;
  'h-': StyleHandler;
  'min-w-': StyleHandler;
  'max-w-': StyleHandler;
  'min-h-': StyleHandler;
  'max-h-': StyleHandler;
  
  // 内外边距处理函数
  'p-': StyleHandler;
  'pt-': StyleHandler;
  'pb-': StyleHandler;
  'pl-': StyleHandler;
  'pr-': StyleHandler;
  'px-': StyleHandler;
  'py-': StyleHandler;
  
  'm-': StyleHandler;
  'mt-': StyleHandler;
  'mb-': StyleHandler;
  'ml-': StyleHandler;
  'mr-': StyleHandler;
  'mx-': StyleHandler;
  'my-': StyleHandler;
  
  // 边框和圆角处理函数
  'border-': StyleHandler;
  'rounded-': StyleHandler;
}

// 排版相关类型
interface TypographyStyles extends BaseThemeObject {
  // 字体处理函数
  'text-': StyleHandler;
  'font-': StyleHandler;
  
  // 文本对齐和装饰
  'text-align-': StyleHandler;
  'text-decoration-': StyleHandler;
  
  // 文本省略
  'w-elips': string;
  'w-elips-': StyleHandler;
}

// 视觉效果相关类型
interface VisualStyles extends BaseThemeObject {
  // 透明度和滤镜
  'opacity-': StyleHandler;
  'bg-filter-': StyleHandler;
  'filter-': StyleHandler;
  
  // 背景处理
  'bg-': StyleHandler;
  'text-': StyleHandler;
  
  // 背景位置
  'bg-center': string;
  'bg-top': string;
  'bg-bottom': string;
  'bg-left': string;
  'bg-right': string;
  
  // 背景重复
  'bg-norepeat': string;
  'bg-repeat': string;
  'bg-repeat-x': string;
  'bg-repeat-y': string;
  
  // 背景尺寸
  'bg-cover': string;
  'bg-contain': string;
  'bg-auto': string;
}

// 主题配置对象类型
interface ThemeConfig extends BaseThemeObject {
  // 主题色系
  primary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  error: string;
  
  // 文字色
  'text-base': string;
  'text-secondary': string;
  'text-disabled': string;
  'text-inverse': string;
  
  // 背景色
  'bg-base': string;
  'bg-light': string;
  'bg-card': string;
  'bg-mask': string;
  
  // 字体尺寸
  'text-xs': string;
  'text-sm': string;
  'text-md': string;
  'text-lg': string;
  'text-xl': string;
  'text-xxl': string;
  'text-2xl': string;
  
  // 圆角
  'rounded-xs': string;
  'rounded-sm': string;
  'rounded-md': string;
  'rounded-lg': string;
  'rounded-circle': string;
  
  // 边框
  border: string;
  'border-light': string;
  
  // 投影
  'shadow-sm': string;
  'shadow-md': string;
  'shadow-lg': string;
}

// 完整主题对象类型（合并所有样式模块）
type CompleteTheme = LayoutStyles & BoxModelStyles & TypographyStyles & VisualStyles & ThemeConfig;

// 主题类型
type ThemeType = string;

// 主题映射类型
type ThemeMap = {
  [key: string]: CompleteTheme;
};

// 主题注册器接口
interface ThemeRegistry {
  registerTheme(name: string, themeConfig: BaseThemeObject): void;
  unregisterTheme(name: string): void;
  getTheme(name: string): CompleteTheme | undefined;
  getAllThemes(): string[];
  setCurrentTheme(name: string): void;
  getCurrentTheme(): string;
}

// 样式解析器函数类型
type StyleParser = (...args: string[]) => string;

// CSS属性处理函数创建器类型
type PropertyHandlerCreator = (
  property: string,
  prefix: string,
  defaultUnit?: string,
  additionalUnits?: string[]
) => StyleHandler;

// 数值转换处理函数创建器类型
type NumericHandlerCreator = (
  property: string,
  prefix: string,
  transform?: (value: number) => number
) => StyleHandler;

// 滤镜处理函数创建器类型
type FilterHandlerCreator = (
  property: string,
  prefix: string,
  filterType?: string
) => StyleHandler;

// 静态属性映射创建器类型
type StaticPropertiesCreator = (
  propertyName: string,
  valueMap: Record<string, string>
) => Record<string, string>;

// 导出所有类型
export type {
  // 基础类型
  StyleHandler,
  StyleValue,
  BaseThemeObject,
  
  // 样式模块类型
  LayoutStyles,
  BoxModelStyles,
  TypographyStyles,
  VisualStyles,
  ThemeConfig,
  CompleteTheme,
  
  // 主题管理类型
  ThemeType,
  ThemeMap,
  ThemeRegistry,
  
  // 工具函数类型
  StyleParser,
  PropertyHandlerCreator,
  NumericHandlerCreator,
  FilterHandlerCreator,
  StaticPropertiesCreator
};