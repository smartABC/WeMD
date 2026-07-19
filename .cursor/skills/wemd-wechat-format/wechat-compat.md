# 微信公众号粘贴兼容要点

来源：`apps/web/src/services/wechat*.ts`。

## 必知限制

| 问题                               | 微信行为             | CLI 处理                            |
| ---------------------------------- | -------------------- | ----------------------------------- |
| CSS `var()`                        | 被清洗               | expandCSSVariables 后内联           |
| `<input type="checkbox">`          | 被过滤               | 转为 ✅ / ⬜                        |
| `counter(...decimal-leading-zero)` | juice 会变成残缺文本 | 物化为真实序号 01/02…               |
| 复杂 KaTeX                         | 样式丢失             | 需在线版 renderHighRiskMathAsImages |
| Mermaid 代码块                     | 不渲染               | 需在线版 renderMermaidBlocks        |
| 宽表格                             | 横向溢出             | 需在线版 tableWrap                  |

## CLI 与在线版能力对照

| 能力                  | CLI | edit.wemd.app |
| --------------------- | --- | ------------- |
| Markdown → HTML       | ✅  | ✅            |
| 主题 CSS 内联 (juice) | ✅  | ✅            |
| CSS 变量展开          | ✅  | ✅            |
| Checkbox → emoji      | ✅  | ✅            |
| Mermaid → SVG         | ❌  | ✅            |
| 公式 → 图片           | ❌  | ✅            |
| 写入系统剪贴板        | ❌  | ✅            |

## 何时必须走在线版

- 文章含 ` ```mermaid `
- 含复杂 LaTeX（如 `\boldsymbol`）
- 用户要求与预览像素级一致
