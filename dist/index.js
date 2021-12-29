const t="area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr".split(","),e="area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr".split(","),s="address,article,aside,blockquote,dd,div,dl,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ol,p,pre,section,table,ul".split(","),n={img:"image",video:"video",a:"link"},i=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,r=/^<\/([-A-Za-z0-9_]+)[^>]*>/,o=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/)>/,a=/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,l=[[/<\?xml.*\?>\n/,""],[/<.*!doctype.*\>\n/,""],[/<.*!DOCTYPE.*\>\n/,""],[/<!--.*?-->/gi,""],[/\/\*.*?\*\//gi,""]],c={lt:"<",gt:">",quot:'"',apos:"'",ensp:" ",emsp:" ",nbsp:" ",semi:";",ndash:"–",mdash:"—",middot:"·",lsquo:"‘",rsquo:"’",ldquo:"“",rdquo:"”",bull:"•",hellip:"…"};class u{config;constructor(t,e){return this.config=e||{},t?this.steps(t):[]}steps(t){const e=this.cleanHtml(t),s=this.htmlToJson(e);return this.jsonToSkeleton(s)}cleanHtml(t){return t?(l.forEach((e=>{const[s,n]=e;t=t.replace(s,n)})),t):""}decodeHtml(t){if(!t)return"";let e=t.indexOf("&");for(;-1!==e;){const s=t.indexOf(";",e+3);let n;if(-1===s)break;"#"===t[e+1]?(n=parseInt(("x"===t[e+2]?"0":"")+t.substring(e+2,s)),isNaN(n)||(t=t.substr(0,e)+String.fromCharCode(n)+t.substr(s+1))):(n=t.substring(e+1,s),c[n]&&(t=t.substr(0,e)+(c[n]||"&")+t.substr(s+1))),e=t.indexOf("&",e+1)}return t}isInvalidElement(e){const{ignoredElement:s=t}=this.config;return s.includes(e)}isSelfClosingElement(t,s){return o.test(t)||e.includes(s)}formatElementName(t){const{transMap:e=n}=this.config;return t in e?e[t]:"view"}attributeProcessor(t,e){const{format:s={},decodeAttributeValue:n=!0}=this.config;if(n&&Object.keys(t).forEach((e=>{"string"==typeof t[e]&&(t[e]=this.decodeHtml(t[e]))})),s[e]){const n=s[e];Object.keys(n).forEach((e=>{const s=n[e];t[e]="function"==typeof s?s(t[e],t):s}))}return t}formatAttributes(t,e){if(!t)return{};let s={};return t.replace(a,(function(t,e,n){const i=Array.prototype.slice.call(arguments);if(i.length>=3){const t=n?n.replace(/(^|[^\\])"/g,'$1\\"'):"";if("style"===e){const t=n.split(";"),e={};t.forEach((t=>{if(!t)return;const[s,n=""]=t.split(":");e[s]=n.trim()})),s.styleObj=e}s[e]=t}return""})),this.attributeProcessor(s,e)}updateHtmlStr(t,e){return t.substring(e.length)}htmlToJson(t){const n=[];for(;t;){if(0===t.indexOf("</")){const s=t.match(r);if(!s)continue;const[i,o]=s,a=this.updateHtmlStr(t,i);if(this.isInvalidElement(o)){t=a;continue}t=a;const l=e.includes(o);n.push({type:l?"selfClosing":"end",name:this.formatElementName(o),originName:o});continue}if(0===t.indexOf("<")){const e=t.match(i);if(!e)continue;const[r,o,a=""]=e,l=this.updateHtmlStr(t,r);if(this.isInvalidElement(o)){t=l;continue}t=l;const c=this.isSelfClosingElement(r,o),u=this.formatAttributes(a,o);let f=s.includes(o)?"block":"inline";const d=u.styleObj;if(d){const{display:t}=d;t&&(f=t)}n.push({type:c?"selfClosing":"start",name:this.formatElementName(o),originName:o,attrs:u,display:f});continue}const o=t.indexOf("<"),a=o<0;let l=a?t:t.substring(0,o);t=a?"":t.substring(o),n.push({type:"text",name:"text",originName:"text",display:"inline",attrs:this.attributeProcessor({content:l},"text")})}return n}skeletonGenerator(t,e=0){if(t.length<=0)return[];let s=0;const n=[];for(;s<t.length;){const{genKey:i,type:r,...o}=t[s],a=`${e}_${s}_${o.name}`,l=["start","end"].includes(r)?"default":r;if("start"===r){const e=t.findIndex((({type:t,genKey:e})=>"end"===t&&e===i));if(-1===e)break;n.push({id:a,...o,type:l,children:this.skeletonGenerator(t.slice(s+1,e),s)}),s=e+1}else n.push({id:a,...o,type:l}),s++}return n}jsonToSkeleton(t){const e=[];return t.forEach(((t,s)=>{const{type:n}=t;switch(n){case"start":t.genKey=s,e.push(s);break;case"end":const n=e.splice(e.length-1,1)[0];t.genKey=n}})),this.skeletonGenerator(t)}}export{u as MiniParser,t as defaultIgnoreElements,n as defaultTransMap};
