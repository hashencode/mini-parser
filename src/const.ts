import { ConfigType, validElementName } from "./types";

// 不合规元素
const defaultIgnoreElements =
  "area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr";
export const defaultIgnoreElementsMap = defaultIgnoreElements.split(",");

// 自闭合标签
const selfClosingElements =
  "area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr";
export const selfClosingElementsMap = selfClosingElements.split(",");

// 块级元素标签
const blockElements =
  "address,article,aside,blockquote,dd,div,dl,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ol,p,pre,section,table,ul";
export const blockElementsMap = blockElements.split(",");

// 元素名称转换规则
export const formatElementRules: { [key: string]: validElementName } = {
  img: "image",
  video: "video",
  a: "link",
};

// 需要被转换的元素
export const needFormatNameElements = Object.keys(formatElementRules);

// 有src属性的元素
export const elementsHaveSrcAttr = ["image", "video"];

// 默认配置项
export const defaultConfig: ConfigType = {
  timeout: 2000,
  ignoredElement: defaultIgnoreElementsMap,
  delay: 0,
  image: {
    defaultClass: "mini-parser-image",
    clearAttrs: [],
    // 内置属性
    buildInAttrs: {
      mode: "widthFix",
      webp: true,
      lazyLoad: false,
      showMenu: false,
    },
  },
  text: {
    defaultClass: "mini-parser-text",
    // 内置属性
    buildInAttrs: {
      decode: false,
      userSelect: false,
    },
  },
  video: {
    defaultClass: "mini-parser-video",
    clearAttrs: [],
    // 内置属性
    buildInAttrs: {
      autoplay: false,
      controls: true,
      enablePlayGesture: false,
      enableProgressGesture: true,
      loop: false,
      muted: false,
      objectFit: "contain",
      playBtnPosition: "bottom",
      showCastingButton: false,
      showCenterPlayBtn: true,
      showFullscreenBtn: true,
      showMuteBtn: false,
      showPlayBtn: true,
      showProgress: true,
      vslideGesture: false,
      vslideGestureInFullscreen: true,
    },
  },
  view: {
    defaultClass: "mini-parser-view",
    clearAttrs: [],
  },
  link: {
    defaultClass: "mini-parser-link",
    clearAttrs: [],
  },
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

// 解码正则数组
export const decodeRegexp: [RegExp, string][] = [
  // 去除多余元素
  [/<\?xml.*\?>\n/, ""],
  [/<.*!doctype.*\>\n/, ""],
  [/<.*!DOCTYPE.*\>\n/, ""],
  [/\r?\n+/g, ""],
  [/<!--.*?-->/gi, ""],
  [/\/\*.*?\*\//gi, ""],
  [/[ ]+</gi, "<"],
  // 特殊数学符号
  [/&forall;/g, "∀"],
  [/&part;/g, "∂"],
  [/&exists;/g, "∃"],
  [/&empty;/g, "∅"],
  [/&nabla;/g, "∇"],
  [/&isin;/g, "∈"],
  [/&notin;/g, "∉"],
  [/&ni;/g, "∋"],
  [/&prod;/g, "∏"],
  [/&sum;/g, "∑"],
  [/&minus;/g, "−"],
  [/&lowast;/g, "∗"],
  [/&radic;/g, "√"],
  [/&prop;/g, "∝"],
  [/&infin;/g, "∞"],
  [/&ang;/g, "∠"],
  [/&and;/g, "∧"],
  [/&or;/g, "∨"],
  [/&cap;/g, "∩"],
  [/&cap;/g, "∪"],
  [/&int;/g, "∫"],
  [/&there4;/g, "∴"],
  [/&sim;/g, "∼"],
  [/&cong;/g, "≅"],
  [/&asymp;/g, "≈"],
  [/&ne;/g, "≠"],
  [/&le;/g, "≤"],
  [/&ge;/g, "≥"],
  [/&sub;/g, "⊂"],
  [/&sup;/g, "⊃"],
  [/&nsub;/g, "⊄"],
  [/&sube;/g, "⊆"],
  [/&supe;/g, "⊇"],
  [/&oplus;/g, "⊕"],
  [/&otimes;/g, "⊗"],
  [/&perp;/g, "⊥"],
  [/&sdot;/g, "⋅"],
  // 希腊字母
  [/&Alpha;/g, "Α"],
  [/&Beta;/g, "Β"],
  [/&Gamma;/g, "Γ"],
  [/&Delta;/g, "Δ"],
  [/&Epsilon;/g, "Ε"],
  [/&Zeta;/g, "Ζ"],
  [/&Eta;/g, "Η"],
  [/&Theta;/g, "Θ"],
  [/&Iota;/g, "Ι"],
  [/&Kappa;/g, "Κ"],
  [/&Lambda;/g, "Λ"],
  [/&Mu;/g, "Μ"],
  [/&Nu;/g, "Ν"],
  [/&Xi;/g, "Ν"],
  [/&Omicron;/g, "Ο"],
  [/&Pi;/g, "Π"],
  [/&Rho;/g, "Ρ"],
  [/&Sigma;/g, "Σ"],
  [/&Tau;/g, "Τ"],
  [/&Upsilon;/g, "Υ"],
  [/&Phi;/g, "Φ"],
  [/&Chi;/g, "Χ"],
  [/&Psi;/g, "Ψ"],
  [/&Omega;/g, "Ω"],
  [/&alpha;/g, "α"],
  [/&beta;/g, "β"],
  [/&gamma;/g, "γ"],
  [/&delta;/g, "δ"],
  [/&epsilon;/g, "ε"],
  [/&zeta;/g, "ζ"],
  [/&eta;/g, "η"],
  [/&theta;/g, "θ"],
  [/&iota;/g, "ι"],
  [/&kappa;/g, "κ"],
  [/&lambda;/g, "λ"],
  [/&mu;/g, "μ"],
  [/&nu;/g, "ν"],
  [/&xi;/g, "ξ"],
  [/&omicron;/g, "ο"],
  [/&pi;/g, "π"],
  [/&rho;/g, "ρ"],
  [/&sigmaf;/g, "ς"],
  [/&sigma;/g, "σ"],
  [/&tau;/g, "τ"],
  [/&upsilon;/g, "υ"],
  [/&phi;/g, "φ"],
  [/&chi;/g, "χ"],
  [/&psi;/g, "ψ"],
  [/&omega;/g, "ω"],
  [/&thetasym;/g, "ϑ"],
  [/&upsih;/g, "ϒ"],
  [/&piv;/g, "ϖ"],
  [/&middot;/g, "·"],
  // 转义字符
  [/&nbsp;/g, " "],
  [/&quot;/g, "'"],
  [/&amp;/g, "&"],
  [/&lt;/g, "<"],
  [/&gt;/g, ">"],
  [/&#8226;/g, "•"],
  // 特殊字符
  [/&OElig;/g, "Œ"],
  [/&oelig;/g, "œ"],
  [/&Scaron;/g, "Š"],
  [/&scaron;/g, "š"],
  [/&Yuml;/g, "Ÿ"],
  [/&fnof;/g, "ƒ"],
  [/&circ;/g, "ˆ"],
  [/&tilde;/g, "˜"],
  [/&ensp;/g, ""],
  [/&emsp;/g, ""],
  [/&thinsp;/g, ""],
  [/&zwnj;/g, ""],
  [/&zwj;/g, ""],
  [/&lrm;/g, ""],
  [/&rlm;/g, ""],
  [/&ndash;/g, "–"],
  [/&mdash;/g, "—"],
  [/&lsquo;/g, "‘"],
  [/&rsquo;/g, "’"],
  [/&sbquo;/g, "‚"],
  [/&ldquo;/g, "“"],
  [/&rdquo;/g, "”"],
  [/&bdquo;/g, "„"],
  [/&dagger;/g, "†"],
  [/&Dagger;/g, "‡"],
  [/&bull;/g, "•"],
  [/&hellip;/g, "…"],
  [/&permil;/g, "‰"],
  [/&prime;/g, "′"],
  [/&Prime;/g, "″"],
  [/&lsaquo;/g, "‹"],
  [/&rsaquo;/g, "›"],
  [/&oline;/g, "‾"],
  [/&euro;/g, "€"],
  [/&trade;/g, "™"],
  [/&larr;/g, "←"],
  [/&uarr;/g, "↑"],
  [/&rarr;/g, "→"],
  [/&darr;/g, "↓"],
  [/&harr;/g, "↔"],
  [/&crarr;/g, "↵"],
  [/&lceil;/g, "⌈"],
  [/&rceil;/g, "⌉"],
  [/&lfloor;/g, "⌊"],
  [/&rfloor;/g, "⌋"],
  [/&loz;/g, "◊"],
  [/&spades;/g, "♠"],
  [/&clubs;/g, "♣"],
  [/&hearts;/g, "♥"],
  [/&diams;/g, "♦"],
  [/&#39;/g, "'"],
  [/\r\n/g, ""],
  [/\n/g, ""],
];
