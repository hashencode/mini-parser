import {
  endElementRegexp,
  decodeRegexp,
  startElementRegexp,
  attributeRegexp,
  selfClosingRegexp,
  selfClosingElementsMap,
  defaultConfig,
  formatElementRules,
  needFormatNameElements,
} from "./const";
import {
  AttrsMapType,
  JsonDataType,
  ConfigType,
  validElementName,
} from "./types";

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
  formatAttributes(str: string, elementName: validElementName) {
    if (!str) return {};
    const { attributeProcessor } = this;
    let attrsMap: AttrsMapType = {};
    str.replace(
      attributeRegexp,
      function (_match, name: string, value: string) {
        const args = Array.prototype.slice.call(arguments);
        if (args.length >= 3) {
          const attrValue = value.replace(/(^|[^\\])"/g, '$1\\"');
          attrsMap[name] = attributeProcessor(name, attrValue, elementName);
        }
        return "";
      }
    );

    // 追加小程序元素的内置属性
    let buildInAttrs = {};
    const current = this.config[elementName];
    if ("buildInAttrs" in current) {
      buildInAttrs = current.buildInAttrs;
    }
    return { attrsMap, ...buildInAttrs };
  }

  // 根据配置项处理属性
  attributeProcessor(
    attrName: string,
    attrValue: string,
    elementName: validElementName
  ): string {
    const config: any = this.config[elementName];

    // 如果属性值需要被清理
    if ("clearAttrs" in config && config.clearAttrs.includes(elementName)) {
      attrValue = "";
    }

    // 根据属性的类型进行处理
    switch (attrName) {
      case "src":
        if (["image", "video"].includes(attrName)) {
          const { srcFormat } = config[elementName];
          return srcFormat ? srcFormat(attrValue) : attrValue;
        }
        return attrValue;
      case "class":
        const { defaultClass } = config;
        return defaultClass ? `${defaultClass} ${attrValue}` : attrValue;
    }

    return attrValue;
  }

  // 将元素名进行转换
  formatElementName(name: string): validElementName {
    if (needFormatNameElements.includes(name)) return formatElementRules[name];
    return "view";
  }

  // 解析html字符串并转为json结构
  htmlToJson(decodedHtml: string) {
    const { timeout, ignoredElement } = this.config;
    const jsonData = [];
    const maxTime = Date.now() + timeout;

    while (decodedHtml) {
      // 如果是结束标签
      if (decodedHtml.indexOf("</") === 0) {
        const match = decodedHtml.match(endElementRegexp);
        if (!match) continue;
        const [str, name] = match;
        // 判断是否在是存在于ignoredElement中的指定忽略的元素
        const ignore = ignoredElement.includes(name);
        if (ignore) continue;
        // 去掉当前解析的字符
        decodedHtml = decodedHtml.substring(str.length);
        // 将当前数据追加到数组
        jsonData.push({
          type: "end",
          name: this.formatElementName(name),
          originName: name,
        });
        continue;
      }

      // 如果是起始标签
      if (decodedHtml.indexOf("<") === 0) {
        const match = decodedHtml.match(startElementRegexp);
        if (!match) continue;
        // 如果是起始标签，需要额外考虑属性
        const [str, name, attrs = ""] = match;
        // 判断是否在是存在于ignoredElement中的指定忽略的元素
        const ignore = ignoredElement.includes(name);
        if (ignore) continue;
        // 去掉当前解析的字符
        decodedHtml = decodedHtml.substring(str.length);
        // 判断是否是自闭合标签
        const selfClosing =
          selfClosingRegexp.test(str) || selfClosingElementsMap.includes(name);
        // 转换后的元素名
        const elementName = this.formatElementName(name);
        jsonData.push({
          type: selfClosing ? "selfClosing" : "start",
          name: elementName,
          originName: name,
          attrs: this.formatAttributes(attrs, elementName),
        });
        continue;
      }

      // 寻找<符号，将之前的字符视为文字
      const index = decodedHtml.indexOf("<");
      const isExist = index < 0;
      let text = isExist ? decodedHtml : decodedHtml.substring(0, index);
      text = text.trim();
      // 允许使用配置项的文字转换函数
      const { textFormat } = this.config.text;
      if (textFormat) text = textFormat(text);
      decodedHtml = isExist ? "" : decodedHtml.substring(index);
      jsonData.push({
        type: "text",
        name: "text",
        text,
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
      const miniParserId = `${parentId}-${count}-${current.type}`;

      if (current.type === "start") {
        // 通过起始标签的genKey去寻找对应的闭合标签
        const endElementIndex = jsonData.findIndex(
          ({ type, genKey }) => type === "end" && genKey === current.genKey
        );
        skeleton.push({
          miniParserId,
          ...current,
          children: this.skeletonGenerator(
            jsonData.slice(count + 1, endElementIndex),
            count
          ),
        });
        count = endElementIndex + 1;
      } else {
        skeleton.push({ miniParserId, ...current });
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
