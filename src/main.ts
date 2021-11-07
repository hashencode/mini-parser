import {
  endElementRegexp,
  decodeRegexp,
  startElementRegexp,
  attributeRegexp,
} from "./const";

export default class MiniParser {
  constructor(htmlStr: string) {
    const decodedHtml = this.decodeHtml(htmlStr);
    const jsonData = this.htmlToJson(decodedHtml);
    this.jsonToSkeleton(jsonData);
  }

  // 格式化html字符串
  decodeHtml(htmlStr: string) {
    decodeRegexp.forEach((item) => {
      const [_regexp, replacement] = item;
      htmlStr = htmlStr.replace(_regexp, replacement);
    });
    return htmlStr;
  }

  // 将属性字符串转为对象
  formatAttributes(str: string) {
    let attrsMap: { [key: string]: string } = {};
    str.replace(
      attributeRegexp,
      function (_match, name: string, value: string) {
        const args = Array.prototype.slice.call(arguments);
        if (args.length >= 3) {
          attrsMap[name] = value.replace(/(^|[^\\])"/g, '$1\\"');
        }
        return "";
      }
    );
    return attrsMap;
  }

  // 解析html字符串并转为json结构
  htmlToJson(decodedHtml: string) {
    let {  formatAttributes } = this;
    const jsonData = [];
    const maxTime = Date.now() + 1000;

    while (decodedHtml) {
      // 如果是结束标签
      if (decodedHtml.indexOf("</") === 0) {
        const match = decodedHtml.match(endElementRegexp);
        if (!match) continue;
        const [str, name] = match;
        // 去掉当前解析的字符
        decodedHtml = decodedHtml.substring(str.length);
        // 将当前数据追加到数组
        jsonData.push({ type: "end", name });
        continue;
      }

      // 如果是起始标签
      if (decodedHtml.indexOf("<") === 0) {
        const match = decodedHtml.match(startElementRegexp);
        if (!match) continue;
        // 如果是起始标签，需要额外考虑属性
        const [str, name, attrs = ""] = match;
        decodedHtml = decodedHtml.substring(str.length);
        jsonData.push({
          type: "start",
          name,
          attrs: formatAttributes(attrs),
        });
        continue;
      }

      // 寻找<符号，将之前的字符视为文字
      const index = decodedHtml.indexOf("<");
      const isExist = index < 0;
      const text = isExist ? decodedHtml : decodedHtml.substring(0, index);
      decodedHtml = isExist ? "" : decodedHtml.substring(index);
      jsonData.push({ type: "text", name: "text", text });

      // 防止超时阻碍进程
      if (Date.now() >= maxTime) break;
    }

    return jsonData;
  }

  jsonToSkeleton(jsonData:any[]) {
    console.log(jsonData);
  }
}
