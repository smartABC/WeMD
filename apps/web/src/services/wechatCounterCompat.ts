type PseudoPosition = "before" | "after";

interface CounterPseudoRule {
  selector: string;
  pseudo: PseudoPosition;
}

const COUNTER_CONTENT_PATTERN = /content\s*:[^;{}]*\bcounters?\s*\(/i;
const PSEUDO_RULE_PATTERN = /([^{}]+?):{1,2}(before|after)\s*\{([^{}]*)\}/gi;
const COUNTER_NOOP_KEYWORDS = new Set([
  "none",
  "normal",
  "initial",
  "unset",
  "inherit",
  "revert",
  "revert-layer",
]);

const PSEUDO_STYLE_KEYS = [
  "color",
  "background",
  "background-color",
  "font-family",
  "font-size",
  "font-style",
  "font-weight",
  "line-height",
  "letter-spacing",
  "text-transform",
  "text-decoration",
  "white-space",
  "padding",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "min-width",
  "border",
  "border-radius",
  "display",
  "vertical-align",
] as const;

interface CssDeclarationMap {
  content?: string;
  "counter-increment"?: string;
  "counter-reset"?: string;
  styles: Record<string, string>;
}

interface CssCounterPseudoRule extends CounterPseudoRule {
  declarations: CssDeclarationMap;
}

interface CssElementCounterRule {
  selector: string;
  "counter-increment"?: string;
  "counter-reset"?: string;
}

const ELEMENT_RULE_PATTERN = /([^{}]+)\{([^{}]*)\}/gi;

const parseCssDeclarations = (body: string): CssDeclarationMap => {
  const declarations: CssDeclarationMap = { styles: {} };
  const parts = body.split(";");
  for (const part of parts) {
    const colon = part.indexOf(":");
    if (colon < 0) continue;
    const key = part.slice(0, colon).trim().toLowerCase();
    const value = part.slice(colon + 1).trim();
    if (!key || !value) continue;
    if (key === "content") {
      declarations.content = value;
      continue;
    }
    if (key === "counter-increment") {
      declarations["counter-increment"] = value;
      continue;
    }
    if (key === "counter-reset") {
      declarations["counter-reset"] = value;
      continue;
    }
    if ((PSEUDO_STYLE_KEYS as readonly string[]).includes(key)) {
      declarations.styles[key] = value;
    }
  }
  return declarations;
};

const extractCssCounterPseudoRules = (css: string): CssCounterPseudoRule[] => {
  if (!css) return [];
  const rules: CssCounterPseudoRule[] = [];
  const pattern = new RegExp(PSEUDO_RULE_PATTERN);
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(css)) !== null) {
    const selectorRaw = match[1]?.trim();
    const pseudoRaw = (match[2] || "").toLowerCase();
    const body = match[3] || "";
    if (!selectorRaw || !COUNTER_CONTENT_PATTERN.test(body)) continue;

    const pseudo: PseudoPosition = pseudoRaw === "after" ? "after" : "before";
    const declarations = parseCssDeclarations(body);
    selectorRaw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .forEach((selector) => {
        rules.push({ selector, pseudo, declarations });
      });
  }

  return rules;
};

const extractCssElementCounterRules = (
  css: string,
): CssElementCounterRule[] => {
  if (!css) return [];
  const rules: CssElementCounterRule[] = [];
  const pattern = new RegExp(ELEMENT_RULE_PATTERN);
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(css)) !== null) {
    const selectorRaw = (match[1] || "").trim();
    const body = match[2] || "";
    // Skip ::before / ::after (already handled as pseudo rules)
    if (!selectorRaw || /:{1,2}(before|after)\b/i.test(selectorRaw)) {
      continue;
    }
    if (
      !/\bcounter-(?:increment|reset)\s*:/i.test(body) ||
      COUNTER_CONTENT_PATTERN.test(body)
    ) {
      continue;
    }

    const declarations = parseCssDeclarations(body);
    if (!declarations["counter-increment"] && !declarations["counter-reset"]) {
      continue;
    }

    selectorRaw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .forEach((selector) => {
        rules.push({
          selector,
          "counter-increment": declarations["counter-increment"],
          "counter-reset": declarations["counter-reset"],
        });
      });
  }

  return rules;
};

const applyCssStylesToElement = (
  target: HTMLElement,
  styles: Record<string, string>,
) => {
  const styleSegments = Object.entries(styles).map(
    ([key, value]) => `${key}:${value};`,
  );
  if (styleSegments.length > 0) {
    target.setAttribute("style", styleSegments.join(""));
  }
};

const isCounterNoopValue = (input: string | undefined): boolean => {
  if (!input) return true;
  return COUNTER_NOOP_KEYWORDS.has(input.trim().toLowerCase());
};

