// 默认配置项
export const defaultConfig: ConfigType = {
  timeout: 2000,
  ignoredElement: [],
  delay: 0,
  image: {
    customComponent: undefined,
    defaultClass: "mini-parser-image",
    clearAttrs: [],
    // 特殊配置
    srcFormat: undefined,
    // 内置属性
    buildInAttrs: {
      mode: "widthFix",
      webp: true,
      lazyLoad: false,
      showMenu: false,
    },
  },
  text: {
    customComponent: undefined,
    defaultClass: "mini-parser-text",
    // 特殊配置
    textFormat: undefined,
    // 内置属性
    buildInAttrs: {
      decode: false,
      space: undefined,
      userSelect: false,
    },
  },
  video: {
    customComponent: undefined,
    defaultClass: "mini-parser-video",
    clearAttrs: [],
    // 特殊配置
    srcFormat: undefined,
    // 内置属性
    buildInAttrs: {
      autoplay: false,
      controls: true,
      direction: undefined,
      enablePlayGesture: false,
      enableProgressGesture: true,
      loop: false,
      muted: false,
      objectFit: "contain",
      playBtnPosition: "bottom",
      poster: undefined,
      showCastingButton: false,
      showCenterPlayBtn: true,
      showFullscreenBtn: true,
      showMuteBtn: false,
      showPlayBtn: true,
      showProgress: true,
      title: "",
      vslideGesture: false,
      vslideGestureInFullscreen: true,
    },
  },
  view: {
    customComponent: undefined,
    defaultClass: "mini-parser-view",
    clearAttrs: [],
  },
  link: {
    customComponent: undefined,
    defaultClass: "mini-parser-link",
    clearAttrs: [],
    // 特殊配置
    targetPage: undefined,
    onTap: undefined,
  },
};

// 需要被转换的元素的名称
export const needFormatNameElements = ["img", "video", "a"];

// 元素名称转换规则
export const formatElementRules: { [key: string]: validElementName } = {
  img: "image",
  video: "video",
  a: "link",
};

// 起始标签正则
export const startElementRegexp =
  /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;

// 结束标签正则
export const endElementRegexp = /^<\/([-A-Za-z0-9_]+)[^>]*>/;

// 自闭合标签匹配正则
export const selfClosingRegexp =
  /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\/>/;
const selfClosingElements =
  "area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr";
export const selfClosingElementsMap = selfClosingElements.split(",");

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

export interface AttrsMapType {
  [key: string]: string;
}

export type JsonDataType = {
  type: string;
  name: string;
  originName?: string;
  attrs?: { [key: string]: string };
  genKey?: number;
  children?: JsonDataType[];
}[];

// 配置中出现的元素名
export type validElementName = "image" | "video" | "text" | "view" | "link";

type ModeType =
  | "scaleToFill"
  | "aspectFit"
  | "aspectFill"
  | "widthFix"
  | "heightFix"
  | "top"
  | "bottom"
  | "center"
  | "left"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

export interface ImageConfig {
  customComponent?: string; // 自定义组件名，undefined
  clearAttrs?: boolean | string[]; // 需要被移除的属性，[]
  defaultClass?: string; // 默认类名，mini-parser-image
  // 特殊配置
  srcFormat?: (url: string) => string; // 自定义路径格式化方法，undefined
  // 内置属性
  buildInAttrs?: {
    lazyLoad?: boolean; // 是否懒加载，false
    mode?: ModeType; //裁剪、缩放模式，"widthFix"
    showMenu?: boolean; // 是否显示分享菜单，false
    webp?: boolean; // 是否支持webp格式，true
  };
}

export interface TextConfig {
  customComponent?: string; // 自定义组件名，undefined
  defaultClass?: string; // 默认类名，mini-parser-text
  // 特殊配置
  textFormat?: (text: string) => string; // 自定义文字格式化方法，undefined
  // 内置属性
  buildInAttrs?: {
    decode?: boolean; // 是否解码，false
    space?: "ensp" | "emsp" | "nbsp" | undefined; // 显示连续空格，undefined
    userSelect?: boolean; // 文本是否可选中，false
  };
}

export interface VideoConfig {
  customComponent?: string; // 自定义组件名，undefined
  clearAttrs?: boolean | string[]; // 需要被移除的属性，[]
  defaultClass?: string; // 默认类名，mini-parser-video
  // 特殊配置
  srcFormat?: (url: string) => string; // 自定义路径格式化方法，undefined
  // 内置属性
  buildInAttrs?: {
    autoplay?: boolean; // 自动播放，false
    controls?: boolean; // 显示播放控件，true
    direction?: 0 | 90 | -90; // 全屏时旋转方向，undefined
    enablePlayGesture?: boolean; // 开启播放手势，false
    enableProgressGesture?: boolean; // 支持进度手势，true
    loop?: boolean; // 循环播放，false
    muted?: boolean; // 静音，false
    objectFit?: "contain" | "fill" | "cover"; // 视频与容器大小不一致时的表现形式，contain
    playBtnPosition?: "bottom" | "center"; // 播放按钮位置，bottom
    poster?: string | ((attrs: AttrsMapType[]) => string); // 封面图片地址，undefined
    showCastingButton?: boolean; // 显示投屏按钮，false
    showCenterPlayBtn?: boolean; // 显示视频中间播放按钮，true
    showFullscreenBtn?: boolean; // 显示全屏按钮，true
    showMuteBtn?: boolean; // 显示静音按钮，false
    showPlayBtn?: boolean; // 显示底部控制栏播放按钮，true
    showProgress?: boolean; // 显示进度条，true
    title?: string | ((attrs: AttrsMapType[]) => string); // 视频标题，""
    vslideGesture?: boolean; // 非全屏下开启亮度和音量调节手势，false
    vslideGestureInFullscreen?: boolean; // 全屏下开启亮度和音量调节手势，true
  };
}

export interface ViewConfig {
  customComponent?: string; // 自定义组件名，undefined
  clearAttrs?: boolean | string[]; // 需要被移除的属性，[]
  defaultClass?: string; // 默认类名，mini-parser-view
}

export interface LinkConfig {
  customComponent?: string; // 自定义组件名，undefined
  clearAttrs?: boolean | string[]; // 需要被移除的属性，[]
  defaultClass?: string; // 默认类名，mini-parser-link
  // 特殊配置
  targetPage?: string; // 跳转小程序页面
  onTap?: (url: string) => void; // 链接点击事件回调
}

export interface ConfigType {
  timeout: number; // 解析超时毫秒数，1000
  ignoredElement: string[]; // 忽略解析的元素类型，[]
  delay: number; // 延迟解析毫秒数，0
  image: ImageConfig;
  text: TextConfig;
  video: VideoConfig;
  view: ViewConfig;
  link: LinkConfig;
}
