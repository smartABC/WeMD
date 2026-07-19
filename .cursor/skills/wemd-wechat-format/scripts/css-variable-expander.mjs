import {
  findMatchingParen,
  findNextVarStart,
  splitVarArgs,
} from "./css-var-parser.mjs";

/**
 * @param {string} css
 */
const extractCustomProperties = (css) => {
  /** @type {Map<string, string>} */
  const vars = new Map();
  const regex = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let match = regex.exec(css);
  while (match !== null) {
    vars.set(match[1].trim(), match[2].trim());
    match = regex.exec(css);
  }
  return vars;
};

/**
 * @param {string} value
 * @param {Map<string, string>} vars
 * @param {Set<string>} resolving
 */
const resolveVarReferences = (value, vars, resolving) => {
  let result = "";
  let cursor = 0;

  while (cursor < value.length) {
    const varIndex = findNextVarStart(value, cursor);
    if (varIndex < 0) {
      result += value.slice(cursor);
      break;
    }

    result += value.slice(cursor, varIndex);

    const openParen = varIndex + 3;
    const closeIndex = findMatchingParen(value, openParen);
    if (closeIndex < 0) {
      result += value.slice(varIndex);
      break;
    }

    const inner = value.slice(openParen + 1, closeIndex);
    const [varName, fallback] = splitVarArgs(inner);

    if (varName.startsWith("--") && vars.has(varName) && !resolving.has(varName)) {
      resolving.add(varName);
      const resolved = resolveVarReferences(vars.get(varName) ?? "", vars, resolving);
      resolving.delete(varName);
      result += resolved;
    } else if (fallback !== undefined) {
      result += resolveVarReferences(fallback, vars, resolving);
    } else {
      result += value.slice(varIndex, closeIndex + 1);
    }

    cursor = closeIndex + 1;
  }

  return result;
};

/**
 * @param {string} css
 */
const stripCustomPropertyDeclarations = (css) =>
  css.replace(/^\s*--[\w-]+\s*:[^;]+;\s*$/gm, "");

/**
 * @param {string} css
 */
export const expandCSSVariables = (css) => {
  if (!css) return css;

  const hasVar = css.includes("var(");
  const vars = extractCustomProperties(css);
  const hasCustomProps = vars.size > 0;

  if (!hasVar && !hasCustomProps) return css;

  let expanded = css;

  if (hasVar) {
    const resolvedVars = new Map();
    for (const [name, value] of vars) {
      resolvedVars.set(name, resolveVarReferences(value, vars, new Set([name])));
    }
    expanded = resolveVarReferences(expanded, resolvedVars, new Set());
  }

  if (hasCustomProps) {
    expanded = stripCustomPropertyDeclarations(expanded);
  }

  return expanded;
};
