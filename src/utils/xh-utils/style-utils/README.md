# 样式解析器 (Style Parser)

一个强大的样式解析工具，支持主题切换、缓存优化和多种样式处理策略。

## 功能特性

- 🎨 **多主题支持** - 内置 light/dark 主题，支持自定义主题注册
- ⚡ **三级缓存系统** - 整体解析缓存、类字符串缓存、单个类缓存
- 🔧 **灵活的样式处理** - 支持直接 CSS、主题样式、颜色、边框、圆角等
- 📦 **模块化设计** - 清晰的代码结构，易于维护和扩展
- 🚀 **高性能** - 缓存机制确保样式解析的高效性能

## 安装使用

```typescript
import $c, { parser, themeRegistry, cacheSystem } from "./style-utils";
```

### 所有`themeRegistry.doSomething()`都可替换为`$c.doSomething()`

### `parser(`样式字符串`)`可替换为`$c(`样式字符串`)`

## 核心 API

### 样式解析器

#### `parser(...args: string[]): string`

主要的样式解析函数，支持多种样式输入格式。

```typescript
// 直接CSS样式
const css1 = parser("color: red; font-size: 14px;"); // 或$c(`样式字符串`)

// 主题样式类
const css2 = parser("bg-primary text-white rounded-md");

// 混合使用
const css3 = parser("bg-primary", "color: blue;", "border-light");
```

### 主题管理

#### `themeRegistry.registerTheme(name: string, themeConfig: themeObj): void`

注册新主题。

```typescript
// 注册自定义主题
themeRegistry.registerTheme("custom", {
  primary: "#007bff",
  secondary: "#6c757d",
  "bg-custom": "background: linear-gradient(45deg, #ff6b6b, #4ecdc4);",
});
```

#### `themeRegistry.setCurrentTheme(name: string): void`

切换当前主题。

```typescript
// 切换到暗色主题
themeRegistry.setCurrentTheme("dark");

// 切换到自定义主题
themeRegistry.setCurrentTheme("custom");
```

#### `themeRegistry.getCurrentTheme(): string`

获取当前主题名称。

```typescript
const currentTheme = themeRegistry.getCurrentTheme();
console.log(currentTheme); // 'light' | 'dark' | 'custom'
```

#### `themeRegistry.getAllThemes(): string[]`

获取所有已注册的主题列表。

```typescript
const themes = themeRegistry.getAllThemes();
console.log(themes); // ['light', 'dark', 'custom']
```

#### `themeRegistry.unregisterTheme(name: string): void`

注销主题（不能注销内置主题）。

```typescript
// 注销自定义主题
themeRegistry.unregisterTheme("custom");
```

### 缓存管理

#### `cacheSystem.clearAll(): void`

清空所有缓存。

```typescript
// 手动清空缓存
cacheSystem.clearAll();
```

> **注意**: 主题切换时会自动清空缓存。

## 支持的样式类型

### 1. 直接 CSS 样式

包含冒号的字符串会被识别为直接 CSS 样式。

```typescript
parser("color: red; font-size: 16px; margin: 10px;");
// 输出: "color: red;font-size: 16px;margin: 10px;"
```

### 2. 背景颜色样式

以 `bg-` 开头的样式类。

```typescript
parser("bg-primary bg-secondary");
// 根据当前主题输出对应的背景色CSS
```

### 3. 文字颜色样式

以 `text-` 开头的样式类（排除对齐、装饰和字号类）。

```typescript
parser("text-primary text-danger");
// 根据当前主题输出对应的文字颜色CSS
```

### 4. 边框样式

以 `border-` 开头且包含主题色的样式类。

```typescript
parser("border-light border-t-dark border-x-primary");
// 支持完整边框、单侧边框、轴向边框
```

### 5. 圆角样式

以 `rounded-` 开头且包含尺寸的样式类。

```typescript
parser("rounded-md rounded-t-lg rounded-tr-sm");
// 支持完整圆角、单侧圆角、角落圆角
```

### 6. 主题样式

在主题配置中定义的其他样式。

