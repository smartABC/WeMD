export type ScrollSyncSource = "editor" | "preview";

export interface ScrollSyncPosition {
  sourceLine: number | null;
  ratio: number;
}

export interface ScrollSyncAdapter {
  getPosition: () => ScrollSyncPosition;
  scrollToPosition: (position: ScrollSyncPosition) => void;
  subscribeScroll: (listener: () => void) => () => void;
  subscribeLayoutChange?: (listener: () => void) => () => void;
}

interface FrameScheduler {
  request: (callback: FrameRequestCallback) => number;
  cancel: (handle: number) => void;
}

const browserFrameScheduler: FrameScheduler = {
  request: (callback) => window.requestAnimationFrame(callback),
  cancel: (handle) => window.cancelAnimationFrame(handle),
};

export const createEditorPreviewScrollSync = (
  frames: FrameScheduler = browserFrameScheduler,
) => {
  const adapters: Partial<Record<ScrollSyncSource, ScrollSyncAdapter>> = {};
  const cleanups: Partial<Record<ScrollSyncSource, () => void>> = {};
  const mutedSources = new Set<ScrollSyncSource>();
  let pendingFrame: number | null = null;
  let pendingSource: ScrollSyncSource | null = null;
  let lastPosition: ScrollSyncPosition | null = null;

  const opposite = (source: ScrollSyncSource): ScrollSyncSource =>
    source === "editor" ? "preview" : "editor";

  const muteDuringProgrammaticScroll = (source: ScrollSyncSource) => {
    mutedSources.add(source);
    frames.request(() => mutedSources.delete(source));
  };

  const syncFrom = (source: ScrollSyncSource) => {
    const sourceAdapter = adapters[source];
    const targetSource = opposite(source);
    const targetAdapter = adapters[targetSource];
    if (!sourceAdapter || !targetAdapter) return;

    const position = sourceAdapter.getPosition();
    lastPosition = position;
    muteDuringProgrammaticScroll(targetSource);
    targetAdapter.scrollToPosition(position);
  };

  const scheduleSync = (source: ScrollSyncSource) => {
    pendingSource = source;
    if (pendingFrame !== null) return;

    pendingFrame = frames.request(() => {
      pendingFrame = null;
      const sourceToSync = pendingSource;
      pendingSource = null;
      if (sourceToSync) syncFrom(sourceToSync);
    });
  };

  const restoreAfterLayoutChange = () => {
    if (!lastPosition || pendingFrame !== null) return;
    pendingFrame = frames.request(() => {
      pendingFrame = null;
      (["editor", "preview"] as const).forEach((source) => {
        const adapter = adapters[source];
        if (!adapter) return;
        muteDuringProgrammaticScroll(source);
        adapter.scrollToPosition(lastPosition!);
      });
    });
  };

  const setAdapter = (
    source: ScrollSyncSource,
    adapter: ScrollSyncAdapter | null,
  ) => {
    cleanups[source]?.();
    delete cleanups[source];
    delete adapters[source];
    if (!adapter) return;

    adapters[source] = adapter;
    const unsubscribeScroll = adapter.subscribeScroll(() => {
      if (mutedSources.has(source)) return;
      scheduleSync(source);
    });
    const unsubscribeLayout = adapter.subscribeLayoutChange?.(
      restoreAfterLayoutChange,
    );
    cleanups[source] = () => {
      unsubscribeScroll();
      unsubscribeLayout?.();
    };
  };

  const destroy = () => {
    cleanups.editor?.();
    cleanups.preview?.();
    if (pendingFrame !== null) frames.cancel(pendingFrame);
    pendingFrame = null;
    pendingSource = null;
  };

  return { setAdapter, destroy };
};
