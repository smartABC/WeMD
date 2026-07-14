export type PublishingPreferenceKey = "linkToFootnote" | "tableWrap";

type PreferenceListener = (enabled: boolean) => void;

const STORAGE_KEYS: Record<PublishingPreferenceKey, string> = {
  linkToFootnote: "wemd-link-to-footnote",
  tableWrap: "wemd-table-wrap",
};

const listeners: Record<PublishingPreferenceKey, Set<PreferenceListener>> = {
  linkToFootnote: new Set(),
  tableWrap: new Set(),
};

export function getPublishingPreference(
  preference: PublishingPreferenceKey,
): boolean {
  try {
    return (
      globalThis.localStorage?.getItem(STORAGE_KEYS[preference]) === "true"
    );
  } catch {
    return false;
  }
}

export function setPublishingPreference(
  preference: PublishingPreferenceKey,
  enabled: boolean,
): void {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEYS[preference], String(enabled));
  } catch {
    // 持久化不可用时仍通知当前页面订阅者。
  }
  listeners[preference].forEach((listener) => listener(enabled));
}

export function subscribePublishingPreference(
  preference: PublishingPreferenceKey,
  listener: PreferenceListener,
): () => void {
  listeners[preference].add(listener);
  return () => listeners[preference].delete(listener);
}
