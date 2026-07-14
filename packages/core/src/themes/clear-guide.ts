export const clearGuideTheme = `/* 清晰指南：教程与操作手册 */
#wemd {
  max-width: 677px;
  margin: 0 auto;
  padding: 18px 24px;
  color: #263b3a;
  background-color: transparent;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 16px;
  line-height: 1.82;
  letter-spacing: 0.012em;
  word-break: break-word;
}

#wemd p {
  margin: 0 0 21px;
  color: #263b3a;
  font-size: 16px;
  line-height: 1.82;
  text-align: left;
}

#wemd h1,
#wemd h2,
#wemd h3,
#wemd h4,
#wemd h5,
#wemd h6 {
  padding: 0;
  text-align: left;
}

#wemd h1 {
  margin: 24px 0 44px;
  padding: 22px 20px;
  border: 1px solid #075f58;
  border-bottom: 7px solid #075f58;
  background: #e8f4f2;
}

#wemd h1 .content {
  color: #064c47;
  font-size: 30px;
  font-weight: 800;
  line-height: 1.4;
}

#wemd h2 {
  margin: 45px 0 23px;
  padding: 12px 14px;
  border-top: 5px solid #087f75;
  border-bottom: 1px solid #9bbdb9;
  background: #f3f8f7;
}

#wemd h2 .content {
  color: #075f58;
  font-size: 21px;
  font-weight: 750;
}

#wemd h3 {
  margin: 32px 0 16px;
}

#wemd h3 .content {
  display: block;
  padding: 8px 11px;
  color: #254342;
  background: #dfeeed;
  font-size: 17px;
  font-weight: 700;
}

#wemd h4,
#wemd h5,
#wemd h6 {
  margin: 27px 0 13px;
  padding-bottom: 6px;
  border-bottom: 1px dashed #8eb1ad;
}

#wemd h4 .content,
#wemd h5 .content,
#wemd h6 .content {
  color: #176c65;
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
  margin: 28px 0;
  padding: 18px 19px;
  border: 1px solid #9bbdb9;
  border-top: 5px solid #087f75;
  background: #edf6f5;
}

#wemd .multiquote-1 p,
#wemd .multiquote-2 p,
#wemd .multiquote-3 p {
  margin: 0;
  color: #31514f;
  font-size: 15px;
  line-height: 1.8;
}

#wemd ul,
#wemd ol {
  margin: 20px 0 27px;
  padding-left: 25px;
  color: #087f75;
}

#wemd li section {
  margin: 6px 0;
  color: #263b3a;
  line-height: 1.76;
}

#wemd ol > li {
  margin: 12px 0;
  font-weight: 750;
}

#wemd ol > li > section {
  padding: 11px 13px;
  border: 1px solid #b9d0cd;
  border-top: 4px solid #087f75;
  color: #263b3a;
  background: #f7faf9;
  font-weight: 400;
}

#wemd a {
  color: #06736a;
  font-weight: 650;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

#wemd strong {
  color: #064c47;
  font-weight: 750;
}

#wemd mark {
  padding: 1px 4px;
  color: #4f3a11;
  background: #f5dda1;
}

#wemd hr {
  height: 1px;
  margin: 44px 0;
  border: none;
  background: #9bbdb9;
}

#wemd figure {
  margin: 34px 0 39px;
  padding: 10px;
  border: 1px solid #b9d0cd;
  background: #f7faf9;
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
  margin-top: 10px;
  color: #58716f;
  font-size: 12px;
  line-height: 1.65;
  text-align: center;
}

#wemd p code,
#wemd li code {
  padding: 2px 6px;
  border: 1px solid #b9d0cd;
  color: #075f58;
  background: #eaf3f2;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
}

#wemd pre {
  margin: 29px 0;
  border: 1px solid #183f3c;
  border-top: 6px solid #23a79b;
  background: #173330;
  overflow-x: auto;
}

#wemd pre code,
#wemd pre code.hljs {
  display: block;
  min-width: max-content;
  padding: 19px 20px;
  color: #e8f4f2;
  background: #173330;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
  line-height: 1.7;
  white-space: pre;
}

#wemd pre.custom > .mac-sign {
  display: block;
  border-bottom: 1px solid #365c58;
  background: #173330;
}

#wemd .table-container {
  margin: 31px 0;
  overflow-x: auto;
}

#wemd table {
  width: 100%;
  border-collapse: collapse;
  color: #263b3a;
  background: #ffffff;
  text-align: left;
}

#wemd table tr th,
#wemd table tr td {
  min-width: 88px;
  padding: 10px;
  border: 1px solid #b9d0cd;
  font-size: 14px;
  line-height: 1.6;
}

#wemd table tr th {
  color: #ffffff;
  background: #087f75;
  font-weight: 700;
}

#wemd table tr:nth-child(2n) {
  background: #eef6f5;
}

#wemd .callout {
  margin: 29px 0;
  padding: 17px 18px;
  border: 1px solid #93b8b4;
  border-top: 5px solid #087f75;
  color: #263b3a;
  background: #edf6f5;
}

#wemd .callout-warning {
  border-color: #d79d36;
  border-top-color: #b46e00;
  background: #fff6df;
}

#wemd .callout-caution {
  border-color: #d8958d;
  border-top-color: #a43c31;
  background: #fff0ed;
}

#wemd .callout-title {
  margin-bottom: 7px;
  color: #075f58;
  font-weight: 750;
}

#wemd .callout p {
  margin: 0;
  font-size: 15px;
}

#wemd .footnote-word,
#wemd .footnote-ref {
  color: #087f75;
  font-weight: 700;
}

#wemd .footnotes-sep {
  margin-top: 47px;
  padding-top: 16px;
  border-top: 5px solid #087f75;
}

#wemd .footnote-item {
  display: flex;
  margin-top: 9px;
}

#wemd .footnote-num {
  width: 30px;
  flex-shrink: 0;
  color: #087f75;
  font-weight: 700;
}

#wemd .footnote-item p {
  margin: 0;
  color: #58716f;
  font-size: 13px;
}

#wemd .block-equation {
  display: block;
  margin: 30px 0;
  padding: 18px 10px;
  border: 1px solid #b9d0cd;
  background: #f7faf9;
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
  border: 1px solid #93b8b4;
  border-top: 5px solid #087f75;
  background: #ffffff;
}

#wemd .task-list-item {
  display: flex;
  align-items: flex-start;
  margin: 9px 0 9px -1.2em;
  padding: 9px 10px;
  border: 1px solid #c5d8d6;
  background: #f7faf9;
  list-style: none;
}

#wemd .task-list-item input[type='checkbox'] {
  margin-top: 7px;
  margin-right: 8px;
  accent-color: #087f75;
  pointer-events: none;
}
`;
