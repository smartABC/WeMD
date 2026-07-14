import { describe, expect, it, vi } from "vitest";
import {
  createEditorPreviewScrollSync,
  type ScrollSyncAdapter,
  type ScrollSyncPosition,
} from "../../components/Workspace/editorPreviewScrollSync";

const createFrameQueue = () => {
  const queue: FrameRequestCallback[] = [];
  return {
    request: (callback: FrameRequestCallback) => {
      queue.push(callback);
      return queue.length;
    },
    cancel: vi.fn(),
    flush: () => {
      const callbacks = queue.splice(0);
      callbacks.forEach((callback) => callback(0));
    },
  };
};

const createAdapter = (position: ScrollSyncPosition) => {
  let scrollListener = () => undefined;
  let layoutListener = () => undefined;
  const adapter: ScrollSyncAdapter = {
    getPosition: vi.fn(() => position),
    scrollToPosition: vi.fn(),
    subscribeScroll: vi.fn((listener) => {
      scrollListener = listener;
      return () => undefined;
    }),
    subscribeLayoutChange: vi.fn((listener) => {
      layoutListener = listener;
      return () => undefined;
    }),
  };
  return {
    adapter,
    emitScroll: () => scrollListener(),
    emitLayoutChange: () => layoutListener(),
  };
};

describe("编辑器与预览双向滚动协调", () => {
  it("在下一动画帧把主动侧源行同步到另一侧", () => {
    const frames = createFrameQueue();
    const editor = createAdapter({ sourceLine: 12, ratio: 0.4 });
    const preview = createAdapter({ sourceLine: 2, ratio: 0.1 });
    const coordinator = createEditorPreviewScrollSync(frames);
    coordinator.setAdapter("editor", editor.adapter);
    coordinator.setAdapter("preview", preview.adapter);

    editor.emitScroll();
    frames.flush();

    expect(preview.adapter.scrollToPosition).toHaveBeenCalledWith({
      sourceLine: 12,
      ratio: 0.4,
    });
    coordinator.destroy();
  });

  it("忽略程序化滚动产生的反向事件，并在布局变化后恢复当前锚点", () => {
    const frames = createFrameQueue();
    const editor = createAdapter({ sourceLine: 18, ratio: 0.6 });
    const preview = createAdapter({ sourceLine: 4, ratio: 0.2 });
    const coordinator = createEditorPreviewScrollSync(frames);
    coordinator.setAdapter("editor", editor.adapter);
    coordinator.setAdapter("preview", preview.adapter);

    editor.emitScroll();
    frames.flush();
    preview.emitScroll();
    frames.flush();
    expect(editor.adapter.scrollToPosition).not.toHaveBeenCalled();

    preview.emitLayoutChange();
    frames.flush();
    expect(preview.adapter.scrollToPosition).toHaveBeenLastCalledWith({
      sourceLine: 18,
      ratio: 0.6,
    });
    coordinator.destroy();
  });
});