const parseCounterIncrementList = (
  input: string | undefined,
): Array<{ name: string; value: number }> => {
  const source = input?.trim() ?? "";
  if (isCounterNoopValue(source)) {
    return [];
  }
  const results: Array<{ name: string; value: number }> = [];
  const pattern = /([a-zA-Z_][\w-]*)(?:\s+(-?\d+))?/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(source)) !== null) {
    const name = (match[1] || "").trim();
    if (!name) continue;
    const value = match[2] ? Number.parseInt(match[2], 10) : 1;
    results.push({
      name,
      value: Number.isFinite(value) ? value : 1,
    });
  }

  return results;
};

const parseCounterResetList = (
  input: string | undefined,
): Array<{ name: string; value: number }> => {
  const source = input?.trim() ?? "";
  if (isCounterNoopValue(source)) {
    return [];
  }
  const results: Array<{ name: string; value: number }> = [];
  const pattern = /([a-zA-Z_][\w-]*)(?:\s+(-?\d+))?/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(source)) !== null) {
    const name = (match[1] || "").trim();
    if (!name) continue;
    const value = match[2] ? Number.parseInt(match[2], 10) : 0;
    results.push({
      name,
      value: Number.isFinite(value) ? value : 0,
    });
  }

  return results;
};

export const extractCounterPseudoRules = (css: string): CounterPseudoRule[] => {
  if (!css) return [];

  const rules: CounterPseudoRule[] = [];
  const pattern = new RegExp(PSEUDO_RULE_PATTERN);
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(css)) !== null) {
    const selectorRaw = match[1]?.trim();
    const pseudoRaw = (match[2] || "").toLowerCase();
    const body = match[3] || "";

    if (!selectorRaw || !COUNTER_CONTENT_PATTERN.test(body)) {
      continue;
    }

    const pseudo: PseudoPosition = pseudoRaw === "after" ? "after" : "before";
    const selectors = selectorRaw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    selectors.forEach((selector) => {
      rules.push({ selector, pseudo });
    });
  }

  return rules;
};

export const stripCounterPseudoRules = (css: string): string => {
  if (!css) return css;
  const pattern = new RegExp(PSEUDO_RULE_PATTERN);

  return css.replace(
    pattern,
    (fullRule: string, _selector: string, _pseudo: string, body: string) =>
      COUNTER_CONTENT_PATTERN.test(body || "") ? "" : fullRule,
  );
};

