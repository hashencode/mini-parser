import { ObjType, HtmlOnlyType } from "./types";

// 默认额外数据
export const defaultExtraData = { containerWidth: 0 };

// 不合规元素
const defaultIgnoreElementString =
  "area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr";
export const defaultIgnoreElements = defaultIgnoreElementString.split(",");

// 自闭合标签
const selfClosingElementString =
  "area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr";
export const selfClosingElements = selfClosingElementString.split(",");

// 块级元素标签
const blockElementString =
  "address,article,aside,blockquote,dd,div,dl,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ol,p,pre,section,table,ul";
export const blockElements = blockElementString.split(",");

// 默认元素转换对应表
export const defaultTransMap = {
  img: "image",
  video: "video",
  a: "link",
};

// 起始标签正则
export const startElementRegexp =
  /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;

// 结束标签正则
export const endElementRegexp = /^<\/([-A-Za-z0-9_]+)[^>]*>/;

// 自闭合标签正则
export const selfClosingElementRegexp =
  /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/)>/;

// 获取属性正则
export const attributeRegexp =
  /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

// html专属元素正则
export const htmlOnlyRegexp: HtmlOnlyType = [
  [/<\?xml.*\?>\n/, ""],
  [/<.*!doctype.*\>\n/, ""],
  [/<.*!DOCTYPE.*\>\n/, ""],
  [/<!--.*?-->/gi, ""],
  [/\/\*.*?\*\//gi, ""],
];

// 获取行内元素值正则
export const styleWidthValueRegexp = /(\d*\.?\d*)(.*)/;

// 转义字典
export const decodeMap: ObjType = {
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  ensp: "\u2002",
  emsp: "\u2003",
  nbsp: "\xA0",
  semi: ";",
  ndash: "–",
  mdash: "—",
  middot: "·",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  bull: "•",
  hellip: "…",
  amp: "&",
};
