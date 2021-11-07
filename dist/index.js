
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
// 起始标签正则
const startElementRegexp = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
// 结束标签正则
const endElementRegexp = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
// 获取属性正则
const attributeRegexp = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
// 解码正则数组
const decodeRegexp = [
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

class MiniParser {
    constructor(htmlStr) {
        const decodedHtml = this.decodeHtml(htmlStr);
        const jsonData = this.htmlToJson(decodedHtml);
        this.jsonToSkeleton(jsonData);
    }
    // 格式化html字符串
    decodeHtml(htmlStr) {
        decodeRegexp.forEach((item) => {
            const [_regexp, replacement] = item;
            htmlStr = htmlStr.replace(_regexp, replacement);
        });
        return htmlStr;
    }
    // 转换html5标签为微信小程序标签
    transName(name) {
        switch (name) {
            case "img":
                return "image";
            default:
                return "view";
        }
    }
    // 将属性字符串转为对象
    formatAttributes(str) {
        let attrsMap = {};
        str.replace(attributeRegexp, function (_match, name, value) {
            const args = Array.prototype.slice.call(arguments);
            if (args.length >= 3) {
                attrsMap[name] = value.replace(/(^|[^\\])"/g, '$1\\"');
            }
            return "";
        });
        return attrsMap;
    }
    // 解析html字符串并转为json结构
    htmlToJson(decodedHtml) {
        let { transName, formatAttributes } = this;
        const skeleton = [];
        const maxTime = Date.now() + 1000;
        while (decodedHtml) {
            // 如果是闭合标签
            if (decodedHtml.indexOf("</") === 0) {
                const match = decodedHtml.match(endElementRegexp);
                if (!match)
                    continue;
                const [str, name] = match;
                // 去掉当前解析的字符
                decodedHtml = decodedHtml.substring(str.length);
                // 将当前数据追加到数组
                skeleton.push({ type: "end", name: transName(name) });
                continue;
            }
            // 如果是开头标签
            if (decodedHtml.indexOf("<") === 0) {
                const match = decodedHtml.match(startElementRegexp);
                if (!match)
                    continue;
                const [str, name, attrs = ""] = match;
                decodedHtml = decodedHtml.substring(str.length);
                skeleton.push({
                    type: "start",
                    name: transName(name),
                    attrs: formatAttributes(attrs),
                });
                continue;
            }
            // 寻找<符号，将之前的字符视为文字
            const index = decodedHtml.indexOf("<");
            const isExist = index < 0;
            const text = isExist ? decodedHtml : decodedHtml.substring(0, index);
            decodedHtml = isExist ? "" : decodedHtml.substring(index);
            skeleton.push({ type: "text", name: "text", text });
            // 防止超时阻碍进程
            if (Date.now() >= maxTime)
                break;
        }
        return skeleton;
    }
    jsonToSkeleton(jsonData) {
        console.log(jsonData);
    }
}

const htmlStr = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>miniParser</title>
</head>
<body>
    <p><img src="https://img1.dxycdn.com/2020/0707/961/8465402606288233243-68.jpg" style="white-space: normal;" /></p>
    </br>
</body>
</html>`;
new MiniParser(htmlStr);
//# sourceMappingURL=index.js.map
