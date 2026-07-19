/** @typedef {'\'' | '"'} Quote */

/**
 * @param {string} value
 * @param {number} startIndex
 */
export const findNextVarStart = (value, startIndex) => {
  /** @type {Quote | null} */
  let quote = null;
  let escapeNext = false;

  for (let i = startIndex; i < value.length; i += 1) {
    const char = value[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === "\\") {
      escapeNext = true;
      continue;
    }

    if (quote) {
      if (char === quote) quote = null;
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }

    if (char === "v" && value.slice(i, i + 4).toLowerCase() === "var(") {
      return i;
    }
  }

  return -1;
};

/**
 * @param {string} value
 * @param {number} openIndex
 */
export const findMatchingParen = (value, openIndex) => {
  let depth = 0;
  /** @type {Quote | null} */
  let quote = null;
  let escapeNext = false;

  for (let i = openIndex; i < value.length; i += 1) {
    const char = value[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === "\\") {
      escapeNext = true;
      continue;
    }

    if (quote) {
      if (char === quote) quote = null;
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }

    if (char === "(") {
      depth += 1;
      continue;
    }

    if (char === ")") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  return -1;
};

/**
 * @param {string} input
 * @returns {[string, string | undefined]}
 */
export const splitVarArgs = (input) => {
  let depth = 0;
  /** @type {Quote | null} */
  let quote = null;
  let escapeNext = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === "\\") {
      escapeNext = true;
      continue;
    }

    if (quote) {
      if (char === quote) quote = null;
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }

    if (char === "(") {
      depth += 1;
      continue;
    }

    if (char === ")") {
      depth -= 1;
      continue;
    }

    if (char === "," && depth === 0) {
      return [input.slice(0, i).trim(), input.slice(i + 1).trim()];
    }
  }

  return [input.trim(), undefined];
};
