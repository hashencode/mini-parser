import {
  endElementRegexp,
  decodeRegexp,
  startElementRegexp,
  attributeRegexp,
  selfClosingRegexp,
  selfClosingElementsMap,
} from "./const";
import { attrsMapType, jsonDataType } from "./types";

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
    let attrsMap: attrsMapType = {};
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
    let { formatAttributes } = this;
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
        // 判断是否是自闭合标签
        const selfClosing =
          selfClosingRegexp.test(str) || selfClosingElementsMap.includes(name);
        jsonData.push({
          type: selfClosing ? "selfClosing" : "start",
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
      jsonData.push({
        type: "text",
        name: "text",
        text: text.trim(),
      });

      // 防止超时阻碍进程
      if (Date.now() >= maxTime) break;
    }

    return jsonData;
  }

  // 结构数据生成器
  skeletonGenerator(jsonData: jsonDataType) {
    if (jsonData.length <= 0) return [];
    jsonData.forEach((item, index) => {
      // 非起始标签一律直接返回
      if (item.type === "start" && "genKey" in item) {
        // 通过起始标签的genKey去寻找对应的闭合标签
        const endElementIndex = jsonData.findIndex(
          ({ type, genKey }) => type === "end" && genKey === item.genKey
        );
        console.log(endElementIndex);
        if (endElementIndex > -1) {
          console.log(jsonData);
          const children = jsonData.splice(index, endElementIndex);
          console.log(endElementIndex, children);
          // if (children.length > 0) {
          //   item["children"] = this.skeletonGenerator(children);
          // }
        }
      }
      // console.log(item);
      return item;
    });
  }

  // json数据转结构数据
  jsonToSkeleton(jsonData: jsonDataType) {
    const keyMap: number[] = [];

    // 对起始和闭合标签进行标注，便于梳理结构
    jsonData.forEach((item, index) => {
      const { type } = item;
      switch (type) {
        case "start":
          item["genKey"] = index;
          keyMap.push(index);
          break;
        case "end":
          const startKey = keyMap.splice(keyMap.length - 1, 1)[0];
          item["genKey"] = startKey;
          break;
      }
    });

    console.log(jsonData);
    const skeleton = this.skeletonGenerator(jsonData);
    console.log(skeleton);
  }
}
