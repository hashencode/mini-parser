import {
  endElementRegexp,
  decodeRegexp,
  startElementRegexp,
  attributeRegexp,
  selfClosingRegexp,
  selfClosingElementsMap,
  AttrsMapType,
  JsonDataType,
  ConfigType,
  defaultConfig,
} from "./const";

export default class MiniParser {
  private readonly config;
  constructor(htmlStr: string, config?: ConfigType) {
    this.config = config ? { defaultConfig, ...config } : defaultConfig;
    setTimeout(this.steps(htmlStr), this.config.delay);
  }

  // 处理步骤
  steps(htmlStr: string) {
    const decodedHtml = this.decodeHtml(htmlStr);
    const jsonData = this.htmlToJson(decodedHtml);
    return this.jsonToSkeleton(jsonData);
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
    let attrsMap: AttrsMapType = {};
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
    let { formatAttributes, config } = this;
    const { timeout } = config;
    const jsonData = [];
    const maxTime = Date.now() + timeout;

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
  skeletonGenerator(jsonData: JsonDataType, parentId = 0): any {
    if (jsonData.length <= 0) return [];
    let count = 0;
    const skeleton = [];
    while (count < jsonData.length) {
      const current = jsonData[count];
      const id = `${parentId}-${count}-${current.type}`;

      if (current.type === "start") {
        // 通过起始标签的genKey去寻找对应的闭合标签
        const endElementIndex = jsonData.findIndex(
          ({ type, genKey }) => type === "end" && genKey === current.genKey
        );
        skeleton.push({
          id,
          ...current,
          children: this.skeletonGenerator(
            jsonData.slice(count + 1, endElementIndex),
            count
          ),
        });
        count = endElementIndex + 1;
      } else {
        skeleton.push({ id, ...current });
        count++;
      }
    }

    return skeleton;
  }

  // json数据转结构数据
  jsonToSkeleton(jsonData: JsonDataType) {
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

    return this.skeletonGenerator(jsonData);
  }
}
