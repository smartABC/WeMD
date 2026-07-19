import {
  academicPaperTheme,
  auroraGlassTheme,
  basicTheme,
  bauhausTheme,
  clearGuideTheme,
  codeGithubDarkTheme,
  codeGithubTheme,
  customDefaultTheme,
  cyberpunkNeonTheme,
  dataBlueprintTheme,
  easternNotesTheme,
  knowledgeBaseTheme,
  luxuryGoldTheme,
  modernEditorialTheme,
  morandiForestTheme,
  neoBrutalismTheme,
  receiptTheme,
  sunsetFilmTheme,
  templateTheme,
  whitespaceGalleryTheme,
} from "@wemd/core";

const THEME_REGISTRY = {
  default: {
    name: "默认主题",
    css: [basicTheme, customDefaultTheme, codeGithubTheme].join("\n"),
  },
  "data-blueprint": {
    name: "数据蓝图",
    css: [basicTheme, dataBlueprintTheme, codeGithubDarkTheme].join("\n"),
  },
  "eastern-notes": {
    name: "东方笺谱",
    css: [basicTheme, easternNotesTheme, codeGithubDarkTheme].join("\n"),
  },
  "clear-guide": {
    name: "清晰指南",
    css: [basicTheme, clearGuideTheme, codeGithubDarkTheme].join("\n"),
  },
  "whitespace-gallery": {
    name: "留白画册",
    css: [basicTheme, whitespaceGalleryTheme, codeGithubDarkTheme].join("\n"),
  },
  "academic-paper": {
    name: "学术论文",
    css: [basicTheme, academicPaperTheme, codeGithubTheme].join("\n"),
  },
  "aurora-glass": {
    name: "极光玻璃",
    css: [basicTheme, auroraGlassTheme, codeGithubTheme].join("\n"),
  },
  bauhaus: {
    name: "包豪斯",
    css: [basicTheme, bauhausTheme, codeGithubTheme].join("\n"),
  },
  "cyberpunk-neon": {
    name: "赛博朋克",
    css: [basicTheme, cyberpunkNeonTheme, codeGithubTheme].join("\n"),
  },
  "knowledge-base": {
    name: "知识库",
    css: [basicTheme, knowledgeBaseTheme, codeGithubTheme].join("\n"),
  },
  "luxury-gold": {
    name: "黑金奢华",
    css: [basicTheme, luxuryGoldTheme, codeGithubTheme].join("\n"),
  },
  "morandi-forest": {
    name: "莫兰迪森林",
    css: [basicTheme, morandiForestTheme, codeGithubTheme].join("\n"),
  },
  "modern-editorial": {
    name: "编辑部手记",
    css: [basicTheme, modernEditorialTheme, codeGithubDarkTheme].join("\n"),
  },
  "neo-brutalism": {
    name: "新粗野主义",
    css: [basicTheme, neoBrutalismTheme, codeGithubTheme].join("\n"),
  },
  receipt: {
    name: "购物小票",
    css: [basicTheme, receiptTheme, codeGithubTheme].join("\n"),
  },
  "sunset-film": {
    name: "落日胶片",
    css: [basicTheme, sunsetFilmTheme, codeGithubTheme].join("\n"),
  },
  template: {
    name: "主题模板",
    css: [basicTheme, templateTheme, codeGithubTheme].join("\n"),
  },
};

export const listThemeIds = () => Object.keys(THEME_REGISTRY);

export const getThemeCss = (themeId) => {
  const theme = THEME_REGISTRY[themeId];
  if (!theme) {
    throw new Error(
      `未知主题 "${themeId}"。可用: ${Object.keys(THEME_REGISTRY).join(", ")}`,
    );
  }
  return theme.css;
};

export const getThemeName = (themeId) => {
  const theme = THEME_REGISTRY[themeId];
  if (!theme) {
    throw new Error(
      `未知主题 "${themeId}"。可用: ${Object.keys(THEME_REGISTRY).join(", ")}`,
    );
  }
  return theme.name;
};

export const printThemes = () => {
  for (const [id, { name }] of Object.entries(THEME_REGISTRY)) {
    console.log(`${id}\t${name}`);
  }
};
