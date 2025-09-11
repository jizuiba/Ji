# JI 主题配置指南

## 📋 概述

JI 主题提供了丰富的配置选项，让您可以完全自定义博客的外观和功能。本指南将详细介绍所有可用的配置参数。

## 🚀 快速开始

1. 将 `exampleSite/config.example.toml` 复制到您的 Hugo 站点根目录
2. 重命名为 `config.toml`
3. 根据您的需求修改配置参数

## ⚙️ 基本配置

### 站点信息
```toml
baseURL = "https://example.com"
languageCode = "zh-cn"
title = "现代博客"
theme = "JI"
```

### 基本参数
```toml
[params]
  description = "一个现代、响应式的 Hugo 主题"
  author = "您的姓名"
  tagline = "一次一篇，构建未来"
```

## 🎨 主题设置

### 主题模式
```toml
[params]
  theme = "light"        # "light" 或 "dark"
  darkMode = true        # 启用深色模式切换
  fonts = "system"       # "system"、"serif" 或 "mono"
```

### 品牌设置
```toml
[params]
  logo = "/images/logo.png"
  favicon = "/favicon.ico"
  ogImage = "/images/og-image.jpg"
  themeColor = "#2563eb"
```

## 🌈 颜色自定义

### 浅色主题颜色
```toml
[params.colors]
  primary = "#2563eb"
  primaryHover = "#1d4ed8"
  secondary = "#64748b"
  accent = "#f59e0b"
  
  # 浅色主题颜色
  bg = "#ffffff"
  bgSecondary = "#f8fafc"
  text = "#1e293b"
  textSecondary = "#64748b"
  textMuted = "#94a3b8"
  border = "#e2e8f0"
  borderHover = "#cbd5e1"
```

### 深色主题颜色
```toml
[params.colors]
  # 深色主题颜色
  bgDark = "#0f172a"
  bgSecondaryDark = "#1e293b"
  textDark = "#f1f5f9"
  textSecondaryDark = "#cbd5e1"
  textMutedDark = "#64748b"
  borderDark = "#334155"
  borderHoverDark = "#475569"
```

## 🔤 字体设置

```toml
[params.fonts]
  base = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  heading = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  mono = "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace"
```

## 🏠 首页配置

### 横幅区域
```toml
[params.hero]
  title = "欢迎来到现代博客"
  subtitle = "一个美观、现代的 Hugo 主题"
  description = "以性能和可访问性为核心构建，具有深色模式、响应式设计和出色的排版。"
  backgroundImage = "/images/hero-bg.jpg"
  
  [[params.hero.buttons]]
    text = "开始使用"
    url = "/posts"
    style = "primary"
  
  [[params.hero.buttons]]
    text = "在 GitHub 上查看"
    url = "https://github.com/yourusername/modernblog"
    style = "secondary"
    external = true
```

### 文章区域
```toml
[params.featuredPosts]
  title = "精选文章"
  subtitle = "查看我们最受欢迎的内容"
  showAllLink = { text = "查看所有文章", url = "/posts" }

[params.recentPosts]
  title = "最新文章"              # 自定义标题
  subtitle = "了解我们的最新内容"  # 自定义副标题
  count = 9                      # 显示文章数量
  showAllLink = { text = "查看所有文章", url = "/posts" }
```

## 🔧 功能开关

```toml
[params]
  search = true                    # 启用搜索功能
  syntaxHighlighting = true        # 启用语法高亮
  showLineNumbers = true          # 显示行号
  shareButtons = true             # 启用社交分享按钮
  relatedPosts = true             # 显示相关文章
  pagination = true               # 启用分页
  serviceWorker = true            # 启用服务工作者
```

## 📧 邮件订阅

```toml
[params.newsletter]
  description = "订阅我们的邮件列表，获取最新更新和见解。"
  url = "https://example.com/newsletter"
  buttonText = "订阅"
```

## 📊 分析统计

```toml
[params.analytics]
  google = "GA_MEASUREMENT_ID"
  plausible = "yourdomain.com"
```

## 💬 评论系统

