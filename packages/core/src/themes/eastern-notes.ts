export const easternNotesTheme = `/* 东方笺谱：现代人文长文 */
#wemd {
  max-width: 677px;
  margin: 0 auto;
  padding: 20px 24px;
  color: #36322f;
  background-color: transparent;
  font-family: "Songti SC", "STSong", "Noto Serif CJK SC", SimSun, serif;
  font-size: 16px;
  line-height: 1.95;
  letter-spacing: 0.035em;
  word-break: break-word;
}

#wemd p {
  margin: 0 0 25px;
  color: #36322f;
  font-size: 16px;
  line-height: 1.95;
  text-align: justify;
}

#wemd h1,
#wemd h2,
#wemd h3,
#wemd h4,
#wemd h5,
#wemd h6 {
  text-align: left;
}

#wemd h1 {
  margin: 28px 0 52px;
  padding: 25px 16px;
  border-top: 4px double #4c4640;
  border-bottom: 4px double #4c4640;
  text-align: center;
}

#wemd h1 .content {
  color: #282522;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.12em;
}

#wemd h2 {
  margin: 48px 0 24px;
  padding: 12px 0;
  border-top: 1px solid #b8afa7;
  border-bottom: 1px solid #b8afa7;
  text-align: center;
}

#wemd h2 .content {
  color: #a33a2b;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

#wemd h3 {
  margin: 35px 0 18px;
}

#wemd h3 .content {
  display: inline-block;
  padding: 5px 11px;
  color: #ffffff;
  background: #a33a2b;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.5;
}

#wemd h4,
#wemd h5,
#wemd h6 {
  margin: 29px 0 14px;
  padding-bottom: 5px;
  border-bottom: 1px dotted #9e9187;
}

#wemd h4 .content,
#wemd h5 .content,
#wemd h6 .content {
  color: #514841;
  font-size: 16px;
  font-weight: 700;
}

#wemd h1 .prefix,
#wemd h1 .suffix,
#wemd h2 .prefix,
#wemd h2 .suffix,
#wemd h3 .prefix,
#wemd h3 .suffix,
#wemd h4 .prefix,
#wemd h4 .suffix,
#wemd h5 .prefix,
#wemd h5 .suffix,
#wemd h6 .prefix,
#wemd h6 .suffix {
  display: none;
}

#wemd blockquote {
  border: none;
}

#wemd .multiquote-1,
#wemd .multiquote-2,
#wemd .multiquote-3 {
  margin: 34px 10px;
  padding: 22px 24px;
  border: 1px solid #bfb4aa;
  border-top: 5px solid #a33a2b;
  background: #f4f2ef;
}

#wemd .multiquote-1 p,
#wemd .multiquote-2 p,
#wemd .multiquote-3 p {
  margin: 0;
  color: #564c45;
  font-size: 16px;
  line-height: 1.95;
  text-align: center;
}

#wemd ul,
#wemd ol {
  margin: 22px 0 28px;
  padding-left: 25px;
  color: #a33a2b;
}

#wemd li section {
  margin: 7px 0;
  color: #36322f;
  line-height: 1.88;
}

#wemd ol > li > section {
  padding: 6px 10px;
  border: 1px solid #ded8d2;
  background: #f8f7f5;
}

#wemd a {
  color: #8c3025;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: #c99087;
  text-underline-offset: 0.22em;
}

#wemd strong {
  color: #272320;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: #d9aaa2;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.18em;
}

#wemd mark {
  padding: 1px 4px;
  color: #4f2822;
  background: #efd9d4;
}

#wemd hr {
  width: 92px;
  height: 4px;
  margin: 52px auto;
  border: none;
  background: #a33a2b;
}

#wemd figure {
  margin: 43px 0 47px;
  padding: 12px 0;
  border-top: 1px solid #bfb4aa;
  border-bottom: 1px solid #bfb4aa;
}

#wemd figure a {
  border: none;
}

#wemd img,
#wemd figure a img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}

#wemd figcaption {
  margin-top: 13px;
  color: #746860;
  font-size: 12px;
  line-height: 1.7;
  letter-spacing: 0.08em;
  text-align: center;
}

#wemd p code,
#wemd li code {
  padding: 2px 6px;
  border: 1px solid #d4cbc3;
  color: #8c3025;
  background: #f1eeea;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
}

#wemd pre {
  margin: 32px 0;
  border: 1px solid #403a35;
  border-top: 6px solid #a33a2b;
  background: #2e2a27;
  overflow-x: auto;
}

#wemd pre code,
#wemd pre code.hljs {
  display: block;
  min-width: max-content;
  padding: 20px;
  color: #f0ece7;
  background: #2e2a27;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
  line-height: 1.72;
  white-space: pre;
}

#wemd pre.custom > .mac-sign {
  display: block;
  border-bottom: 1px solid #5d554e;
  background: #2e2a27;
}

#wemd .table-container {
  margin: 34px 0;
  overflow-x: auto;
}

#wemd table {
  width: 100%;
  border-collapse: collapse;
  color: #3d3732;
  background: #faf9f7;
  text-align: left;
}

#wemd table tr th,
#wemd table tr td {
  min-width: 88px;
  padding: 11px 10px;
  border: 1px solid #cfc6be;
  font-size: 14px;
  line-height: 1.65;
}

#wemd table tr th {
  color: #ffffff;
  background: #5a4e46;
  font-weight: 700;
}

#wemd table tr:nth-child(2n) {
  background: #f0ede9;
}

#wemd .callout {
  margin: 31px 0;
  padding: 18px 20px;
  border: 1px solid #c2b7ae;
  border-top: 4px solid #5a4e46;
  color: #4a423c;
  background: #f5f3f0;
}

#wemd .callout-warning,
#wemd .callout-caution {
  border-top-color: #a33a2b;
  background: #f7ebe8;
}

#wemd .callout-title {
  margin-bottom: 8px;
  color: #5a2d26;
  font-weight: 700;
}

#wemd .callout p {
  margin: 0;
  color: #564c45;
  font-size: 15px;
}

#wemd .footnote-word,
#wemd .footnote-ref {
  color: #a33a2b;
  font-weight: 700;
}

#wemd .footnotes-sep {
  margin-top: 52px;
  padding-top: 18px;
  border-top: 4px double #4c4640;
}

#wemd .footnote-item {
  display: flex;
  margin-top: 9px;
}

#wemd .footnote-num {
  width: 30px;
  flex-shrink: 0;
  color: #a33a2b;
}

#wemd .footnote-item p {
  margin: 0;
  color: #746860;
  font-size: 13px;
  text-align: left;
}

#wemd .block-equation {
  display: block;
  margin: 32px 0;
  padding: 19px 10px;
  border-top: 1px solid #cfc6be;
  border-bottom: 1px solid #cfc6be;
  text-align: center;
  overflow-x: auto;
}

#wemd .block-equation > svg {
  max-width: 300% !important;
}

#wemd .inline-equation > svg {
  vertical-align: middle;
}

#wemd pre.mermaid {
  padding: 20px 10px;
  border: 1px solid #c2b7ae;
  border-top: 5px solid #a33a2b;
  background: #faf9f7;
}

#wemd .task-list-item {
  display: flex;
  align-items: flex-start;
  margin-left: -1.2em;
  list-style: none;
}

#wemd .task-list-item input[type='checkbox'] {
  margin-top: 8px;
  margin-right: 8px;
  accent-color: #a33a2b;
  pointer-events: none;
}
`;
