"use strict";const e="area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr".split(","),t="area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr".split(","),g="address,article,aside,blockquote,dd,div,dl,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ol,p,pre,section,table,ul".split(","),s={img:"image",video:"video",a:"link"},i=Object.keys(s),r={timeout:2e3,ignoredElement:e,delay:0},n=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,a=/^<\/([-A-Za-z0-9_]+)[^>]*>/,o=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/)>/,l=/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,c=[[/<\?xml.*\?>\n/,""],[/<.*!doctype.*\>\n/,""],[/<.*!DOCTYPE.*\>\n/,""],[/\r?\n+/g,""],[/<!--.*?-->/gi,""],[/\/\*.*?\*\//gi,""],[/[ ]+</gi,"<"],[/&forall;/g,"∀"],[/&part;/g,"∂"],[/&exists;/g,"∃"],[/&empty;/g,"∅"],[/&nabla;/g,"∇"],[/&isin;/g,"∈"],[/&notin;/g,"∉"],[/&ni;/g,"∋"],[/&prod;/g,"∏"],[/&sum;/g,"∑"],[/&minus;/g,"−"],[/&lowast;/g,"∗"],[/&radic;/g,"√"],[/&prop;/g,"∝"],[/&infin;/g,"∞"],[/&ang;/g,"∠"],[/&and;/g,"∧"],[/&or;/g,"∨"],[/&cap;/g,"∩"],[/&cap;/g,"∪"],[/&int;/g,"∫"],[/&there4;/g,"∴"],[/&sim;/g,"∼"],[/&cong;/g,"≅"],[/&asymp;/g,"≈"],[/&ne;/g,"≠"],[/&le;/g,"≤"],[/&ge;/g,"≥"],[/&sub;/g,"⊂"],[/&sup;/g,"⊃"],[/&nsub;/g,"⊄"],[/&sube;/g,"⊆"],[/&supe;/g,"⊇"],[/&oplus;/g,"⊕"],[/&otimes;/g,"⊗"],[/&perp;/g,"⊥"],[/&sdot;/g,"⋅"],[/&Alpha;/g,"Α"],[/&Beta;/g,"Β"],[/&Gamma;/g,"Γ"],[/&Delta;/g,"Δ"],[/&Epsilon;/g,"Ε"],[/&Zeta;/g,"Ζ"],[/&Eta;/g,"Η"],[/&Theta;/g,"Θ"],[/&Iota;/g,"Ι"],[/&Kappa;/g,"Κ"],[/&Lambda;/g,"Λ"],[/&Mu;/g,"Μ"],[/&Nu;/g,"Ν"],[/&Xi;/g,"Ν"],[/&Omicron;/g,"Ο"],[/&Pi;/g,"Π"],[/&Rho;/g,"Ρ"],[/&Sigma;/g,"Σ"],[/&Tau;/g,"Τ"],[/&Upsilon;/g,"Υ"],[/&Phi;/g,"Φ"],[/&Chi;/g,"Χ"],[/&Psi;/g,"Ψ"],[/&Omega;/g,"Ω"],[/&alpha;/g,"α"],[/&beta;/g,"β"],[/&gamma;/g,"γ"],[/&delta;/g,"δ"],[/&epsilon;/g,"ε"],[/&zeta;/g,"ζ"],[/&eta;/g,"η"],[/&theta;/g,"θ"],[/&iota;/g,"ι"],[/&kappa;/g,"κ"],[/&lambda;/g,"λ"],[/&mu;/g,"μ"],[/&nu;/g,"ν"],[/&xi;/g,"ξ"],[/&omicron;/g,"ο"],[/&pi;/g,"π"],[/&rho;/g,"ρ"],[/&sigmaf;/g,"ς"],[/&sigma;/g,"σ"],[/&tau;/g,"τ"],[/&upsilon;/g,"υ"],[/&phi;/g,"φ"],[/&chi;/g,"χ"],[/&psi;/g,"ψ"],[/&omega;/g,"ω"],[/&thetasym;/g,"ϑ"],[/&upsih;/g,"ϒ"],[/&piv;/g,"ϖ"],[/&middot;/g,"·"],[/&nbsp;/g," "],[/&quot;/g,"'"],[/&amp;/g,"&"],[/&lt;/g,"<"],[/&gt;/g,">"],[/&#8226;/g,"•"],[/&OElig;/g,"Œ"],[/&oelig;/g,"œ"],[/&Scaron;/g,"Š"],[/&scaron;/g,"š"],[/&Yuml;/g,"Ÿ"],[/&fnof;/g,"ƒ"],[/&circ;/g,"ˆ"],[/&tilde;/g,"˜"],[/&ensp;/g,""],[/&emsp;/g,""],[/&thinsp;/g,""],[/&zwnj;/g,""],[/&zwj;/g,""],[/&lrm;/g,""],[/&rlm;/g,""],[/&ndash;/g,"–"],[/&mdash;/g,"—"],[/&lsquo;/g,"‘"],[/&rsquo;/g,"’"],[/&sbquo;/g,"‚"],[/&ldquo;/g,"“"],[/&rdquo;/g,"”"],[/&bdquo;/g,"„"],[/&dagger;/g,"†"],[/&Dagger;/g,"‡"],[/&bull;/g,"•"],[/&hellip;/g,"…"],[/&permil;/g,"‰"],[/&prime;/g,"′"],[/&Prime;/g,"″"],[/&lsaquo;/g,"‹"],[/&rsaquo;/g,"›"],[/&oline;/g,"‾"],[/&euro;/g,"€"],[/&trade;/g,"™"],[/&larr;/g,"←"],[/&uarr;/g,"↑"],[/&rarr;/g,"→"],[/&darr;/g,"↓"],[/&harr;/g,"↔"],[/&crarr;/g,"↵"],[/&lceil;/g,"⌈"],[/&rceil;/g,"⌉"],[/&lfloor;/g,"⌊"],[/&rfloor;/g,"⌋"],[/&loz;/g,"◊"],[/&spades;/g,"♠"],[/&clubs;/g,"♣"],[/&hearts;/g,"♥"],[/&diams;/g,"♦"],[/&#39;/g,"'"],[/\r\n/g,""],[/\n/g,""]];module.exports=class{config;constructor(e,t){return this.config=t?{defaultConfig:r,...t}:r,e?this.steps(e):""}steps(e){const t=this.decodeHtml(e),g=this.htmlToJson(t);return this.jsonToSkeleton(g)}decodeHtml(e){return e?(c.forEach((t=>{const[g,s]=t;e=e.replace(g,s)})),e):""}isInvalidElement(t){const{ignoredElement:g}=this.config;return e.includes(t)||!(!g||!g.includes(t))}isSelfClosingElement(e,g){return o.test(e)||t.includes(g)}formatElementName(e){return i.includes(e)?s[e]:"view"}attributeProcessor(e,t,g){if(g in this.config){const{format:s={},validAttrs:i}=this.config[g],r=Array.isArray(i)&&i.includes(e);if(!i||r){const g=s[e];return g?g(t):t}return"INVALID"}return t}formatAttributes(e,t){if(!e)return{};const g=this;let s={};return e.replace(l,(function(e,i,r){const n=Array.prototype.slice.call(arguments);if(n.length>=3){const e=r?r.replace(/(^|[^\\])"/g,'$1\\"'):"",n=g.attributeProcessor(i,e,t);"INVALID"!==n&&(s[i]=n)}return""})),s}getOverwriteAttrs(e){const t=this.config[e];return t&&t.overwriteAttrs?t.overwriteAttrs:{}}updateHtmlStr(e,t){return e.substring(t.length)}htmlToJson(e){const{timeout:s=2e3}=this.config,i=Date.now()+s,r=[];for(;e;){if(0===e.indexOf("</")){const g=e.match(a);if(!g)continue;const[s,i]=g,n=this.updateHtmlStr(e,s);if(this.isInvalidElement(i)){e=n;continue}e=n;const o=t.includes(i);r.push({type:o?"selfClosing":"end",name:this.formatElementName(i),originName:i});continue}if(0===e.indexOf("<")){const t=e.match(n);if(!t)continue;const[s,i,a=""]=t,o=this.updateHtmlStr(e,s);if(this.isInvalidElement(i)){e=o;continue}e=o;const l=this.isSelfClosingElement(s,i),c=this.formatElementName(i),u=this.formatAttributes(a,c),m=this.getOverwriteAttrs(c);let p=g.includes(i)?"block":"inline";r.push({type:l?"selfClosing":"start",name:c,originName:i,attrs:{...u,...m},display:p});continue}const s=e.indexOf("<"),o=s<0;let l=o?e:e.substring(0,s);if(e=o?"":e.substring(s),r.push({type:"text",name:"text",text:this.attributeProcessor("text",l,"text")}),Date.now()>=i)break}return r}skeletonGenerator(e,t=0){if(e.length<=0)return[];let g=0;const s=[];for(;g<e.length;){const i=e[g],r=`${t}_${g}_${i.name}`,n=["start","end"].includes(i.type)?"default":i.type;if("start"===i.type){const t=e.findIndex((({type:e,genKey:t})=>"end"===e&&t===i.genKey));if(-1===t){const{onError:e}=this.config;e&&e({message:"can't find closure, please check html string.",code:0});break}s.push({id:r,...i,type:n,children:this.skeletonGenerator(e.slice(g+1,t),g)}),g=t+1}else s.push({id:r,...i,type:n}),g++}return s}jsonToSkeleton(e){const t=[];return e.forEach(((e,g)=>{const{type:s}=e;switch(s){case"start":e.genKey=g,t.push(g);break;case"end":const s=t.splice(t.length-1,1)[0];e.genKey=s}})),this.skeletonGenerator(e)}};
