import {
  endElementRegexp,
  decodeRegexp,
  startElementRegexp,
  attributeRegexp,
  selfClosingElementsMap,
  defaultConfig,
  formatElementRules,
  needFormatNameElements,
  defaultIgnoreElementsMap,
  blockElementsMap,
  selfClosingElementRegexp,
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
    return htmlStr ? this.steps(htmlStr) : "";
  }

  // 处理步骤
  steps(htmlStr: string) {
    const decodedHtml = this.decodeHtml(htmlStr);
    const jsonData = this.htmlToJson(decodedHtml);
    return this.jsonToSkeleton(jsonData);
  }

  // 替换被转义的字符串
  decodeHtml(htmlStr: string) {
    if (!htmlStr) return "";
    decodeRegexp.forEach((item) => {
      const [_regexp, replacement] = item;
      htmlStr = htmlStr.replace(_regexp, replacement);
    });
    return htmlStr;
  }

  // 是否为合规元素
  isInvalidElement(name: string): boolean {
    const { ignoredElement } = this.config;
    return (
      defaultIgnoreElementsMap.includes(name) ||
      !!(ignoredElement && ignoredElement.includes(name))
    );
  }

  // 是否是自闭合标签
  isSelfClosingElement(str: string, name: string): boolean {
    return (
      selfClosingElementRegexp.test(str) ||
      selfClosingElementsMap.includes(name)
    );
  }

  // 将元素名进行转换
  formatElementName(name: string): validElementName {
    if (needFormatNameElements.includes(name)) return formatElementRules[name];
    return "view";
  }

  // 根据配置项处理属性
  attributeProcessor(
    attrName: string,
    attrValue: string,
    elementName: validElementName
  ) {
    if (elementName in this.config) {
      const { format = {}, validAttrs }: any = this.config[elementName];
      const isValid =
        Array.isArray(validAttrs) && validAttrs.includes(attrName);
      if (!validAttrs || isValid) {
        // 可用自定义处理方法进行格式化
        const handler = format[attrName];
        return handler ? handler(attrValue) : attrValue;
      }
      return "INVALID";
    }
    return attrValue;
  }

  // 将属性字符串转为对象
  formatAttributes(str: string, elementName: validElementName): AttrsMapType {
    if (!str) return {};
    const that = this;
    let attrsMap: AttrsMapType = {};
    str.replace(
      attributeRegexp,
      function (_match, name: string, value: string) {
        const args = Array.prototype.slice.call(arguments);
        if (args.length >= 3) {
          const attrValue = value ? value.replace(/(^|[^\\])"/g, '$1\\"') : "";
          // 将属性值进行格式化
          const formatValue = that.attributeProcessor(
            name,
            attrValue,
            elementName
          );
          // 剔除不必要的属性
          if (formatValue !== "INVALID") {
            attrsMap[name] = formatValue;
          }
        }
        return "";
      }
    );

    return attrsMap;
  }

  // 获取覆写属性
  getOverwriteAttrs(elementName: validElementName) {
    const elementConfig = this.config[elementName];
    if (elementConfig && elementConfig.overwriteAttrs) {
      return elementConfig.overwriteAttrs;
    }
    return {};
  }

  // 更新解析字符串
  updateHtmlStr(decodedHtml: string, str: string) {
    return decodedHtml.substring(str.length);
  }

  // 解析html字符串并转为json结构
  htmlToJson(decodedHtml: string) {
    const { timeout = 2000 } = this.config;
    const maxTime = Date.now() + timeout;
    const jsonData = [];

    while (decodedHtml) {
      // 如果是结束标签
      if (decodedHtml.indexOf("</") === 0) {
        const match = decodedHtml.match(endElementRegexp);
        if (!match) continue;
        const [str, name] = match;
        // 去除当前匹配字符串的新字符串
        const newStr = this.updateHtmlStr(decodedHtml, str);
        // 判断元素是否需要解析
        if (this.isInvalidElement(name)) {
          // 去掉当前解析的字符
          decodedHtml = newStr;
          continue;
        }
        decodedHtml = newStr;
        // 判断是否是自闭合标签
        const selfClosing = selfClosingElementsMap.includes(name);
        // 将当前数据追加到数组
        jsonData.push({
          type: selfClosing ? "selfClosing" : "end",
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
        const [str, name, attrString = ""] = match;
        // 去除当前匹配字符串的新字符串
        const newStr = this.updateHtmlStr(decodedHtml, str);
        // 判断元素是否需要解析
        if (this.isInvalidElement(name)) {
          // 去掉当前解析的字符
          decodedHtml = newStr;
          continue;
        }
        // 去掉当前解析的字符
        decodedHtml = newStr;
        // 判断是否是自闭合标签
        const selfClosing = this.isSelfClosingElement(str, name);
        // 转换后的元素名
        const elementName = this.formatElementName(name);
        // 获取属性
        const attrs = this.formatAttributes(attrString, elementName);
        // 获取覆写属性
        const overwriteAttrs = this.getOverwriteAttrs(elementName);
        // 配置display属性
        let display = blockElementsMap.includes(name) ? "block" : "inline";
        // 将当前数据追加到数组
        jsonData.push({
          type: selfClosing ? "selfClosing" : "start",
          name: elementName,
          originName: name,
          attrs: { ...attrs, ...overwriteAttrs },
          display,
        });
        continue;
      }

      // 寻找<符号，将之前的字符视为文字
      const index = decodedHtml.indexOf("<");
      const isExist = index < 0;
      let text = isExist ? decodedHtml : decodedHtml.substring(0, index);
      decodedHtml = isExist ? "" : decodedHtml.substring(index);
      jsonData.push({
        type: "text",
        name: "text",
        // 允许使用配置项的文字转换函数
        text: this.attributeProcessor("text", text, "text"),
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
      const id = `${parentId}_${count}_${current.name}`;
      // 优化输出数据的type
      const newType = ["start", "end"].includes(current.type)
        ? "default"
        : current.type;
      // 通过起始标签的genKey去寻找对应的闭合标签
      if (current.type === "start") {
        const endElementIndex = jsonData.findIndex(
          ({ type, genKey }) => type === "end" && genKey === current.genKey
        );
        skeleton.push({
          id,
          ...current,
          type: newType,
          children: this.skeletonGenerator(
            jsonData.slice(count + 1, endElementIndex),
            count
          ),
        });
        count = endElementIndex + 1;
      } else {
        skeleton.push({ id, ...current, type: newType });
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
