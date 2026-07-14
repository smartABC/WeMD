import { describe, expect, it } from "vitest";
import { createMarkdownParser, processHtml } from "@wemd/core";

const markdown =
  "## 本章摘要 {.chapter-title #chapter-summary}\n\n这是一段摘要。 {.summary data-kind=abstract}";
const css = `
  #wemd .chapter-title { color: rgb(20, 80, 140); }
  #wemd .summary[data-kind="abstract"] { background-color: rgb(245, 240, 220); }
`;

describe("Markdown 属性消费链路", () => {
  it("在右侧预览 HTML 中保留合法属性", () => {
    const parser = createMarkdownParser({ mathRenderer: "katex" });
    const html = processHtml(parser.render(markdown), css, false);

    expect(html).toContain(
      '<h2 data-tool="WeMD编辑器" class="chapter-title" id="chapter-summary">',
    );
    expect(html).toContain(
      '<p data-tool="WeMD编辑器" class="summary" data-kind="abstract">这是一段摘要。</p>',
    );
  });

  it("在主题实时预览 HTML 中根据合法属性内联样式", () => {
    const parser = createMarkdownParser({ mathRenderer: "katex" });
    const html = processHtml(parser.render(markdown), css, true);
    const container = document.createElement("div");
    container.innerHTML = html;

    expect(
      container.querySelector<HTMLElement>("#chapter-summary")?.style.color,
    ).toBe("rgb(20, 80, 140)");
    expect(
      container.querySelector<HTMLElement>('[data-kind="abstract"]')?.style
        .backgroundColor,
    ).toBe("rgb(245, 240, 220)");
  });
});