### Disqus
```toml
[params.comments]
  disqus = "your-disqus-shortname"
```

### Utterances
```toml
[params.comments.utterances]
  repo = "yourusername/your-repo"
  issueTerm = "pathname"
  theme = "github-light"
```

## 🔗 社交媒体

```toml
[params]
  twitterSite = "@yourusername"
  twitterCreator = "@yourusername"
```

## 📱 菜单配置

### 主导航菜单
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
  name = "关于"
  url = "/about"
  weight = 3
```

### 社交媒体菜单
```toml
[[menu.social]]
  name = "Twitter"
  url = "https://twitter.com/yourusername"
  weight = 1

[[menu.social]]
  name = "GitHub"
  url = "https://github.com/yourusername"
  weight = 2
```

### 页脚菜单
```toml
[[menu.footer]]
  name = "隐私政策"
  url = "/privacy"
  weight = 1

[[menu.footer]]
  name = "服务条款"
  url = "/terms"
  weight = 2
```

## 📝 标记配置

### 语法高亮
```toml
[markup.highlight]
  style = "github"
  lineNos = true
  lineNumbersInTable = false
  noClasses = false
  codeFences = true
  guessSyntax = true
  tabWidth = 2
  anchorLineNos = true
  lineAnchors = ""
  hl_Lines = ""
  hl_inline = false
```

## 🏗️ 构建配置

```toml
[build]
  writeStats = true

[outputs]
  home = ["HTML", "RSS", "JSON"]
  page = ["HTML"]
  section = ["HTML", "RSS"]
  taxonomy = ["HTML", "RSS"]
  taxonomyTerm = ["HTML"]
```

## 🌍 多语言配置

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

## 📄 分类配置

```toml
[taxonomies]
  category = "categories"
  tag = "tags"
  series = "series"
```

## 📄 分页配置

```toml
[pagination]
  path = "page"
  pagesPerSection = 10
```

## 🖼️ 图片处理

```toml
[imaging]
  resampleFilter = "Lanczos"
  quality = 75
  anchor = "Smart"
```

## 🔒 安全配置

```toml
[security]
  [security.exec]
    allow = ['^dart-sass-embedded$', '^go$', '^npx$', '^postcss$']
    osEnv = ['(?i)^(PATH|PATHEXT|APPDATA|TMP|TEMP|TERM)$']
  [security.funcs]
    getenv = ['^HUGO_']
  [security.http]
    methods = ['(?i)GET|POST|HEAD']
    urls = ['.*']
```

## 🚀 开发服务器

```toml
[server]
  [server.headers]
    [server.headers."/*"]
      X-Frame-Options = "DENY"
      X-Content-Type-Options = "nosniff"
      X-XSS-Protection = "1; mode=block"
      Referrer-Policy = "strict-origin-when-cross-origin"
      Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self'; object-src 'none'; child-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self';"
```

## 🎯 高级配置

### 自定义输出格式
```toml
[outputFormats]
  [outputFormats.AMP]
    mediaType = "text/html"
    baseName = "amp"
    isHTML = true
    permalinkable = true
```

### 自定义页面配置
```toml
[params.page]
  showToc = true
  showEditLink = true
  editLinkBase = "https://github.com/yourusername/your-repo/edit/main/content/"
  showLastmod = true
  showReadingTime = true
  showWordCount = true
```

### 自定义文章配置
```toml
[params.post]
  showAuthor = true
  showDate = true
  showCategories = true
  showTags = true
  showReadingTime = true
  showWordCount = true
  showLastmod = true
  showShareButtons = true
  showRelatedPosts = true
  showComments = true
```

### 自定义首页配置
```toml
[params.home]
  showHero = true
  showFeaturedPosts = true
  showRecentPosts = true
  showNewsletter = true
  showSocialLinks = true
  postsPerPage = 6
  featuredPostsCount = 3
  recentPostsCount = 6
```

### 自定义侧边栏配置
```toml
[params.sidebar]
  show = true
  position = "right"
  showCategories = true
  showTags = true
  showRecentPosts = true
  showArchives = true
  showSocialLinks = true
  recentPostsCount = 5
  categoriesCount = 10
  tagsCount = 20
