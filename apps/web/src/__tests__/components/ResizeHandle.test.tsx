import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResizeHandle } from "../../components/Workspace/ResizeHandle";

describe("编辑器与预览分隔条", () => {
  it("支持键盘微调和双击恢复默认宽度", () => {
    const onRatioChange = vi.fn();
    const onReset = vi.fn();
    render(
      <ResizeHandle
        ratio={0.6}
        onRatioChange={onRatioChange}
        onPointerPosition={vi.fn()}
        onReset={onReset}
      />,
    );

    const separator = screen.getByRole("separator", {
      name: "调整编辑器与预览宽度",
    });
    fireEvent.keyDown(separator, { key: "ArrowLeft" });
    fireEvent.keyDown(separator, { key: "ArrowRight", shiftKey: true });
    fireEvent.doubleClick(separator);

    expect(onRatioChange).toHaveBeenNthCalledWith(1, 0.58);
    expect(onRatioChange).toHaveBeenNthCalledWith(2, 0.7);
    expect(onReset).toHaveBeenCalledOnce();
  });
});
