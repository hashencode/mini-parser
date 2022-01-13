const t={containerWidth:0},e="area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr".split(","),s="area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr".split(","),n="address,article,aside,blockquote,dd,div,dl,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ol,p,pre,section,table,ul".split(","),r=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,i=/^<\/([-A-Za-z0-9_]+)[^>]*>/,o=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/)>/,a=/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,l=[[/<\?xml.*\?>\n/,""],[/<.*!doctype.*\>\n/,""],[/<.*!DOCTYPE.*\>\n/,""],[/<!--.*?-->/gi,""],[/\/\*.*?\*\//gi,""]],c=/(\d*\.?\d*)(.*)/,u={lt:"<",gt:">",quot:'"',apos:"'",ensp:" ",emsp:" ",nbsp:" ",semi:";",ndash:"–",mdash:"—",middot:"·",lsquo:"‘",rsquo:"’",ldquo:"“",rdquo:"”",bull:"•",hellip:"…",amp:"&"};class h{config;extraData;constructor({html:e,config:s,extraData:n}){return this.config=s||{},this.extraData=n||t,e?this.steps(e):[]}steps(t){const e=this.cleanHtml(t),s=this.htmlToJson(e);return this.jsonToSkeleton(s)}cleanHtml(t){return l.forEach((e=>{const[s,n]=e;t=t.replace(s,n)})),t}decodeHtml(t){if(!t)return"";let e=t.indexOf("&");for(;-1!==e;){const s=t.indexOf(";",e+3);let n;if(-1===s)break;"#"===t[e+1]?(n=parseInt(("x"===t[e+2]?"0":"")+t.substring(e+2,s)),isNaN(n)||(t=t.substr(0,e)+String.fromCharCode(n)+t.substr(s+1))):(n=t.substring(e+1,s),u[n]&&(t=t.substr(0,e)+(u[n]||"&")+t.substr(s+1))),e=t.indexOf("&",e+1)}return t}isInvalidElement(t){const{ignoredElement:s=e}=this.config;return s.includes(t)}isSelfClosingElement(t,e){return o.test(t)||s.includes(e)}attributeProcessor(t,e){const{format:s={}}=this.config;if(s[e]){const n=s[e];Object.keys(n).forEach((e=>{const s=n[e];t[e]="function"==typeof s?s(t[e],t):s}))}return t}styleProcessor(t){const e=t.split(";"),s={},{adaptive:n=!0}=this.config,{containerWidth:r}=this.extraData;let i=0;e.forEach((t=>{if(!t)return;const[e,o=""]=t.split(":");if(e){const t=e.trim(),a=o.trim();if(n&&r){let e="";a.replace(c,(function(s,n,o){return n&&!isNaN(n)&&"px"===o&&("width"===t&&+n>r?(i=r/+n,e=`${r}${o}`):"height"===t&&i>0&&(e=`${n*i}${o}`)),""})),s[t]=e||a}else s[t]=a}}));return{styleStr:Object.keys(s).map((t=>`${t}:${s[t]}`)).join(";"),styleObj:s}}formatAttributes(t,e){if(!t)return{};const s=this;let n={};return t.replace(a,(function(t,e,r){const i=Array.prototype.slice.call(arguments);if(i.length>=3){const t=r?s.decodeHtml(r).replace(/(^|[^\\])"/g,'$1\\"'):"",{styleObj:i,styleStr:o}=s.styleProcessor(t);"style"===e?(n.styleObj=i,n[e]=o):n[e]=t}return""})),this.attributeProcessor(n,e)}updateHtmlStr(t,e){return t.substring(e.length)}htmlToJson(t){const e=[];for(;t;){if(0===t.indexOf("</")){const n=t.match(i);if(!n)continue;const[r,o]=n,a=this.updateHtmlStr(t,r);if(this.isInvalidElement(o)){t=a;continue}t=a;const l=s.includes(o);e.push({type:l?"selfClosing":"end",name:o});continue}if(0===t.indexOf("<")){const s=t.match(r);if(!s)continue;const[i,o,a=""]=s,l=this.updateHtmlStr(t,i);if(this.isInvalidElement(o)){t=l;continue}t=l;const c=this.isSelfClosingElement(i,o),u=this.formatAttributes(a,o);let h=n.includes(o)?"block":"inline";const d=u.styleObj;if(d){const{display:t}=d;t&&(h=t)}e.push({type:c?"selfClosing":"start",name:o,attrs:u,display:h});continue}const o=t.indexOf("<"),a=o<0;let l=a?t:t.substring(0,o);l=this.decodeHtml(l),t=a?"":t.substring(o),e.push({type:"text",name:"text",display:"inline",attrs:this.attributeProcessor({content:l},"text")})}return e}skeletonGenerator(t,e=0){if(t.length<=0)return[];let s=0;const n=[];for(;s<t.length;){const{genKey:r,type:i,...o}=t[s],{name:a}=o,l=`${e}_${s}_${a}`,c=["start","end"].includes(i)?"default":i;if("start"===i){const e=t.findIndex((({type:t,genKey:e})=>"end"===t&&e===r));if(-1===e)break;n.push({id:l,...o,type:c,children:this.skeletonGenerator(t.slice(s+1,e),s)}),s=e+1}else n.push({id:l,...o,type:c}),s++}return n}jsonToSkeleton(t){const e=[];return t.forEach(((t,s)=>{const{type:n}=t;switch(n){case"start":t.genKey=s,e.push(s);break;case"end":const n=e.splice(e.length-1,1)[0];t.genKey=n}})),this.skeletonGenerator(t)}}export{h as MiniParser,e as defaultIgnoreElements};
