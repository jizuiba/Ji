# JI 主题使用指南

本指南将帮助您充分利用 JI 主题的各种功能和特性。

## 📋 目录

- [快速开始](#快速开始)
- [内容创建](#内容创建)
- [功能配置](#功能配置)
- [自定义样式](#自定义样式)
- [高级功能](#高级功能)
- [最佳实践](#最佳实践)
- [故障排除](#故障排除)

## 🚀 快速开始

### 1. 安装主题

```bash
# 克隆主题
git clone https://github.com/jizuiba/JI.git themes/JI

# 复制配置
cp themes/JI/exampleSite/config.toml ./config.toml
```

### 2. 基础配置

编辑 `config.toml`：

```toml
baseURL = "https://yourdomain.com"
languageCode = "zh-cn"
title = "我的博客"
theme = "JI"

[params]
  title = "我的博客"
  description = "我的个人博客"
  author = "您的名字"
  darkMode = true
  search = true
  syntaxHighlighting = true
```

### 3. 创建内容

```bash
# 创建第一篇文章
hugo new posts/我的第一篇文章.md

# 创建关于页面
hugo new about.md
```

### 4. 运行站点

```bash
hugo server -D
```

## 📝 内容创建

### 文章结构

```markdown
---
title: "文章标题"
date: 2024-01-15T10:00:00Z
draft: false
author: "作者名字"
categories: ["分类1", "分类2"]
tags: ["标签1", "标签2"]
featured_image: "/images/featured.jpg"
description: "文章摘要"
---

# 文章内容

这里是您的文章内容...
```

### 代码块使用

````markdown
```javascript
function hello() {
  console.log("Hello, World!");
}
```
````

### 图片使用

```markdown
![图片描述](/images/image.jpg)
```

### 链接使用

```markdown
[链接文本](https://example.com)
[内部链接](/posts/another-post/)
```

## ⚙️ 功能配置

### 搜索功能

```toml
[params]
  search = true
```

### 代码高亮

```toml
[params]
  syntaxHighlighting = true

[markup.highlight]
  style = "github"
  lineNos = false
  codeFences = true
  guessSyntax = true

[params.code]
  enable = true
  showLineNumbers = true
  showCopyButton = true
  showLanguageLabel = true
```

### 目录功能

```toml
[params.toc]
  enabled = true
  startLevel = 2
  endLevel = 4
  ordered = false
```

### 分页功能

```toml
[pagination]
  pagerSize = 8
  path = "page"
```

## 🎨 自定义样式

### 颜色主题

```toml
[params.colors]
  primary = "#2563eb"
  primaryHover = "#1d4ed8"
  secondary = "#64748b"
  accent = "#f59e0b"
  
  # 浅色主题
  bg = "#ffffff"
  text = "#1e293b"
  
  # 深色主题
  bgDark = "#0f172a"
  textDark = "#f1f5f9"
```

### 字体配置

```toml
[params.fonts]
  base = "system-ui, sans-serif"
  heading = "system-ui, sans-serif"
  mono = "JetBrains Mono, monospace"
```

### 自定义 CSS

```toml
[params]
  customCSS = ["/css/custom.css"]
```

创建 `static/css/custom.css`：

```css
/* 自定义样式 */
.custom-class {
  color: var(--color-primary);
  font-size: 1.2rem;
}
```

## 🔧 高级功能

### 分析工具

#### Google Analytics

```toml
[params.analytics]
  google = "GA_MEASUREMENT_ID"
```

#### Plausible Analytics

```toml
[params.analytics]
  plausible = "yourdomain.com"
```

### 评论系统

#### Disqus

```toml
[params.comments]
  disqus = "your-disqus-shortname"
```

#### Utterances

```toml
[params.comments]
  utterances = { repo = "username/repo", issueTerm = "pathname" }
```

### 社交链接

```toml
[[menu.social]]
  name = "GitHub"
  url = "https://github.com/yourusername"
  pre = "<svg>...</svg>"

[[menu.social]]
  name = "微博"
  url = "https://weibo.com/yourusername"
```

### 导航菜单

```toml
[[menu.main]]
  name = "首页"
  url = "/"
  weight = 1

[[menu.main]]
  name = "文章"
  url = "/posts"
  weight = 2

[[menu.main]]
  name = "分类"
  url = "/categories"
  weight = 3

[[menu.main]]
  name = "标签"
  url = "/tags"
  weight = 4
```

## 📱 响应式设计

### 移动端优化

主题自动适配移动端，但您可以通过自定义 CSS 进一步优化：

```css
@media (max-width: 768px) {
  .custom-element {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
}
```

### 图片响应式

```markdown
![响应式图片](/images/image.jpg)
```

主题会自动处理图片的响应式显示。

## ♿ 无障碍功能

### 键盘导航

- 使用 `Tab` 键在可交互元素间导航
- 使用 `Enter` 或 `Space` 键激活按钮
- 使用 `Esc` 键关闭模态框

### 屏幕阅读器

主题已优化屏幕阅读器支持：

- 完整的 ARIA 标签
- 语义化 HTML 结构
- 适当的标题层次

### 高对比度

主题支持高对比度模式，确保文字清晰可读。

## 🚀 性能优化

### 图片优化

```markdown
<!-- 使用适当的图片格式 -->
![图片](/images/image.webp)

<!-- 添加 alt 属性 -->
![描述性文字](/images/image.jpg)
```

### 代码块优化

```markdown
```javascript
// 保持代码简洁
function example() {
  return "Hello, World!";
}
```
```

### 内容优化

- 使用适当的标题层次
- 保持段落长度适中
- 使用列表和引用块提高可读性

## 📊 SEO 优化

### 元数据配置

```toml
[params]
  title = "站点标题"
  description = "站点描述"
  author = "作者名字"
```

### 文章元数据

```markdown
---
title: "文章标题"
description: "文章描述"
author: "作者名字"
date: 2024-01-15T10:00:00Z
categories: ["分类"]
tags: ["标签1", "标签2"]
---
```

### 结构化数据

主题自动生成结构化数据，无需额外配置。

## 🔍 搜索功能

### 搜索配置

```toml
[params]
  search = true
```

### 搜索索引

主题会自动生成搜索索引，支持：

- 全文搜索
- 中文搜索
- 搜索结果高亮
- 键盘快捷键

## 📄 分页功能

### 分页配置

```toml
[pagination]
  pagerSize = 8
  path = "page"
```

### 分页样式

分页器会自动显示在文章列表页面底部。

## 🎯 最佳实践

### 内容组织

1. **分类系统**：使用清晰的分类体系
2. **标签管理**：合理使用标签
3. **文件命名**：使用有意义的文件名
4. **目录结构**：保持清晰的目录结构

### 性能优化

1. **图片优化**：使用适当的图片格式和大小
2. **代码简洁**：保持代码块简洁
3. **内容质量**：提供高质量的内容
4. **定期更新**：保持内容的更新

### 用户体验

1. **导航清晰**：提供清晰的导航结构
2. **搜索友好**：使用描述性的标题和内容
3. **移动优先**：确保移动端体验良好
4. **加载速度**：优化页面加载速度

## 🐛 故障排除

### 常见问题

#### 主题不显示

1. 检查 `theme = "JI"` 配置
2. 确认主题目录存在
3. 检查 Hugo 版本（需要 Extended 版本）

#### 搜索不工作

1. 确保 `search = true` 在配置中
2. 检查搜索索引是否正确生成
3. 确认 JavaScript 文件正确加载

#### 代码高亮不显示

1. 确保 `syntaxHighlighting = true` 在 `[params]` 中
2. 检查 `[markup.highlight]` 配置
3. 确认代码块语法正确

#### 深色模式不切换

1. 确保 `darkMode = true` 在 `[params]` 中
2. 检查浏览器控制台是否有错误
3. 确认 JavaScript 文件正确加载

### 调试技巧

1. **检查控制台**：查看浏览器控制台错误
2. **验证配置**：使用 `hugo --verbose` 检查配置
3. **测试功能**：逐个测试各项功能
4. **查看日志**：检查 Hugo 构建日志

### 获取帮助

- 查看 [完整文档](README.md)
- 查看 [配置指南](CONFIG.md)
- 查看 [安装指南](INSTALL.md)
- 提交 [GitHub Issue](https://github.com/jizuiba/JI/issues)

## 📚 进阶主题

### 自定义布局

如需自定义布局，可以：

1. 复制主题布局文件到站点
2. 修改布局文件
3. 重新构建站点

### 插件集成

主题支持多种插件：

- 分析工具
- 评论系统
- 搜索功能
- 社交分享

### 多语言支持

```toml
[languages]
  [languages.zh]
    languageName = "中文"
    weight = 1
    contentDir = "content"
  
  [languages.en]
    languageName = "English"
    weight = 2
    contentDir = "content/en"
```

---

**祝您使用 JI 主题愉快！** 🚀

如有任何问题，请随时在 [GitHub Issues](https://github.com/jizuiba/JI/issues) 中提问。