const decodeQuotedText = (token: string): string => {
  if (
    (token.startsWith('"') && token.endsWith('"')) ||
    (token.startsWith("'") && token.endsWith("'"))
  ) {
    const inner = token.slice(1, -1);
    return inner
      .replace(/\\A\s?/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\");
  }
  return token;
};

const parseFunctionArgs = (raw: string): string[] => {
  const segments: string[] = [];
  let current = "";
  let quote: '"' | "'" | null = null;
  let escapeNext = false;

  for (const char of raw) {
    if (escapeNext) {
      current += char;
      escapeNext = false;
      continue;
    }

    if (char === "\\") {
      current += char;
      escapeNext = true;
      continue;
    }

    if (quote) {
      if (char === quote) {
        quote = null;
      }
      current += char;
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      current += char;
      continue;
    }

    if (char === ",") {
      const segment = current.trim();
      if (segment) {
        segments.push(decodeQuotedText(segment));
      }
      current = "";
      continue;
    }

    current += char;
  }

  const tail = current.trim();
  if (tail) {
    segments.push(decodeQuotedText(tail));
  }

  return segments;
};

const toRoman = (value: number): string => {
  if (!Number.isFinite(value) || value <= 0) return String(value);
  const numerals: Array<[number, string]> = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let remaining = Math.trunc(value);
  let output = "";
  numerals.forEach(([unit, symbol]) => {
    while (remaining >= unit) {
      output += symbol;
      remaining -= unit;
    }
  });
  return output;
};

const toAlphabetic = (value: number, upper = false): string => {
  if (!Number.isFinite(value) || value <= 0) return String(value);
  let n = Math.trunc(value);
  let output = "";
  while (n > 0) {
    n -= 1;
    output = String.fromCharCode(97 + (n % 26)) + output;
    n = Math.floor(n / 26);
  }
  return upper ? output.toUpperCase() : output;
};

const formatCounterValue = (value: number, styleRaw?: string): string => {
  const style = (styleRaw || "decimal").trim().toLowerCase();
  switch (style) {
    case "decimal":
      return String(value);
    case "decimal-leading-zero":
      return value >= 0 && value < 10 ? `0${value}` : String(value);
    case "lower-roman":
      return toRoman(value).toLowerCase();
    case "upper-roman":
      return toRoman(value);
    case "lower-alpha":
    case "lower-latin":
      return toAlphabetic(value, false);
    case "upper-alpha":
    case "upper-latin":
      return toAlphabetic(value, true);
    default:
      return String(value);
  }
};

interface CounterScope {
  depth: number;
  value: number;
}

type CounterScopes = Map<string, CounterScope[]>;

const pruneCounterScopes = (counterScopes: CounterScopes, depth: number) => {
  counterScopes.forEach((scopes, name) => {
    const filtered = scopes.filter((scope) => scope.depth <= depth);
    if (filtered.length === 0) {
      counterScopes.delete(name);
      return;
    }
    counterScopes.set(name, filtered);
  });
};

const resetCounter = (
  counterScopes: CounterScopes,
  name: string,
  value: number,
  depth: number,
) => {
  const scopes = counterScopes.get(name) ?? [];
  const sameDepthIndex = scopes.findIndex((scope) => scope.depth === depth);
  if (sameDepthIndex >= 0) {
    scopes[sameDepthIndex] = { depth, value };
    counterScopes.set(name, scopes);
    return;
  }
  counterScopes.set(name, [...scopes, { depth, value }]);
};

const incrementCounter = (
  counterScopes: CounterScopes,
  name: string,
  step: number,
  depth: number,
) => {
  const scopes = counterScopes.get(name);
  if (!scopes || scopes.length === 0) {
    counterScopes.set(name, [{ depth, value: step }]);
    return;
  }
  const next = [...scopes];
  const index = next.length - 1;
  next[index] = {
    depth: next[index].depth,
    value: next[index].value + step,
  };
  counterScopes.set(name, next);
};

const getCounterValue = (
  counterScopes: CounterScopes,
  name: string,
): number => {
  const scopes = counterScopes.get(name);
  if (!scopes || scopes.length === 0) return 0;
  return scopes[scopes.length - 1].value;
};

const getCountersValue = (
  counterScopes: CounterScopes,
  name: string,
  separator: string,
  style?: string,
): string => {
  const scopes = counterScopes.get(name);
  if (!scopes || scopes.length === 0) return "0";
  return scopes
    .map((scope) => formatCounterValue(scope.value, style))
    .join(separator);
};

const applyCounterOpsFromLists = (
  resets: Array<{ name: string; value: number }>,
  increments: Array<{ name: string; value: number }>,
  counterScopes: CounterScopes,
  depth: number,
) => {
  resets.forEach(({ name, value }) => {
    resetCounter(counterScopes, name, value, depth);
  });
  increments.forEach(({ name, value }) => {
    incrementCounter(counterScopes, name, value, depth);
  });
};

const applyCounterOpsFromStyle = (
  style: CSSStyleDeclaration,
  counterScopes: CounterScopes,
  depth: number,
) => {
  applyCounterOpsFromLists(
    parseCounterResetList(style.getPropertyValue("counter-reset")),
    parseCounterIncrementList(style.getPropertyValue("counter-increment")),
    counterScopes,
    depth,
  );
};

const resolveCounterContentTemplate = (
  template: string,
  counterScopes: CounterScopes,
): string => {
  if (!template) return "";

  const tokenPattern = /counter[s]?\([^)]*\)|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/gi;
  const tokens = template.match(tokenPattern);
  if (!tokens || tokens.length === 0) return "";

  return tokens
    .map((token) => {
      const lower = token.toLowerCase();
      if (lower.startsWith("counter(") && token.endsWith(")")) {
        const args = parseFunctionArgs(token.slice(8, -1));
        const name = args[0];
        if (!name) return "0";
        return formatCounterValue(
          getCounterValue(counterScopes, name),
          args[1],
        );
      }
      if (lower.startsWith("counters(") && token.endsWith(")")) {
        const args = parseFunctionArgs(token.slice(9, -1));
        const name = args[0];
        if (!name) return "0";
        const separator = args[1] ?? ".";
        return getCountersValue(counterScopes, name, separator, args[2]);
      }
      return decodeQuotedText(token);
    })
    .join("");
};

const copyPseudoStyles = (
  pseudoStyle: CSSStyleDeclaration,
  target: HTMLElement,
) => {
  const styleSegments: string[] = [];

  PSEUDO_STYLE_KEYS.forEach((key) => {
    const value = pseudoStyle.getPropertyValue(key)?.trim();
    if (!value || value === "initial" || value === "normal" || value === "none")
      return;
    styleSegments.push(`${key}:${value};`);
  });

  if (styleSegments.length > 0) {
    target.setAttribute("style", styleSegments.join(""));
  }
};

