# Ji Theme

自己用用的 Hugo 主题。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Hugo](https://img.shields.io/badge/Hugo-0.149.1+-blue.svg)](https://gohugo.io/)

## 🚀 快速开始

### 1. 安装主题

使用 Git 子模块安装：

```bash
git submodule add https://github.com/jizuiba/Ji.git themes/Ji
```

### 2. 基本配置

在您的 `hugo.toml` 中添加：

```toml
baseURL = "https://example.com"
languageCode = "zh-cn"
title = "我的博客"
theme = "Ji"

[params]
  author = "您的名字"
  description = "我的个人博客"
  darkMode = true
  search = true
  syntaxHighlighting = true

# 输出格式配置（搜索功能必需）
[outputs]
  home = ["HTML", "RSS", "JSON"]
  page = ["HTML"]
  section = ["HTML", "RSS"]
  taxonomy = ["HTML", "RSS"]
```

### 3. 启动开发服务器

```bash
hugo server -D
```

访问 `http://localhost:1313` 查看您的站点。

## 🔍 搜索功能配置

### 启用搜索功能

1. **配置文件设置**：
```toml
[params]
  search = true

[outputs]
  home = ["HTML", "RSS", "JSON"]
```

2. **创建搜索页面**：
```bash
# 快速创建
mkdir -p content/search
cat > content/search/_index.md << 'EOF'
---
title: "搜索"
layout: "search"
type: "search"
---
EOF
```

或手动创建 `content/search/_index.md`：
```markdown
---
title: "搜索"
layout: "search"
type: "search"
---
```

3. **重新构建站点**：
```bash
hugo --cleanDestinationDir
```

## 📝 内容管理

### 创建文章

```bash
# 创建新文章
hugo new posts/我的第一篇文章.md

# 创建关于页面
hugo new about.md

# 创建分类页面
hugo new categories/技术.md
```

### 文章前置参数

```markdown
---
title: "文章标题"
subtitle: "副标题"
author: "作者"
date: 2025-01-01
draft: false
tags: ["标签1", "标签2"]
categories: ["分类1"]
featured_image: "/images/featured.jpg"
featured_image_caption: "图片描述"
summary: "文章摘要"
---
```

## 🎨 自定义配置

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

[[menu.social]]
  name = "Twitter"
  url = "https://twitter.com/yourusername"
```

### 分页配置

```toml
[pagination]
  pagerSize = 8
  path = "page"
```

### 语法高亮

```toml
[markup.highlight]
  style = "github"
  lineNos = false
  codeFences = true
  guessSyntax = true
```

## 🔧 高级配置

### 完整配置示例

```toml
# 基本站点信息
baseURL = "https://example.com"
languageCode = "zh-cn"
title = "我的博客"
theme = "Ji"

# 站点参数
[params]
  author = "您的名字"
  description = "我的个人博客"
  dateFormat = "2006年1月2日"
  
  # 功能开关
  darkMode = true
  search = true
  pagination = true
  syntaxHighlighting = true
  showLineNumbers = false

# 分页配置
[pagination]
  pagerSize = 8
  path = "page"

# 输出格式
[outputs]
  home = ["HTML", "RSS", "JSON"]
  page = ["HTML"]
  section = ["HTML", "RSS"]
  taxonomy = ["HTML", "RSS"]

# Markup 配置
[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
  
  [markup.tableOfContents]
    startLevel = 2
    endLevel = 4
    ordered = false
  
  [markup.highlight]
    style = "github"
    lineNos = false
    codeFences = true
    guessSyntax = true
```

## 📁 项目结构

```
themes/Ji/
├── assets/          # 静态资源
│   ├── css/        # 样式文件
│   └── js/         # JavaScript文件
├── layouts/         # 模板文件
│   ├── _default/   # 默认模板
│   ├── partials/   # 部分模板
│   └── ...
├── static/          # 静态文件
└── README.md        # 说明文档
```

## 🔄 更新主题

```bash
cd themes/Ji
git pull origin main
```

## 📄 许可证

本项目采用 [MIT License](https://opensource.org/licenses/MIT) 许可证。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📞 支持

如果您在使用过程中遇到问题，请：

1. 查看本文档的常见问题部分
2. 搜索已有的 [Issues](https://github.com/jizuiba/Ji/issues)
3. 创建新的 Issue 描述您的问题

---

**注意：本主题仅供学习使用，非专业 Hugo 主题。**
