# JI Hugo 主题

[![Hugo](https://img.shields.io/badge/Hugo-0.100.0+-blue.svg)](https://gohugo.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/jizuiba/JI.svg?style=social&label=Star)](https://github.com/jizuiba/JI)

一款为性能、可访问性和精美设计打造的现代响应式 Hugo 主题。支持深色模式，拥有卓越的排版系统和简洁纯粹的美学风格。

## ✨ 功能特性

### 🎨 设计特性
- **现代设计**：简洁界面与精美排版
- **深色模式**：自动检测与手动切换
- **响应式布局**：完美适配各类设备
- **自定义主题**：丰富的颜色和字体配置

### ⚡ 性能特性
- **极致性能**：极简 JavaScript 实现
- **快速加载**：优化的资源加载策略
- **SEO 优化**：完备的元数据支持
- **PWA 支持**：Service Worker 和离线功能

### 🔧 功能特性
- **全文搜索**：即时结果呈现
- **代码高亮**：支持语法高亮与复制功能
- **目录导航**：自动生成文章目录
- **分页功能**：优雅的文章分页
- **社交分享**：内置分享按钮

### ♿ 无障碍特性
- **WCAG 2.1 AA 合规**：符合无障碍标准
- **完善的 ARIA 标签**：屏幕阅读器友好
- **键盘导航支持**：完整的键盘操作
- **高对比度**：确保文字清晰可读

## 🚀 快速入门

### 环境要求

- Hugo Extended (v0.100.0+)
- Git（用于版本控制）

### 1. 安装主题

```bash
# 克隆主题仓库
git clone https://github.com/jizuiba/JI.git themes/JI

# 或添加为子模块
git submodule add https://github.com/jizuiba/JI.git themes/JI
```

### 2. 配置站点

复制示例配置到站点根目录：

```bash
cp themes/JI/exampleSite/config.toml ./config.toml
```

### 3. 创建内容

```bash
# 新建文章
hugo new posts/我的第一篇文章.md

# 创建关于页面
hugo new about.md
```

### 4. 运行 Hugo

```bash
hugo server -D
```

访问 `http://localhost:1313` 查看您的站点！

## 📁 目录结构

```
JI/
├── assets/                 # 资源文件
│   ├── css/                # 样式文件
│   │   ├── main.css        # 主样式
│   │   ├── search.css      # 搜索样式
│   │   └── syntax.css      # 代码高亮样式
│   └── js/                 # 脚本文件
│       ├── main.js         # 主脚本
│       ├── search.js       # 搜索功能
│       ├── code-highlight.js # 代码高亮
│       ├── dynamic-header.js # 动态头部
│       └── toc.js          # 目录功能
├── layouts/                # 模板文件
│   ├── _default/           # 默认模板
│   ├── partials/           # 可复用组件
│   ├── categories/         # 分类页面
│   ├── posts/              # 文章页面
│   ├── tags/               # 标签页面
│   └── search/             # 搜索页面
├── exampleSite/            # 示例配置
│   ├── config.toml         # 完整配置示例
│   ├── config.minimal.toml # 最小配置示例
│   └── content/            # 示例内容
├── static/                 # 静态资源
├── theme.toml              # 主题元数据
├── README.md               # 说明文档
├── CONFIG.md               # 配置指南
├── INSTALL.md              # 安装指南
└── LICENSE                 # 开源协议
```

## ⚙️ 配置指南

### 基础配置

```toml
# 基本站点信息
baseURL = 'https://example.com/'
languageCode = 'zh-cn'
title = '我的博客'
theme = "JI"

[params]
  # 基本信息
  title = "我的博客"
  description = "使用 Hugo 构建的现代博客"
  author = "您的名字"
  
  # 主题功能
  darkMode = true              # 启用深色模式
  search = true                # 启用搜索功能
  syntaxHighlighting = true    # 启用语法高亮
  showLineNumbers = true       # 显示行号
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

## 📝 内容类型

### 文章模板

在 `content/posts/` 目录创建文章：

```markdown
---
title: "我的第一篇文章"
date: 2024-01-01T00:00:00Z
draft: false
categories: ["技术"]
tags: ["hugo", "博客"]
featured_image: "/images/文章配图.jpg"
description: "文章摘要"
---

这里是您的文章内容...
```

### 代码块示例

````markdown
```javascript
function hello() {
  console.log("Hello, World!");
}
```
````

## 🎨 高级定制

### 自定义样式

```toml
[params]
  customCSS = ["/css/custom.css"]
```

### 自定义字体

```toml
[params.fonts]
  base = "思源黑体, sans-serif"
  heading = "思源宋体, serif"
  mono = "JetBrains Mono, monospace"
```

### 颜色主题

```toml
[params.colors]
  primary = "#2563eb"       # 主色调
  primaryHover = "#1d4ed8"  # 悬停色
  accent = "#f59e0b"       # 强调色
  
  # 浅色主题配色
  bg = "#ffffff"           # 背景色
  text = "#1e293b"         # 正文颜色
  
  # 深色主题配色
  bgDark = "#0f172a"       # 深色背景
  textDark = "#f1f5f9"     # 深色文字
```

## 🔧 进阶功能

### 搜索功能

启用内置搜索：

```toml
[params]
  search = true
```

### 数据分析

#### 谷歌分析

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
  disqus = "您的站点ID"
```

#### Utterances

```toml
[params.comments]
  utterances = { repo = "username/repo", issueTerm = "pathname" }
```

### 代码高亮配置

```toml
[markup.highlight]
  style = "github"           # 高亮主题
  lineNos = false            # 显示行号（由主题控制）
  codeFences = true          # 启用代码围栏
  guessSyntax = true         # 自动检测语法

[params.code]
  enable = true              # 启用自定义代码功能
  showLineNumbers = true     # 显示行号
  showCopyButton = true      # 显示复制按钮
  showLanguageLabel = true   # 显示语言标签
  theme = "github"           # 代码主题
  maxHeight = "400px"        # 代码块最大高度
```

## 🚀 性能优化

### 内置优化

- **极简 JavaScript**：最小化脚本文件
- **CSS 自定义属性**：高效的样式系统
- **图片懒加载**：按需加载图片资源
- **资源压缩**：自动压缩 CSS 和 JS
- **Service Worker**：离线功能支持

### 部署优化

```bash
# 生产构建
hugo --minify

# 构建并生成搜索索引
hugo --minify --buildDrafts
```

## 🛠️ 开发指南

### 本地开发

```bash
# 开发模式
hugo server -D

# 构建站点
hugo --minify

# 检查链接
hugo --minify --gc
```

### 自定义开发

1. Fork 本仓库
2. 创建特性分支
3. 进行修改
4. 测试功能
5. 提交 Pull Request

## 📦 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. Vercel 会自动检测 Hugo 项目并配置构建
4. 部署完成！

**无需 Node.js 或任何额外配置！**

### Netlify 部署

1. 连接 GitHub 仓库
2. 设置构建命令：`hugo --minify`
3. 设置发布目录：`public`
4. 部署完成！

### GitHub Pages 部署

使用 GitHub Actions 自动部署：

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true
      - run: hugo --minify
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

## 🐛 故障排除

### 常见问题

1. **主题不显示**
   - 检查 `theme = "JI"` 配置
   - 确认主题目录存在

2. **搜索功能不工作**
   - 确保 `search = true` 在配置中
   - 检查搜索索引是否正确生成

3. **语法高亮不显示**
   - 确保 `syntaxHighlighting = true` 在 `[params]` 中
   - 检查 `[markup.highlight]` 配置

4. **深色模式不切换**
   - 确保 `darkMode = true` 在 `[params]` 中
   - 检查浏览器控制台是否有错误

### 获取帮助

- 查看 [配置指南](CONFIG.md)
- 查看 [安装指南](INSTALL.md)
- 提交 [GitHub Issue](https://github.com/jizuiba/JI/issues)
- 参与社区讨论

## 📄 许可证

MIT 许可证，详见 [LICENSE](LICENSE) 文件。

## 🤝 参与贡献

欢迎提交 Pull Request：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 👨‍💻 作者

**Jizuiba** - [GitHub](https://github.com/jizuiba)

## 🙏 致谢

感谢所有为 Hugo 社区做出贡献的开发者们！

---

**为 Hugo 社区倾心打造 ❤️**

[![GitHub stars](https://img.shields.io/github/stars/jizuiba/JI.svg?style=social&label=Star)](https://github.com/jizuiba/JI)
[![GitHub forks](https://img.shields.io/github/forks/jizuiba/JI.svg?style=social&label=Fork)](https://github.com/jizuiba/JI/fork)