export const materializeCounterPseudoContent = (
  html: string,
  css: string,
): string => {
  if (
    typeof window === "undefined" ||
    typeof document === "undefined" ||
    !html ||
    !css ||
    !/\bcounters?\s*\(/i.test(css)
  ) {
    return html;
  }

  const cssPseudoRules = extractCssCounterPseudoRules(css);
  if (cssPseudoRules.length === 0) return html;

  const cssElementRules = extractCssElementCounterRules(css);

  const host = document.createElement("div");
  host.style.position = "absolute";
  host.style.left = "-9999px";
  host.style.top = "-9999px";
  host.style.pointerEvents = "none";
  host.style.opacity = "0";
  host.innerHTML = `<style>${css}</style><section id="wemd">${html}</section>`;
  document.body.appendChild(host);

  try {
    const root = host.querySelector("#wemd");
    if (!root) return html;

    const counterScopes: CounterScopes = new Map();

    const matchesSelector = (element: HTMLElement, selector: string) => {
      try {
        const trimmed = selector.trim();
        if (trimmed === "#wemd") {
          return element.id === "wemd";
        }
        const scoped = trimmed.replace(/^#wemd\s+/, "").trim();
        if (!scoped) return element.id === "wemd";
        return element.matches(scoped);
      } catch {
        return false;
      }
    };

    const applyMatchedElementOps = (element: HTMLElement, depth: number) => {
      cssElementRules.forEach((rule) => {
        if (!matchesSelector(element, rule.selector)) return;
        applyCounterOpsFromLists(
          parseCounterResetList(rule["counter-reset"]),
          parseCounterIncrementList(rule["counter-increment"]),
          counterScopes,
          depth,
        );
      });
    };

    const processPseudo = (
      element: HTMLElement,
      pseudo: PseudoPosition,
      depth: number,
    ) => {
      const matchedCssRules = cssPseudoRules.filter(
        (rule) =>
          rule.pseudo === pseudo && matchesSelector(element, rule.selector),
      );

      let template = "";
      let styleSource: CSSStyleDeclaration | null = null;
      let cssStyles: Record<string, string> | null = null;
      let appliedIncrementFromComputed = false;

      try {
        const pseudoStyle = window.getComputedStyle(element, `::${pseudo}`);
        const computedContent = pseudoStyle.content || "";
        if (/\bcounters?\s*\(/i.test(computedContent)) {
          applyCounterOpsFromStyle(pseudoStyle, counterScopes, depth);
          template = computedContent;
          styleSource = pseudoStyle;
          appliedIncrementFromComputed = true;
        }
      } catch {
        // jsdom / limited environments may not support pseudo getComputedStyle
      }

      if (!appliedIncrementFromComputed && matchedCssRules.length > 0) {
        const rule = matchedCssRules[matchedCssRules.length - 1];
        applyCounterOpsFromLists(
          parseCounterResetList(rule.declarations["counter-reset"]),
          parseCounterIncrementList(rule.declarations["counter-increment"]),
          counterScopes,
          depth,
        );
        template = rule.declarations.content || "";
        cssStyles = rule.declarations.styles;
        styleSource = null;
      }

      if (!/\bcounters?\s*\(/i.test(template)) return;

      const text = resolveCounterContentTemplate(template, counterScopes);
      if (!text) return;

      const span = document.createElement("span");
      span.setAttribute("data-wemd-counter-generated", pseudo);
      span.textContent = text;
      if (styleSource) {
        copyPseudoStyles(styleSource, span);
      } else if (cssStyles) {
        applyCssStylesToElement(span, cssStyles);
      }

      if (pseudo === "before") {
        element.insertBefore(span, element.firstChild);
      } else {
        element.appendChild(span);
      }
    };

    const walk = (element: HTMLElement, depth: number) => {
      pruneCounterScopes(counterScopes, depth);

      let appliedFromComputed = false;
      try {
        const elementStyle = window.getComputedStyle(element);
        const reset = elementStyle.getPropertyValue("counter-reset");
        const increment = elementStyle.getPropertyValue("counter-increment");
        if (!isCounterNoopValue(reset) || !isCounterNoopValue(increment)) {
          applyCounterOpsFromStyle(elementStyle, counterScopes, depth);
          appliedFromComputed = true;
        }
      } catch {
        // ignore
      }
      if (!appliedFromComputed) {
        applyMatchedElementOps(element, depth);
      }

      const children = Array.from(element.children) as HTMLElement[];
      processPseudo(element, "before", depth);
      children.forEach((child) => walk(child, depth + 1));
      processPseudo(element, "after", depth);
    };

    walk(root as HTMLElement, 0);

    return root.innerHTML;
  } finally {
    document.body.removeChild(host);
  }
};
