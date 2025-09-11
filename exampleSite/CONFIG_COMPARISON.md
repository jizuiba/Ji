# 配置对比指南

本文档帮助您了解 JI 主题的不同配置选项，并选择最适合您需求的配置。

## 📋 配置文件概览

JI 主题提供了多个配置文件示例：

- `config.toml` - 完整配置示例
- `config.minimal.toml` - 最小配置示例

## 🔍 配置对比

### 完整配置 vs 最小配置

| 功能 | 完整配置 | 最小配置 | 说明 |
|------|----------|----------|------|
| 基础站点信息 | ✅ | ✅ | 必需配置 |
| 主题功能开关 | ✅ | ✅ | 必需配置 |
| 导航菜单 | ✅ | ✅ | 必需配置 |
| 语法高亮 | ✅ | ✅ | 必需配置 |
| 颜色自定义 | ✅ | ❌ | 可选配置 |
| 字体配置 | ✅ | ❌ | 可选配置 |
| 社交链接 | ✅ | ❌ | 可选配置 |
| 分析工具 | ✅ | ❌ | 可选配置 |
| 评论系统 | ✅ | ❌ | 可选配置 |
| 自定义资源 | ✅ | ❌ | 可选配置 |
| 多语言支持 | ✅ | ❌ | 可选配置 |

## 🚀 选择指南

### 最小配置适合：

- 🎯 **快速开始**：想要快速搭建博客
- 🎨 **简单需求**：不需要复杂自定义
- 📱 **学习目的**：了解 Hugo 和主题基础
- ⚡ **性能优先**：追求最小化配置

### 完整配置适合：

- 🎨 **高度定制**：需要丰富的自定义选项
- 🌐 **多语言**：需要多语言支持
- 📊 **数据分析**：需要集成分析工具
- 💬 **社区功能**：需要评论系统
- 🔧 **开发需求**：需要自定义 CSS/JS

## 📝 配置示例

### 最小配置示例

```toml
# 基本站点信息
baseURL = "https://example.com"
languageCode = "zh-cn"
title = "我的博客"
theme = "JI"

# 基本参数
[params]
  title = "我的博客"
  description = "我的个人博客"
  author = "您的名字"
  darkMode = true
  search = true
  syntaxHighlighting = true

# 导航菜单
[[menu.main]]
  name = "首页"
  url = "/"
  weight = 1

[[menu.main]]
  name = "文章"
  url = "/posts"
  weight = 2

# 语法高亮
[markup.highlight]
  style = "github"
  lineNos = false
  codeFences = true
  guessSyntax = true

# 输出格式
[outputs]
  home = ["HTML", "RSS"]
  page = ["HTML"]
```

### 完整配置示例

```toml
# 基本站点信息
baseURL = "https://example.com"
languageCode = "zh-cn"
title = "我的博客"
theme = "JI"

# 站点参数配置
[params]
  # 基本信息
  title = "我的博客"
  description = "我的个人博客"
  author = "您的名字"
  darkMode = true
  search = true
  syntaxHighlighting = true
  
  # 颜色自定义
  [params.colors]
    primary = "#2563eb"
    primaryHover = "#1d4ed8"
    secondary = "#64748b"
    accent = "#f59e0b"
  
  # 字体配置
  [params.fonts]
    base = "system-ui, sans-serif"
    heading = "system-ui, sans-serif"
    mono = "JetBrains Mono, monospace"
  
  # 分析工具
  [params.analytics]
    google = "GA_MEASUREMENT_ID"
  
  # 评论系统
  [params.comments]
    disqus = "your-disqus-shortname"

# 导航菜单
[[menu.main]]
  name = "首页"
  url = "/"
  weight = 1

[[menu.main]]
  name = "文章"
  url = "/posts"
  weight = 2

# 社交链接
[[menu.social]]
  name = "GitHub"
  url = "https://github.com/yourusername"

# 语法高亮
[markup.highlight]
  style = "github"
  lineNos = false
  codeFences = true
  guessSyntax = true

# 输出格式
[outputs]
  home = ["HTML", "RSS", "JSON"]
  page = ["HTML"]
  section = ["HTML", "RSS"]
  taxonomy = ["HTML", "RSS"]
```

## 🔧 配置迁移

### 从最小配置升级到完整配置

1. **备份当前配置**
   ```bash
   cp config.toml config.toml.backup
   ```

2. **复制完整配置**
   ```bash
   cp themes/JI/exampleSite/config.toml ./config.toml
   ```

3. **自定义配置**
   - 修改站点信息
   - 调整颜色和字体
   - 配置分析工具
   - 设置评论系统

### 从完整配置简化到最小配置

1. **备份当前配置**
   ```bash
   cp config.toml config.toml.backup
   ```

2. **复制最小配置**
   ```bash
   cp themes/JI/exampleSite/config.minimal.toml ./config.toml
   ```

3. **添加必要配置**
   - 修改站点信息
   - 调整导航菜单
   - 配置基本功能

## 📚 配置参考

### 必需配置

```toml
# 这些配置是必需的
baseURL = "https://example.com"
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

### 可选配置

```toml
# 这些配置是可选的，根据需要添加
[params.colors]
  primary = "#2563eb"
  # ... 更多颜色配置

[params.fonts]
  base = "system-ui, sans-serif"
  # ... 更多字体配置

[params.analytics]
  google = "GA_MEASUREMENT_ID"
  # ... 更多分析配置

[params.comments]
  disqus = "your-disqus-shortname"
  # ... 更多评论配置
```

## 🎯 最佳实践

### 配置管理

1. **版本控制**：将配置文件纳入版本控制
2. **环境分离**：为不同环境使用不同配置
3. **配置验证**：定期验证配置的正确性
4. **文档记录**：记录自定义配置的用途

### 性能优化

1. **最小化配置**：只启用需要的功能
2. **资源优化**：合理配置静态资源
3. **缓存策略**：配置适当的缓存策略
4. **压缩设置**：启用资源压缩

### 安全考虑

1. **敏感信息**：不要在配置中存储敏感信息
2. **访问控制**：合理配置访问权限
3. **内容安全**：配置内容安全策略
4. **定期更新**：保持配置的更新

## 🆘 故障排除

### 常见问题

1. **配置不生效**
   - 检查配置文件语法
   - 确认配置位置正确
   - 重启 Hugo 服务器

2. **功能不工作**
   - 检查功能开关设置
   - 确认依赖配置完整
   - 查看错误日志

3. **样式问题**
   - 检查颜色配置
   - 确认字体配置
   - 验证 CSS 加载

### 获取帮助

- 查看 [完整文档](README.md)
- 查看 [配置指南](CONFIG.md)
- 提交 [GitHub Issue](https://github.com/jizuiba/JI/issues)

---

**选择合适的配置，让您的博客更加出色！** 🚀