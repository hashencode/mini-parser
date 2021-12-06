"use strict";const e="area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr".split(","),t="area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr".split(","),s="address,article,aside,blockquote,dd,div,dl,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ol,p,pre,section,table,ul".split(","),i={img:"image",video:"video",a:"link"},n=Object.keys(i),g=["image","video"],r={timeout:2e3,ignoredElement:e,delay:0,image:{defaultClass:"mini-parser-image",clearAttrs:[],buildInAttrs:{mode:"widthFix",webp:!0,lazyLoad:!1,showMenu:!1}},text:{defaultClass:"mini-parser-text",buildInAttrs:{decode:!1,userSelect:!1}},video:{defaultClass:"mini-parser-video",clearAttrs:[],buildInAttrs:{autoplay:!1,controls:!0,enablePlayGesture:!1,enableProgressGesture:!0,loop:!1,muted:!1,objectFit:"contain",playBtnPosition:"bottom",showCastingButton:!1,showCenterPlayBtn:!0,showFullscreenBtn:!0,showMuteBtn:!1,showPlayBtn:!0,showProgress:!0,vslideGesture:!1,vslideGestureInFullscreen:!0}},view:{defaultClass:"mini-parser-view",clearAttrs:[]},link:{defaultClass:"mini-parser-link",clearAttrs:[]}},a=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,o=/^<\/([-A-Za-z0-9_]+)[^>]*>/,l=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/)>/,c=/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,u=[[/<\?xml.*\?>\n/,""],[/<.*!doctype.*\>\n/,""],[/<.*!DOCTYPE.*\>\n/,""],[/\r?\n+/g,""],[/<!--.*?-->/gi,""],[/\/\*.*?\*\//gi,""],[/[ ]+</gi,"<"],[/&forall;/g,"∀"],[/&part;/g,"∂"],[/&exists;/g,"∃"],[/&empty;/g,"∅"],[/&nabla;/g,"∇"],[/&isin;/g,"∈"],[/&notin;/g,"∉"],[/&ni;/g,"∋"],[/&prod;/g,"∏"],[/&sum;/g,"∑"],[/&minus;/g,"−"],[/&lowast;/g,"∗"],[/&radic;/g,"√"],[/&prop;/g,"∝"],[/&infin;/g,"∞"],[/&ang;/g,"∠"],[/&and;/g,"∧"],[/&or;/g,"∨"],[/&cap;/g,"∩"],[/&cap;/g,"∪"],[/&int;/g,"∫"],[/&there4;/g,"∴"],[/&sim;/g,"∼"],[/&cong;/g,"≅"],[/&asymp;/g,"≈"],[/&ne;/g,"≠"],[/&le;/g,"≤"],[/&ge;/g,"≥"],[/&sub;/g,"⊂"],[/&sup;/g,"⊃"],[/&nsub;/g,"⊄"],[/&sube;/g,"⊆"],[/&supe;/g,"⊇"],[/&oplus;/g,"⊕"],[/&otimes;/g,"⊗"],[/&perp;/g,"⊥"],[/&sdot;/g,"⋅"],[/&Alpha;/g,"Α"],[/&Beta;/g,"Β"],[/&Gamma;/g,"Γ"],[/&Delta;/g,"Δ"],[/&Epsilon;/g,"Ε"],[/&Zeta;/g,"Ζ"],[/&Eta;/g,"Η"],[/&Theta;/g,"Θ"],[/&Iota;/g,"Ι"],[/&Kappa;/g,"Κ"],[/&Lambda;/g,"Λ"],[/&Mu;/g,"Μ"],[/&Nu;/g,"Ν"],[/&Xi;/g,"Ν"],[/&Omicron;/g,"Ο"],[/&Pi;/g,"Π"],[/&Rho;/g,"Ρ"],[/&Sigma;/g,"Σ"],[/&Tau;/g,"Τ"],[/&Upsilon;/g,"Υ"],[/&Phi;/g,"Φ"],[/&Chi;/g,"Χ"],[/&Psi;/g,"Ψ"],[/&Omega;/g,"Ω"],[/&alpha;/g,"α"],[/&beta;/g,"β"],[/&gamma;/g,"γ"],[/&delta;/g,"δ"],[/&epsilon;/g,"ε"],[/&zeta;/g,"ζ"],[/&eta;/g,"η"],[/&theta;/g,"θ"],[/&iota;/g,"ι"],[/&kappa;/g,"κ"],[/&lambda;/g,"λ"],[/&mu;/g,"μ"],[/&nu;/g,"ν"],[/&xi;/g,"ξ"],[/&omicron;/g,"ο"],[/&pi;/g,"π"],[/&rho;/g,"ρ"],[/&sigmaf;/g,"ς"],[/&sigma;/g,"σ"],[/&tau;/g,"τ"],[/&upsilon;/g,"υ"],[/&phi;/g,"φ"],[/&chi;/g,"χ"],[/&psi;/g,"ψ"],[/&omega;/g,"ω"],[/&thetasym;/g,"ϑ"],[/&upsih;/g,"ϒ"],[/&piv;/g,"ϖ"],[/&middot;/g,"·"],[/&nbsp;/g," "],[/&quot;/g,"'"],[/&amp;/g,"&"],[/&lt;/g,"<"],[/&gt;/g,">"],[/&#8226;/g,"•"],[/&OElig;/g,"Œ"],[/&oelig;/g,"œ"],[/&Scaron;/g,"Š"],[/&scaron;/g,"š"],[/&Yuml;/g,"Ÿ"],[/&fnof;/g,"ƒ"],[/&circ;/g,"ˆ"],[/&tilde;/g,"˜"],[/&ensp;/g,""],[/&emsp;/g,""],[/&thinsp;/g,""],[/&zwnj;/g,""],[/&zwj;/g,""],[/&lrm;/g,""],[/&rlm;/g,""],[/&ndash;/g,"–"],[/&mdash;/g,"—"],[/&lsquo;/g,"‘"],[/&rsquo;/g,"’"],[/&sbquo;/g,"‚"],[/&ldquo;/g,"“"],[/&rdquo;/g,"”"],[/&bdquo;/g,"„"],[/&dagger;/g,"†"],[/&Dagger;/g,"‡"],[/&bull;/g,"•"],[/&hellip;/g,"…"],[/&permil;/g,"‰"],[/&prime;/g,"′"],[/&Prime;/g,"″"],[/&lsaquo;/g,"‹"],[/&rsaquo;/g,"›"],[/&oline;/g,"‾"],[/&euro;/g,"€"],[/&trade;/g,"™"],[/&larr;/g,"←"],[/&uarr;/g,"↑"],[/&rarr;/g,"→"],[/&darr;/g,"↓"],[/&harr;/g,"↔"],[/&crarr;/g,"↵"],[/&lceil;/g,"⌈"],[/&rceil;/g,"⌉"],[/&lfloor;/g,"⌊"],[/&rfloor;/g,"⌋"],[/&loz;/g,"◊"],[/&spades;/g,"♠"],[/&clubs;/g,"♣"],[/&hearts;/g,"♥"],[/&diams;/g,"♦"],[/&#39;/g,"'"],[/\r\n/g,""],[/\n/g,""]];module.exports=class{config;constructor(e,t){return this.config=t?{defaultConfig:r,...t}:r,e?this.steps(e):""}steps(e){const t=this.decodeHtml(e),s=this.htmlToJson(t);return this.jsonToSkeleton(s)}decodeHtml(e){return e?(u.forEach((t=>{const[s,i]=t;e=e.replace(s,i)})),e):""}isInvalidElement(t){return e.includes(t)||this.config.ignoredElement.includes(t)}isSelfClosingElement(e,s){return l.test(e)||t.includes(s)}formatAttributes(e,t){if(!e)return{};const s=this;let i={};e.replace(c,(function(e,n,g){const r=Array.prototype.slice.call(arguments);if(r.length>=3){const e=g?g.replace(/(^|[^\\])"/g,'$1\\"'):"";i[n]=s.attributeProcessor(n,e,t)}return""}));let n={};const g=this.config[t];return"buildInAttrs"in g&&(n=g.buildInAttrs),{...i,...n}}attributeProcessor(e,t,s){const i=this.config[s];switch("clearAttrs"in i&&i.clearAttrs.includes(s)&&(t=""),e){case"src":if(g.includes(e)){const{srcFormat:e}=i[s];return e?e(t):t}return t;case"class":const{defaultClass:n}=i;return n?`${n} ${t}`:t}return t}formatElementName(e){return n.includes(e)?i[e]:"view"}updateHtmlStr(e,t){return e.substring(t.length)}htmlToJson(e){const i=Date.now()+this.config.timeout,n=[];for(;e;){if(0===e.indexOf("</")){const s=e.match(o);if(!s)continue;const[i,g]=s,r=this.updateHtmlStr(e,i);if(this.isInvalidElement(g)){e=r;continue}e=r;const a=t.includes(g);n.push({type:a?"selfClosing":"end",name:this.formatElementName(g),originName:g});continue}if(0===e.indexOf("<")){const t=e.match(a);if(!t)continue;const[i,g,r=""]=t,o=this.updateHtmlStr(e,i);if(this.isInvalidElement(g)){e=o;continue}e=o;const l=this.isSelfClosingElement(i,g),c=this.formatElementName(g),u=this.formatAttributes(r,c);let d=s.includes(g)?"block":"inline";n.push({type:l?"selfClosing":"start",name:c,originName:g,attrs:u,display:d});continue}const g=e.indexOf("<"),r=g<0;let l=r?e:e.substring(0,g);const{textFormat:c}=this.config.text;if(c&&(l=c(l)),e=r?"":e.substring(g),n.push({type:"text",name:"text",text:l,attrs:{class:this.config.text.defaultClass}}),Date.now()>=i)break}return n}skeletonGenerator(e,t=0){if(e.length<=0)return[];let s=0;const i=[];for(;s<e.length;){const n=e[s],g=`${t}_${s}_${n.name}`,r=["start","end"].includes(n.type)?"default":n.type;if("start"===n.type){const t=e.findIndex((({type:e,genKey:t})=>"end"===e&&t===n.genKey));i.push({id:g,...n,type:r,children:this.skeletonGenerator(e.slice(s+1,t),s)}),s=t+1}else i.push({id:g,...n,type:r}),s++}return i}jsonToSkeleton(e){const t=[];return e.forEach(((e,s)=>{const{type:i}=e;switch(i){case"start":e.genKey=s,t.push(s);break;case"end":const i=t.splice(t.length-1,1)[0];e.genKey=i}})),this.skeletonGenerator(e)}};
