---
name: wemd-wechat-format
description: >-
  Renders Markdown into WeChat Official Account compatible HTML using WeMD
  (@wemd/core) themes and paste rules. Use when the user mentions 公众号排版,
  WeMD, 微信 Markdown, 复制到公众号, 一键排版, or wants styled WeChat article
  output from Markdown files.
disable-model-invocation: true
---

# WeMD 微信公众号排版

将 Markdown 转为微信公众号可粘贴的 HTML。渲染引擎复用 `@wemd/core`，兼容规则对齐 `apps/web/src/services/wechatCopyService.ts`。

## 前置条件

- 在 WeMD monorepo 根目录执行（需已 `pnpm install`，含 `apps/web` 的 Vite）。
- 脚本通过 Vite SSR 加载 `@wemd/core` 源码，无需单独 `tsc` 构建 core。

## 工作流

```
排版进度：
- [ ] Step 1: 确认 Markdown 输入（文件路径或对话内容）
- [ ] Step 2: 选择主题（见 themes.md，默认 modern-editorial）
- [ ] Step 3: 检查微信兼容项（见 wechat-compat.md）
- [ ] Step 4: 运行 render-wechat.mjs
- [ ] Step 5: 交付 HTML 并说明粘贴步骤
```

### Step 1: 确认输入

- 优先使用用户指定的 `.md` 文件。
- 若内容仅在对话中：先写入临时文件（如 `article.md`），再渲染。
- 确认文件编码为 UTF-8。

### Step 2: 选择主题

按内容类型从 [themes.md](themes.md) 选择 `--theme` 值。用户未指定时：

| 内容类型  | 默认 theme id      |
| --------- | ------------------ |
| 通用长文  | `modern-editorial` |
| 教程/手册 | `clear-guide`      |
| 学术/技术 | `academic-paper`   |
| 数据报告  | `data-blueprint`   |

### Step 3: 检查兼容项

渲染前对照 [wechat-compat.md](wechat-compat.md)：

- 含 ` ```mermaid ` → 提示用 [edit.wemd.app](https://edit.wemd.app) 做最终复制。
- 含大量 `$...$` / `$$...$$` → 提示复杂公式建议在线版复制。
- 含 `- [ ]` / `- [x]` → 脚本自动转 emoji。

### Step 4: 运行渲染脚本

在仓库根目录执行：

```bash
pnpm format:wechat -- \
  --input path/to/article.md \
  --theme modern-editorial \
  --output path/to/article-wechat.html
```

| 参数              | 说明              | 默认                  |
| ----------------- | ----------------- | --------------------- |
| `--input` / `-i`  | Markdown 文件路径 | 必填                  |
| `--output` / `-o` | 输出 HTML 路径    | `{input}-wechat.html` |
| `--theme` / `-t`  | 内置主题 id       | `modern-editorial`    |
| `--list-themes`   | 列出可用主题      | —                     |

### Step 5: 交付

1. 输出 HTML 文件路径。
2. 粘贴说明：浏览器打开 HTML → 全选复制 → 公众号后台 `Ctrl+V`。
3. 含 Mermaid/复杂公式时，引导至 [edit.wemd.app](https://edit.wemd.app) 使用「复制到公众号」。

## 写作规范（Agent 代写 Markdown 时）

- 标题层级从 `#` 开始，不跳级。
- 图片使用 `![alt](url)`，URL 需公网可访问。
- 表格使用 GFM 语法。
- 代码块标注语言。
- 避免依赖 `:hover`、复杂 CSS 动画。

## 降级路径

文章含 Mermaid、复杂公式、Mac 代码栏装饰时：CLI 产出基础 HTML，最终复制请用 [edit.wemd.app](https://edit.wemd.app)。

## 附加资源

- [themes.md](themes.md) — 主题列表
- [wechat-compat.md](wechat-compat.md) — 微信粘贴限制
- [examples.md](examples.md) — 示例
- [scripts/render-wechat.mjs](scripts/render-wechat.mjs) — 渲染脚本
