# 示例

## 渲染命令

```bash
pnpm format:wechat -- \
  -i .cursor/skills/wemd-wechat-format/fixtures/sample.md \
  -t modern-editorial \
  -o /tmp/sample-wechat.html
```

## 输入（sample.md 摘要）

```markdown
# 示例标题

这是一段**加粗**文字与 `inline code`。

- [x] 已完成
- [ ] 待办

| 列 A | 列 B |
| ---- | ---- |
| 1    | 2    |
```

## 预期输出

- HTML 文件含 `#wemd` 包裹的内容
- 样式已 juice 内联到各元素
- checkbox 已变为 ✅ / ⬜ emoji

## 粘贴

1. 浏览器打开输出 HTML
2. 全选复制
3. 微信公众号后台编辑器 `Ctrl+V`
