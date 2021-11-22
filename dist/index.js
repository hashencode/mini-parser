"use strict";
const e = {
    timeout: 2e3,
    ignoredElement: [],
    delay: 0,
    link: { targetPage: void 0, onTap: void 0 },
    img: {
      customComponent: void 0,
      defaultClass: "mini-parser-image",
      defaultStyle: void 0,
      allowAttrs: ["src"],
      srcFormat: void 0,
      mode: "widthFix",
      webp: !0,
      lazyLoad: !1,
      showMenu: !1,
    },
    text: {
      customComponent: void 0,
      defaultClass: "mini-parser-text",
      defaultStyle: void 0,
      allowAttrs: [],
      textFormat: void 0,
      decode: !1,
      space: void 0,
      userSelect: !1,
    },
    video: {
      customComponent: void 0,
      defaultClass: "mini-parser-video",
      defaultStyle: void 0,
      allowAttrs: ["src"],
      srcFormat: void 0,
      autoplay: !1,
      controls: !0,
      direction: void 0,
      enablePlayGesture: !1,
      enableProgressGesture: !0,
      loop: !1,
      muted: !1,
      objectFit: "contain",
      playBtnPosition: "bottom",
      poster: void 0,
      showCastingButton: !1,
      showCenterPlayBtn: !0,
      showFullscreenBtn: !0,
      showMuteBtn: !1,
      showPlayBtn: !0,
      showProgress: !0,
      title: "",
      vslideGesture: !1,
      vslideGestureInFullscreen: !0,
    },
    view: {
      customComponent: void 0,
      defaultClass: "mini-parser-view",
      defaultStyle: void 0,
      allowAttrs: [],
    },
  },
  t =
    /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
  g = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
  s =
    /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\/>/,
  o =
    "area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr".split(
      ","
    ),
  n =
    /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
  a = [
    [/<\?xml.*\?>\n/, ""],
    [/<.*!doctype.*\>\n/, ""],
    [/<.*!DOCTYPE.*\>\n/, ""],
    [/\r?\n+/g, ""],
    [/<!--.*?-->/gi, ""],
    [/\/\*.*?\*\//gi, ""],
    [/[ ]+</gi, "<"],
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
    [/&nbsp;/g, " "],
    [/&quot;/g, "'"],
    [/&amp;/g, "&"],
    [/&lt;/g, "<"],
    [/&gt;/g, ">"],
    [/&#8226;/g, "•"],
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
module.exports = class {
  config;
  constructor(t, g) {
    (this.config = g ? { defaultConfig: e, ...g } : e),
      setTimeout(this.steps(t), this.config.delay);
  }
  steps(e) {
    const t = this.decodeHtml(e),
      g = this.htmlToJson(t);
    return this.jsonToSkeleton(g);
  }
  decodeHtml(e) {
    return (
      a.forEach((t) => {
        const [g, s] = t;
        e = e.replace(g, s);
      }),
      e
    );
  }
  formatAttributes(e) {
    let t = {};
    return (
      e.replace(n, function (e, g, s) {
        const o = Array.prototype.slice.call(arguments);
        return o.length >= 3 && (t[g] = s.replace(/(^|[^\\])"/g, '$1\\"')), "";
      }),
      t
    );
  }
  htmlToJson(e) {
    let { formatAttributes: n, config: a } = this;
    const { timeout: i } = a,
      r = [],
      l = Date.now() + i;
    for (; e; ) {
      if (0 === e.indexOf("</")) {
        const t = e.match(g);
        if (!t) continue;
        const [s, o] = t;
        (e = e.substring(s.length)), r.push({ type: "end", name: o });
        continue;
      }
      if (0 === e.indexOf("<")) {
        const g = e.match(t);
        if (!g) continue;
        const [a, i, l = ""] = g;
        e = e.substring(a.length);
        const u = s.test(a) || o.includes(i);
        r.push({ type: u ? "selfClosing" : "start", name: i, attrs: n(l) });
        continue;
      }
      const a = e.indexOf("<"),
        i = a < 0,
        u = i ? e : e.substring(0, a);
      if (
        ((e = i ? "" : e.substring(a)),
        r.push({ type: "text", name: "text", text: u.trim() }),
        Date.now() >= l)
      )
        break;
    }
    return r;
  }
  skeletonGenerator(e, t = 0) {
    if (e.length <= 0) return [];
    let g = 0;
    const s = [];
    for (; g < e.length; ) {
      const o = e[g],
        n = `${t}-${g}-${o.type}`;
      if ("start" === o.type) {
        const t = e.findIndex(
          ({ type: e, genKey: t }) => "end" === e && t === o.genKey
        );
        s.push({
          id: n,
          ...o,
          children: this.skeletonGenerator(e.slice(g + 1, t), g),
        }),
          (g = t + 1);
      } else s.push({ id: n, ...o }), g++;
    }
    return s;
  }
  jsonToSkeleton(e) {
    const t = [];
    return (
      e.forEach((e, g) => {
        const { type: s } = e;
        switch (s) {
          case "start":
            (e.genKey = g), t.push(g);
            break;
          case "end":
            const s = t.splice(t.length - 1, 1)[0];
            e.genKey = s;
        }
      }),
      this.skeletonGenerator(e)
    );
  }
};
