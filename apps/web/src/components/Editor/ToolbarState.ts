// 发布偏好开关状态（全局，供预览与复制服务使用）
export const LINK_TO_FOOTNOTE_EVENT = "wemd-link-to-footnote-change";
export const TABLE_WRAP_EVENT = "wemd-table-wrap-change";
let linkToFootnoteEnabled = false;
let tableWrapEnabled = false;

export function getLinkToFootnoteEnabled() {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("wemd-link-to-footnote");
    if (saved === "true" || saved === "false") {
      linkToFootnoteEnabled = saved === "true";
    }
  }
  return linkToFootnoteEnabled;
}

export function setLinkToFootnoteEnabled(enabled: boolean) {
  linkToFootnoteEnabled = enabled;
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<boolean>(LINK_TO_FOOTNOTE_EVENT, { detail: enabled }),
    );
  }
}

export function getTableWrapEnabled() {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("wemd-table-wrap");
    if (saved === "true" || saved === "false") {
      tableWrapEnabled = saved === "true";
    }
  }
  return tableWrapEnabled;
}

export function setTableWrapEnabled(enabled: boolean) {
  tableWrapEnabled = enabled;
  if (typeof window !== "undefined") {
    localStorage.setItem("wemd-table-wrap", String(enabled));
    window.dispatchEvent(
      new CustomEvent<boolean>(TABLE_WRAP_EVENT, { detail: enabled }),
    );
  }
}