```typescript
// 主题中定义的样式会被直接应用或通过函数处理
parser("shadow-md p-4 m-2");
```

## 样式处理规则

样式解析器使用策略模式处理不同类型的样式：

1. **圆角样式** - `rounded-` + 尺寸标识符
2. **边框样式** - `border-` + 主题色标识符
3. **背景样式** - `bg-` + 颜色标识符（排除特殊属性）
4. **文字样式** - `text-` + 颜色标识符（排除特殊属性）
5. **默认处理** - 主题中定义的其他样式

## 缓存机制

### 三级缓存结构

1. **整体解析缓存** (`fullParseCache`)

   - 缓存完整参数组合的解析结果
   - 键格式: `${主题名}:${参数1|参数2|...}`

2. **类字符串缓存** (`classStringCache`)

   - 缓存单个类字符串的解析结果
   - 键格式: `${主题名}:${类字符串}`

3. **单个类缓存** (`singleClassCache`)
   - 缓存单个样式类的解析结果
   - 键格式: `${主题名}:${单个类名}`

### 缓存策略

- **优先级检查**: 从高级缓存到低级缓存逐级检查
- **逐级缓存**: 解析结果会被缓存到对应级别
- **主题隔离**: 缓存键包含主题名称，确保不同主题间的缓存隔离
- **自动清理**: 主题切换时自动清空所有缓存

## 主题配置

### 内置主题

- **light**: 浅色主题
- **dark**: 深色主题

### 自定义主题

主题配置对象支持以下类型的值：

```typescript
interface themeObj {
  [key: string]: string | Function;
}
```

- **字符串值**: 直接的 CSS 值或完整的 CSS 规则
- **函数值**: 动态处理样式的函数

```typescript
// 示例主题配置
const customTheme = {
  // 直接CSS值
  primary: "#007bff",
  secondary: "#6c757d",

  // 完整CSS规则
  "bg-gradient": "background: linear-gradient(45deg, #ff6b6b, #4ecdc4);",

  // 处理函数
  "p-": (style: string) => {
    const size = style.replace("p-", "");
    return `padding: ${size}px;`;
  },
};
```

## 性能优化

1. **缓存机制**: 三级缓存确保重复样式解析的高效性
2. **策略模式**: 避免大量 if-else 判断，提高匹配效率
3. **函数拆分**: 模块化设计减少单个函数复杂度
4. **主题隔离**: 缓存键设计确保主题间不会相互影响

## 注意事项

1. **主题切换**: 切换主题会自动清空所有缓存
2. **内置主题**: 不能注销 `light` 和 `dark` 内置主题
3. **样式优先级**: 直接 CSS 样式优先级最高
4. **错误处理**: 无法解析的样式会在控制台输出警告
5. **缓存键**: 缓存键包含主题名称，确保主题间隔离

## 示例用法

```typescript
// 基础使用
const styles = parser("bg-primary text-white p-4 rounded-md");

// 混合样式
const mixedStyles = parser(
  "bg-primary",
  "color: #333;",
  "border-light",
  "margin: 10px;"
);

// 主题切换
themeRegistry.setCurrentTheme("dark");
const darkStyles = parser("bg-primary text-white"); // 使用暗色主题

// 自定义主题
themeRegistry.registerTheme("brand", {
  primary: "#ff6b6b",
  "bg-brand": "background: linear-gradient(45deg, #ff6b6b, #4ecdc4);",
});

themeRegistry.setCurrentTheme("brand");
const brandStyles = parser("bg-brand text-primary");
```

## 扩展开发

### 添加新的样式处理规则

在 `styleRules` 数组中添加新的规则：

```typescript
const newRule: StyleRule = {
  test: (style) => style.startsWith("custom-"),
  handler: (style, theme) => {
    // 自定义处理逻辑
    return `/* custom style: ${style} */`;
  },
};
```

### 创建新的样式处理器

```typescript
function parseCustomStyle(style: string, currentTheme: themeObj): string {
  // 实现自定义样式处理逻辑
  return "";
}
```

---

**版本**: 1.0.0  
**作者**: xh-utils 团队  
**许可**: MIT
