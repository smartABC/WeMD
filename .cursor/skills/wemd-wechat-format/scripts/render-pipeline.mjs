import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { basename, extname, join, resolve } from "node:path";
import { createMarkdownParser, processHtml } from "@wemd/core";
import {
  materializeCounterPseudoContent,
  stripCounterPseudoRules,
} from "../../../../apps/web/src/services/wechatCounterCompat.ts";
import { expandCSSVariables } from "./css-variable-expander.mjs";
import { getThemeCss, getThemeName, printThemes } from "./themes-map.mjs";

/**
 * @param {string} html
 */
const convertCheckboxesToEmoji = (html) => {
  let result = html.replace(/<input[^>]*checked[^>]*>/gi, "✅&nbsp;");
  result = result.replace(
    /<input[^>]*type=["']checkbox["'][^>]*>/gi,
    "⬜&nbsp;",
  );
  return result;
};

/**
 * @param {string} wemdRoot
 */
const loadKatexCss = (wemdRoot) => {
  const require = createRequire(join(wemdRoot, "packages/core/package.json"));
  try {
    return readFileSync(require.resolve("katex/dist/katex.min.css"), "utf8");
  } catch {
    console.warn("[warn] 未找到 katex.min.css，公式样式可能不完整");
    return "";
  }
};

/**
 * @param {string} themeCss
 * @param {string} wemdRoot
 */
const buildCopyCss = (themeCss, wemdRoot) => {
  const expandedCss = expandCSSVariables(themeCss);
  const katexCss = loadKatexCss(wemdRoot);
  return katexCss ? `${expandedCss}\n${katexCss}` : expandedCss;
};

/**
 * @param {string} wemdRoot
 * @param {() => string} fn
 */
const withJsdom = (wemdRoot, fn) => {
  if (typeof document !== "undefined" && typeof window !== "undefined") {
    return fn();
  }

  const require = createRequire(join(wemdRoot, "apps/web/package.json"));
  const { JSDOM } = require("jsdom");
  const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;

  globalThis.window = dom.window;
  globalThis.document = dom.window.document;

  try {
    return fn();
  } finally {
    if (previousWindow === undefined) {
      Reflect.deleteProperty(globalThis, "window");
    } else {
      globalThis.window = previousWindow;
    }
    if (previousDocument === undefined) {
      Reflect.deleteProperty(globalThis, "document");
    } else {
      globalThis.document = previousDocument;
    }
    dom.window.close();
  }
};

/**
 * @param {string} bodyHtml
 */
const wrapAsHtmlDocument = (bodyHtml) => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>WeMD WeChat Export</title>
  <style>body { max-width: 760px; margin: 0 auto; padding: 24px; color: #000; }</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

/**
 * @param {string} markdown
 * @param {string} themeCss
 * @param {string} wemdRoot
 * @param {{ showMacBar?: boolean }} [options]
 */
export const renderMarkdownToWechatHtml = (
  markdown,
  themeCss,
  wemdRoot,
  options = {},
) => {
  const parser = createMarkdownParser({
    mathRenderer: "katex",
    showMacBar: options.showMacBar === true,
  });
  const rawHtml = parser.render(markdown);
  const copyCss = buildCopyCss(themeCss, wemdRoot);

  const styledHtml = withJsdom(wemdRoot, () => {
    const materializedHtml = materializeCounterPseudoContent(rawHtml, copyCss);
    const sanitizedCss = stripCounterPseudoRules(copyCss);
    return processHtml(materializedHtml, sanitizedCss, true, true);
  });

  const finalHtml = convertCheckboxesToEmoji(styledHtml);
  return wrapAsHtmlDocument(finalHtml);
};

/**
 * @param {string[]} argv
 */
const parseArgs = (argv) => {
  /** @type {{
   *   input: string | null;
   *   output: string | null;
   *   theme: string;
   *   listThemes: boolean;
   *   showMacBar: boolean;
   *   help: boolean;
   * }} */
  const args = {
    input: null,
    output: null,
    theme: "modern-editorial",
    listThemes: false,
    showMacBar: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case "--input":
      case "-i":
        args.input = argv[++i];
        break;
      case "--output":
      case "-o":
        args.output = argv[++i];
        break;
      case "--theme":
      case "-t":
        args.theme = argv[++i];
        break;
      case "--mac-bar":
        args.showMacBar = true;
        break;
      case "--list-themes":
        args.listThemes = true;
        break;
      case "--help":
      case "-h":
        args.help = true;
        break;
      default:
        if (!arg.startsWith("-") && !args.input) {
          args.input = arg;
        }
    }
  }

  return args;
};

/**
 * @param {string} inputPath
 */
const defaultOutputPath = (inputPath) => {
  const base = basename(inputPath, extname(inputPath));
  return resolve(process.cwd(), `${base}-wechat.html`);
};

const printHelp = () => {
  console.log(`
WeMD 微信公众号 HTML 渲染

用法:
  pnpm format:wechat -- -i article.md [-t modern-editorial] [-o out.html]

选项:
  -i, --input       Markdown 文件
  -o, --output      输出 HTML（默认 {input}-wechat.html）
  -t, --theme       主题 id（默认 modern-editorial）
      --mac-bar     代码块 Mac 装饰栏
      --list-themes 列出主题
  -h, --help        帮助
`);
};

/**
 * @param {string[]} argv
 * @param {{ wemdRoot: string }} ctx
 */
export const runCli = async (argv, ctx) => {
  const args = parseArgs(argv);

  if (args.help) {
    printHelp();
    return;
  }

  if (args.listThemes) {
    printThemes();
    return;
  }

  if (!args.input) {
    console.error("错误: 缺少 --input");
    printHelp();
    process.exit(1);
  }

  const inputPath = resolve(process.cwd(), args.input);
  const outputPath = args.output
    ? resolve(process.cwd(), args.output)
    : defaultOutputPath(inputPath);

  const markdown = readFileSync(inputPath, "utf8");
  const themeCss = getThemeCss(args.theme);

  if (/```\s*mermaid/i.test(markdown)) {
    console.warn(
      "[warn] 检测到 Mermaid：CLI 不渲染图表，建议用 edit.wemd.app 最终复制",
    );
  }

  const html = renderMarkdownToWechatHtml(markdown, themeCss, ctx.wemdRoot, {
    showMacBar: args.showMacBar,
  });

  writeFileSync(outputPath, html, "utf8");
  console.log(`✅ 已输出: ${outputPath}`);
  console.log(`   主题: ${args.theme} (${getThemeName(args.theme)})`);
  console.log("   粘贴: 浏览器打开 → 全选复制 → 公众号编辑器 Ctrl+V");
};