```

### 自定义搜索配置
```toml
[params.search]
  enable = true
  placeholder = "搜索文章..."
  showResults = true
  maxResults = 10
  showSnippets = true
  showCategories = true
  showTags = true
  showDates = true
```

### 自定义代码高亮配置
```toml
[params.code]
  enable = true
  showLineNumbers = true
  showCopyButton = true
  showLanguageLabel = true
  theme = "github"
  maxHeight = "400px"
  wrapLongLines = true
```

### 自定义图片配置
```toml
[params.image]
  lazy = true
  placeholder = true
  webp = true
  avif = true
  quality = 80
  maxWidth = 1200
  maxHeight = 800
```

### 自定义性能配置
```toml
[params.performance]
  minifyCSS = true
  minifyJS = true
  minifyHTML = true
  compressImages = true
  enableServiceWorker = true
  enablePreload = true
  enablePrefetch = true
```

### 自定义SEO配置
```toml
[params.seo]
  enable = true
  showMetaTags = true
  showOpenGraph = true
  showTwitterCard = true
  showSchema = true
  showCanonical = true
  showAlternate = true
  robots = "index, follow"
  googleSiteVerification = "your-verification-code"
  bingSiteVerification = "your-verification-code"
```

### 自定义RSS配置
```toml
[params.rss]
  enable = true
  showFullContent = true
  showSummary = true
  maxItems = 20
  showCategories = true
  showTags = true
  showAuthor = true
  showDate = true
```

### 自定义404页面配置
```toml
[params.error404]
  title = "页面未找到"
  description = "抱歉，您访问的页面不存在。"
  showSearch = true
  showRecentPosts = true
  showCategories = true
  showTags = true
  recentPostsCount = 5
  categoriesCount = 10
  tagsCount = 20
```

### 自定义维护页面配置
```toml
[params.maintenance]
  enable = false
  title = "网站维护中"
  description = "我们正在对网站进行维护，请稍后再试。"
  estimatedTime = "预计维护时间：2小时"
  contactEmail = "admin@example.com"
  showSocialLinks = true
```

## 📚 配置示例

### 最小配置
```toml
baseURL = "https://example.com"
languageCode = "zh-cn"
title = "我的博客"
theme = "JI"

[params]
  description = "我的个人博客"
  author = "我的姓名"
  darkMode = true
  search = true
  syntaxHighlighting = true
```

### 完整配置
请参考 `exampleSite/config.example.toml` 文件，其中包含了所有可用的配置选项。

## 🔧 故障排除

### 常见问题

1. **主题不生效**
   - 确保 `theme = "JI"` 在配置文件中
   - 检查主题是否正确安装在 `themes/` 目录中

2. **搜索功能不工作**
   - 确保 `search = true` 在 `[params]` 中
   - 检查搜索索引是否正确生成

3. **语法高亮不显示**
   - 确保 `syntaxHighlighting = true` 在 `[params]` 中
   - 检查 `[markup.highlight]` 配置

4. **深色模式不切换**
   - 确保 `darkMode = true` 在 `[params]` 中
   - 检查 JavaScript 是否正确加载

### 调试技巧

1. 使用 `hugo server -D` 启动开发服务器
2. 检查浏览器控制台是否有错误
3. 使用 `hugo --verbose` 查看构建日志
4. 检查 `public/` 目录中的生成文件

## 📖 更多资源

- [Hugo 官方文档](https://gohugo.io/documentation/)
- [Hugo 配置参考](https://gohugo.io/getting-started/configuration/)
- [主题 GitHub 仓库](https://github.com/jizuiba/JI)
- [主题文档](https://github.com/jizuiba/JI/wiki)

## 🤝 贡献

如果您发现配置问题或有改进建议，请：

1. 在 GitHub 上创建 Issue
2. 提交 Pull Request
3. 参与讨论

---

**注意**: 本配置指南基于 JI 主题 v1.0.0。不同版本可能有不同的配置选项，请参考相应版本的文档。
