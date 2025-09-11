# JI 主题安装指南

本指南将帮助您安装和设置 JI Hugo 主题。

## 📋 环境要求

- [Hugo Extended](https://gohugo.io/installation/) (v0.100.0 或更高版本)
- Git
- 文本编辑器

**注意**：本主题不需要 Node.js 或任何构建工具。Hugo 处理一切！

## 🚀 安装方法

### 方法一：Git Clone（推荐）

1. 导航到您的 Hugo 站点根目录：
   ```bash
   cd your-hugo-site
   ```

2. 将主题克隆到 `themes` 目录：
   ```bash
   git clone https://github.com/jizuiba/JI.git themes/JI
   ```

3. 复制示例配置：
   ```bash
   cp themes/JI/exampleSite/config.toml ./config.toml
   ```

### 方法二：Git Submodule

1. 导航到您的 Hugo 站点根目录：
   ```bash
   cd your-hugo-site
   ```

2. 将主题添加为子模块：
   ```bash
   git submodule add https://github.com/jizuiba/JI.git themes/JI
   ```

3. 复制示例配置：
   ```bash
   cp themes/JI/exampleSite/config.toml ./config.toml
   ```

### 方法三：下载 ZIP

1. 从 [GitHub](https://github.com/jizuiba/JI/archive/main.zip) 下载主题
2. 将 ZIP 文件解压到 `themes/JI/`
3. 复制示例配置：
   ```bash
   cp themes/JI/exampleSite/config.toml ./config.toml
   ```

## ⚙️ 配置

### 基础设置

1. 编辑您的 `config.toml` 文件：
   ```toml
   baseURL = "https://yourdomain.com"
   languageCode = "zh-cn"
   title = "您的站点标题"
   theme = "JI"
   ```

2. 自定义主题参数：
   ```toml
   [params]
     title = "您的博客标题"
     description = "您的博客描述"
     author = "您的名字"
     darkMode = true
     search = true
     syntaxHighlighting = true
   ```

### 内容结构

创建以下目录结构：

```
your-hugo-site/
├── content/
│   ├── posts/          # 博客文章
│   ├── about.md        # 关于页面
│   └── _index.md       # 首页内容
├── static/
│   └── images/         # 图片资源
├── config.toml         # 站点配置
└── themes/
    └── JI/            # 主题文件
```

### 创建您的第一篇文章

```bash
hugo new posts/我的第一篇文章.md
```

编辑文章内容：

```markdown
---
title: "我的第一篇文章"
date: 2024-01-01T00:00:00Z
draft: false
author: "您的名字"
categories: ["技术"]
tags: ["hugo", "博客"]
featured_image: "/images/post-image.jpg"
description: "文章摘要"
---

您的文章内容在这里...
```

## 🏃‍♂️ 运行站点

### 开发服务器

```bash
hugo server -D
```

访问 `http://localhost:1313` 查看您的站点。

### 生产构建

```bash
hugo --minify
```

构建的站点将在 `public/` 目录中。

## 🎨 自定义

### 颜色配置

在您的 `config.toml` 中自定义主题颜色：

```toml
[params.colors]
  primary = "#2563eb"
  primaryHover = "#1d4ed8"
  secondary = "#64748b"
  accent = "#f59e0b"
  
  # 浅色主题配色
  bg = "#ffffff"
  text = "#1e293b"
  
  # 深色主题配色
  bgDark = "#0f172a"
  textDark = "#f1f5f9"
```

### 字体配置

更改字体：

```toml
[params.fonts]
  base = "思源黑体, system-ui, sans-serif"
  heading = "思源宋体, serif"
  mono = "JetBrains Mono, monospace"
```

### 导航配置

配置导航菜单：

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

添加社交链接：

```toml
[[menu.social]]
  name = "GitHub"
  url = "https://github.com/yourusername"

[[menu.social]]
  name = "微博"
  url = "https://weibo.com/yourusername"
```

## 🚀 部署

### Netlify

1. 将您的仓库连接到 Netlify
2. 设置构建命令：`hugo --minify`
3. 设置发布目录：`public`
4. 部署！

### Vercel

1. 将您的仓库连接到 Vercel
2. 设置构建命令：`hugo --minify`
3. 设置输出目录：`public`
4. 部署！

### GitHub Pages

1. 在您的仓库设置中启用 GitHub Pages
2. 使用 GitHub Actions 构建和部署：

```yaml
name: Deploy to GitHub Pages

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

### Vercel（零配置！）

1. 将您的代码推送到 GitHub
2. 在 Vercel 中导入您的仓库
3. Vercel 自动检测 Hugo 并配置构建
4. 部署！无需额外配置。

**无需 Node.js、构建工具或复杂设置！**

## 🔧 故障排除

### 常见问题

1. **找不到主题**：确保主题在 `themes/JI/` 目录中
2. **构建错误**：检查您的 Hugo 版本（需要 Extended 版本）
3. **图片缺失**：确保图片在 `static/images/` 目录中
4. **CSS 不加载**：检查主题是否正确安装
5. **搜索不工作**：确保在配置中启用了 `search = true`
6. **代码高亮不显示**：确保启用了 `syntaxHighlighting = true`

### 获取帮助

- 查看 [完整文档](README.md)
- 查看 [配置指南](CONFIG.md)
- 在 GitHub 上 [提交问题](https://github.com/jizuiba/JI/issues)
- 参与 [社区讨论](https://github.com/jizuiba/JI/discussions)

## 📚 下一步

- 阅读 [完整文档](README.md)
- 探索 [示例站点](exampleSite/)
- 查看 [配置指南](CONFIG.md)
- 根据需要自定义主题
- 开始创建内容！

## 🎯 快速开始检查清单

- [ ] 安装 Hugo Extended (v0.100.0+)
- [ ] 克隆或下载 JI 主题
- [ ] 复制示例配置
- [ ] 编辑 `config.toml` 文件
- [ ] 创建第一篇文章
- [ ] 运行 `hugo server -D`
- [ ] 访问 `http://localhost:1313`
- [ ] 自定义主题设置
- [ ] 部署到生产环境

---

**祝您使用 JI 主题愉快！** 🚀

如有任何问题，请随时在 [GitHub Issues](https://github.com/jizuiba/JI/issues) 中提问。