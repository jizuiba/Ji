# Ji Theme

一个简洁现代的 Hugo 主题，适合个人博客使用。

**注意：本主题仅供学习使用，非专业 Hugo 主题。**

## 特性

- 🎨 简洁现代的设计
- 🌙 深色模式支持
- 📱 响应式布局
- 🔍 内置搜索功能
- 📝 代码高亮
- ⚡ 快速加载

## 安装

1. 克隆主题到 themes 目录：
```bash
git clone https://github.com/jizuiba/Ji.git themes/Ji
```

2. 在 `config.toml` 中设置主题：
```toml
theme = "Ji"
```

## 基本配置

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
```

## 创建内容

```bash
# 创建文章
hugo new posts/我的第一篇文章.md

# 创建关于页面
hugo new about.md
```

## 运行

```bash
hugo server -D
```

访问 `http://localhost:1313` 查看您的站点。

## 自定义

主题支持以下自定义选项：

- 颜色主题
- 字体配置
- 导航菜单
- 社交链接

详细配置请参考 `exampleSite/config.toml` 示例。

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request。
