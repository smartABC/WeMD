#!/usr/bin/env node
/**
 * Vite SSR runner — loads render pipeline against @wemd/core source.
 * Plain Node cannot require packages/core/dist (markdown-it v14 ESM subpaths).
 */
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const findWemdRoot = (startDir) => {
  let dir = startDir;
  while (true) {
    if (existsSync(join(dir, "packages/core/package.json"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) {
      throw new Error("未找到 WeMD 仓库根目录");
    }
    dir = parent;
  }
};

const wemdRoot = findWemdRoot(__dirname);
const webRoot = join(wemdRoot, "apps/web");
const mdItLib = join(wemdRoot, "packages/core/node_modules/markdown-it/lib");
const webRequire = createRequire(join(webRoot, "package.json"));
const { createServer } = webRequire("vite");

const coreSrc = join(wemdRoot, "packages/core/src/index.ts").replace(
  /\\/g,
  "/",
);
const pipelinePath = join(__dirname, "render-pipeline.mjs").replace(
  /\\/g,
  "/",
);

/** markdown-it v14 only ships .mjs under lib/; map legacy subpath imports. */
const mdItAlias = (subpath) =>
  join(mdItLib, `${subpath}.mjs`).replace(/\\/g, "/");

const server = await createServer({
  root: webRoot,
  configFile: join(webRoot, "vite.config.ts"),
  server: { middlewareMode: true },
  appType: "custom",
  resolve: {
    alias: {
      "@wemd/core": coreSrc,
      "markdown-it/lib/token": mdItAlias("token"),
      "markdown-it/lib/renderer": mdItAlias("renderer"),
      "markdown-it/lib/rules_core/state_core": mdItAlias(
        "rules_core/state_core",
      ),
      "markdown-it/lib/rules_inline/state_inline": mdItAlias(
        "rules_inline/state_inline",
      ),
      "markdown-it/lib/rules_block/state_block": mdItAlias(
        "rules_block/state_block",
      ),
    },
  },
});

try {
  const pipelineUrl = pathToFileURL(pipelinePath).href;
  const { runCli } = await server.ssrLoadModule(pipelineUrl);
  await runCli(process.argv.slice(2), { wemdRoot });
} finally {
  await server.close();
}
