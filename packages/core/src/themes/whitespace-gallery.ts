export const whitespaceGalleryTheme = `/* 留白画册：图片与人物故事 */
#wemd {
  max-width: 677px;
  margin: 0 auto;
  padding: 22px 22px;
  color: #3a3734;
  background-color: transparent;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 16px;
  line-height: 1.9;
  letter-spacing: 0.02em;
  word-break: break-word;
}

#wemd p {
  max-width: 40em;
  margin: 0 auto 27px;
  color: #3a3734;
  font-size: 16px;
  line-height: 1.9;
  text-align: justify;
}

#wemd h1 {
  margin: 34px 0 62px;
  padding: 0 0 23px;
  border-bottom: 1px solid #a7a29d;
  text-align: left;
}

#wemd h1 .content {
  color: #2b2927;
  font-family: "Songti SC", "STSong", "Noto Serif CJK SC", SimSun, serif;
  font-size: 35px;
  font-weight: 700;
  line-height: 1.42;
  letter-spacing: 0.045em;
}

#wemd h2 {
  margin: 58px 0 29px;
  text-align: center;
}

#wemd h2 .content {
  display: inline-block;
  padding: 0 18px 9px;
  border-bottom: 3px solid #2b2927;
  color: #2b2927;
  font-family: "Songti SC", "STSong", "Noto Serif CJK SC", SimSun, serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

#wemd h3 {
  max-width: 40em;
  margin: 39px auto 19px;
  padding-bottom: 8px;
  border-bottom: 1px solid #bbb6b1;
}

#wemd h3 .content {
  color: #49433f;
  font-size: 17px;
  font-weight: 700;
}

#wemd h4,
#wemd h5,
#wemd h6 {
  max-width: 40em;
  margin: 30px auto 15px;
}

#wemd h4 .content,
#wemd h5 .content,
#wemd h6 .content {
  color: #625b55;
  font-size: 16px;
  font-weight: 650;
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
  margin: 48px 12px;
  padding: 25px 16px;
  border-top: 1px solid #2b2927;
  border-bottom: 1px solid #2b2927;
  background: transparent;
}

#wemd .multiquote-1 p,
#wemd .multiquote-2 p,
#wemd .multiquote-3 p {
  margin: 0 auto;
  color: #49433f;
  font-family: "Songti SC", "STSong", "Noto Serif CJK SC", SimSun, serif;
  font-size: 20px;
  line-height: 1.85;
  letter-spacing: 0.04em;
  text-align: center;
}

#wemd ul,
#wemd ol {
  max-width: 38em;
  margin: 24px auto 31px;
  padding-left: 25px;
  color: #8b4c3b;
}

#wemd li section {
  margin: 7px 0;
  color: #3a3734;
  line-height: 1.85;
}

#wemd ol > li > section {
  padding-bottom: 8px;
  border-bottom: 1px dotted #bbb6b1;
}

#wemd a {
  color: #80503f;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.23em;
}

#wemd strong {
  color: #2b2927;
  font-weight: 750;
}

#wemd mark {
  padding: 1px 4px;
  color: #4c382f;
  background: #eadbd5;
}

#wemd hr {
  width: 36px;
  height: 5px;
  margin: 58px auto;
  border: none;
  background: #2b2927;
}

#wemd figure {
  margin: 52px 0 58px;
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
  margin: 14px auto 0;
  color: #77706a;
  font-size: 12px;
  line-height: 1.7;
  letter-spacing: 0.055em;
  text-align: center;
}

#wemd p code,
#wemd li code {
  padding: 2px 5px;
  border-bottom: 1px solid #a7a29d;
  color: #5c4740;
  background: #f3f2f1;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
}

#wemd pre {
  margin: 38px 0;
  border: 1px solid #2b2927;
  background: #2b2927;
  overflow-x: auto;
}

#wemd pre code,
#wemd pre code.hljs {
  display: block;
  min-width: max-content;
  padding: 21px;
  color: #f0efed;
  background: #2b2927;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
  line-height: 1.72;
  white-space: pre;
}

#wemd pre.custom > .mac-sign {
  display: block;
  border-bottom: 1px solid #57524e;
  background: #2b2927;
}

#wemd .table-container {
  margin: 39px 0;
  overflow-x: auto;
}

#wemd table {
  width: 100%;
  border-collapse: collapse;
  color: #3a3734;
  background: transparent;
  text-align: left;
}

#wemd table tr th,
#wemd table tr td {
  min-width: 88px;
  padding: 11px 9px;
  border: none;
  border-bottom: 1px solid #bbb6b1;
  font-size: 14px;
  line-height: 1.65;
}

#wemd table tr th {
  border-top: 3px solid #2b2927;
  border-bottom: 2px solid #2b2927;
  color: #2b2927;
  background: transparent;
  font-weight: 750;
}

#wemd table tr:nth-child(2n) {
  background: #f3f2f1;
}

#wemd .callout {
  max-width: 39em;
  margin: 38px auto;
  padding: 19px 20px;
  border: 1px solid #aaa49f;
  border-top: 4px solid #2b2927;
  color: #49433f;
  background: #f4f3f2;
}

#wemd .callout-warning,
#wemd .callout-caution {
  border-top-color: #8b4c3b;
  background: #f6eeeb;
}

#wemd .callout-title {
  margin-bottom: 8px;
  color: #2b2927;
  font-weight: 700;
}

#wemd .callout p {
  margin: 0;
  color: #5e5751;
  font-size: 15px;
}

#wemd .footnote-word,
#wemd .footnote-ref {
  color: #80503f;
  font-weight: 700;
}

#wemd .footnotes-sep {
  margin-top: 57px;
  padding-top: 18px;
  border-top: 1px solid #2b2927;
}

#wemd .footnote-item {
  display: flex;
  max-width: 40em;
  margin: 10px auto 0;
}

#wemd .footnote-num {
  width: 30px;
  flex-shrink: 0;
  color: #80503f;
}

#wemd .footnote-item p {
  margin: 0;
  color: #77706a;
  font-size: 13px;
  text-align: left;
}

#wemd .block-equation {
  display: block;
  margin: 38px 0;
  padding: 20px 10px;
  border-top: 1px solid #bbb6b1;
  border-bottom: 1px solid #bbb6b1;
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
  padding: 22px 10px;
  border: 1px solid #aaa49f;
  border-top: 4px solid #2b2927;
  background: #ffffff;
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
  accent-color: #2b2927;
  pointer-events: none;
}
`;
