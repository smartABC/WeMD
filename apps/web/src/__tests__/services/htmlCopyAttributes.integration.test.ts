import { beforeEach, describe, expect, it, vi } from "vitest";

const mocked = vi.hoisted(() => ({
  electronClipboardWriteText: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  default: { success: vi.fn(), error: vi.fn() },
}));

import { copyAsHtml } from "../../services/htmlCopyService";

describe("复制 HTML 属性语法", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocked.electronClipboardWriteText.mockResolvedValue({ success: true });
    Object.defineProperty(window, "electron", {
      configurable: true,
      value: {
        isElectron: true,
        clipboard: { writeText: mocked.electronClipboardWriteText },
      },
    });
  });

  it("保留合法属性并排除危险属性", async () => {
    await copyAsHtml(
      '## 摘要 {.chapter #summary data-kind=heading onclick="alert(1)"}',
    );

    expect(mocked.electronClipboardWriteText).toHaveBeenCalledWith(
      '<h2 class="chapter" id="summary" data-kind="heading">摘要</h2>\n',
    );
  });
});
