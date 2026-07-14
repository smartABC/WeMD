import { describe, expect, it } from "vitest";
import {
  clearGuideTheme,
  dataBlueprintTheme,
  easternNotesTheme,
  whitespaceGalleryTheme,
} from "../themes";

const themes = {
  dataBlueprintTheme,
  easternNotesTheme,
  clearGuideTheme,
  whitespaceGalleryTheme,
};

const requiredSelectors = [
  "#wemd h1",
  "#wemd h2",
  "#wemd h3",
  "#wemd .multiquote-1",
  "#wemd ul",
  "#wemd ol",
  "#wemd figure",
  "#wemd figcaption",
  "#wemd pre",
  "#wemd table",
  "#wemd .callout",
  "#wemd .footnotes-sep",
  "#wemd .block-equation",
  "#wemd .block-equation > svg",
  "#wemd pre.mermaid",
  "#wemd .task-list-item",
];

describe("scenario themes", () => {
  it("完整覆盖公众号文章的主要内容元素", () => {
    for (const [name, css] of Object.entries(themes)) {
      for (const selector of requiredSelectors) {
        expect(css, `${name} 缺少 ${selector}`).toContain(selector);
      }
    }
  });

  it("保持透明根背景并避开模板化视觉效果", () => {
    for (const [name, css] of Object.entries(themes)) {
      expect(css, name).toMatch(
        /#wemd\s*\{[\s\S]*?background(?:-color)?:\s*transparent;/,
      );
      expect(css, name).not.toMatch(/background-clip:\s*text/i);
      expect(css, name).not.toMatch(/backdrop-filter/i);
      expect(css, name).not.toMatch(/border-left:\s*[2-9]\d*px/i);
    }
  });

  it("四款主题具有不同的核心视觉锚点", () => {
    expect(dataBlueprintTheme).toContain("#173f7a");
    expect(easternNotesTheme).toContain("#a33a2b");
    expect(clearGuideTheme).toContain("#087f75");
    expect(whitespaceGalleryTheme).toContain("#2b2927");
  });
});
