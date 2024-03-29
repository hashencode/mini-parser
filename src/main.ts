import {
  defaultExtraData,
  attributeRegexp,
  blockElements,
  decodeMap,
  defaultIgnoreElements,
  endElementRegexp,
  htmlOnlyRegexp,
  selfClosingElementRegexp,
  selfClosingElements,
  startElementRegexp,
  styleWidthValueRegexp,
} from "./const";
import {
  AttrsMapType,
  ConstructorType,
  JsonDataType,
  JsonDataTypeDev,
  ObjType,
} from "./types";

class MiniParser {
  private readonly config; // 配置信息
  private readonly extraData; // 额外参数
  private isPureText: boolean | undefined; // 纯文本无图片
  private memoryLeakTimer: null | number; // 防止内存溢出

  constructor({ html, config, extraData }: ConstructorType) {
    this.config = config || {};
    this.extraData = extraData || defaultExtraData;
    this.memoryLeakTimer = null;
    return html ? this.steps(html) : [];
  }

  // 处理步骤
  steps(html: string): any {
    const cleanHtml = this.cleanHtml(html);
    this.isPureText = !/<\s*img/g.test(cleanHtml);
    const jsonData = this.htmlToJson(cleanHtml);
    return this.jsonToSkeleton(jsonData);
  }

  cleanHtml(html: string): string {
    htmlOnlyRegexp.forEach((item) => {
      const [_regexp, replacement] = item;
      html = html.replace(_regexp, replacement);
    });
    return html;
  }

  // 替换被转义的字符串
  decodeHtml(html: string) {
    if (!html) return "";
    let index = html.indexOf("&");
    while (index !== -1) {
      const endIndex = html.indexOf(";", index + 3);
      let code;
      if (endIndex === -1) break;
      if (html[index + 1] === "#") {
        // &#123; 形式的实体
        code = parseInt(
          (html[index + 2] === "x" ? "0" : "") +
            html.substring(index + 2, endIndex)
        );
        if (!isNaN(code)) {
          html =
            html.substr(0, index) +
            String.fromCharCode(code) +
            html.substr(endIndex + 1);
        }
      } else {
        // &nbsp; 形式的实体
        code = html.substring(index + 1, endIndex);
        if (decodeMap[code]) {
          html =
            html.substr(0, index) +
            (decodeMap[code] || "&") +
            html.substr(endIndex + 1);
        }
      }
      index = html.indexOf("&", index + 1);
    }
    return html;
  }

  // 是否为合规元素
  isInvalidElement(name: string): boolean {
    const { ignoredElement = defaultIgnoreElements } = this.config;
    return ignoredElement.includes(name);
  }

  // 是否是自闭合标签
  isSelfClosingElement(str: string, name: string): boolean {
    return (
      selfClosingElementRegexp.test(str) || selfClosingElements.includes(name)
    );
  }

  // 根据配置项处理属性
  attributeProcessor(
    attrsMap: { [key: string]: any },
    elementName: string
  ): AttrsMapType {
    const { format = {} } = this.config;

    // 如果存在对应的格式化配置
    if (format[elementName]) {
      // 对应元素配置项
      const formatConfig = format[elementName];
      // 设置/调用每一个配置项
      Object.keys(formatConfig).forEach((item) => {
        const formatFactory = formatConfig[item];
        // 如果是配置项是函数，则调用，若为其他则直接赋值
        if (typeof formatFactory === "function") {
          attrsMap[item] = formatFactory(attrsMap[item], attrsMap);
        } else {
          attrsMap[item] = formatFactory;
        }
      });
    }
    return attrsMap;
  }

  // 处理样式属性
  styleProcessor(valueStr: string) {
    const styleArray = valueStr.split(";");
    const styleObj: { [key: string]: string } = {};
    const { adaptive = true } = this.config;
    const { containerWidth } = this.extraData;
    let scalingRatio = 0;

    styleArray.forEach((styleItem) => {
      if (!styleItem) return;
      const [styleKey, styleValue = ""] = styleItem.split(":");

      if (styleKey) {
        const keyStr = styleKey.trim();
        const valueStr = styleValue.trim();
        // 进行自适应需要获取到外层宽度
        if (adaptive && containerWidth) {
          let newValueStr = "";
          // 获取到数值和单位
          valueStr.replace(
            styleWidthValueRegexp,
            function (_match, digital, unit) {
              if (digital && !isNaN(digital) && unit === "px") {
                // 如果当前宽度小于容器宽度，则进行自适应处理
                if (keyStr === "width" && +digital > containerWidth) {
                  scalingRatio = containerWidth / +digital;
                  newValueStr = `${containerWidth}${unit}`;
                } else if (keyStr === "height" && scalingRatio > 0) {
                  // 如果存在宽度的缩放比例，则对高度进行缩放
                  newValueStr = `${digital * scalingRatio}${unit}`;
                }
              }
              return "";
            }
          );
          styleObj[keyStr] = newValueStr || valueStr;
        } else {
          styleObj[keyStr] = valueStr;
        }
      }
    });

    const styleStr = Object.keys(styleObj)
      .map((key) => `${key}:${styleObj[key]}`)
      .join(";");
    return { styleStr, styleObj };
  }

  // 将属性字符串转为对象
  formatAttributes(str: string, elementName: string): AttrsMapType {
    if (!str) return {};
    const that = this;

    // 正则匹配属性
    let attrsMap: AttrsMapType = {};
    str.replace(
      attributeRegexp,
      function (_match, name: string, value: string) {
        const args = Array.prototype.slice.call(arguments);
        if (args.length >= 3) {
          const attrValue = value
            ? that.decodeHtml(value).replace(/(^|[^\\])"/g, '$1\\"')
            : "";
          // 将属性值进行格式化，样式额外处理为对象
          const { styleObj, styleStr } = that.styleProcessor(attrValue);
          if (name === "style") {
            attrsMap.styleObj = styleObj;
            attrsMap[name] = styleStr;
          } else {
            attrsMap[name] = attrValue;
          }
        }
        return "";
      }
    );
    return this.attributeProcessor(attrsMap, elementName);
  }

  // 更新解析字符串
  updateHtmlStr(decodedHtml: string, str: string) {
    return decodedHtml.substring(str.length);
  }

  // 解析html字符串并转为json结构
  htmlToJson(decodedHtml: string) {
    const jsonData = [];
    // 记录当前时间戳
    this.memoryLeakTimer = Date.now();
    // html字符串历史
    let prevDecodedHtml = "";

    while (decodedHtml) {
      // 如果处理后的html字符串和上一次的html字符串一致，则说明进入了死循环
      if (decodedHtml === prevDecodedHtml) {
        console.error("invalid html string");
        return [];
      }else{
        prevDecodedHtml = decodedHtml;
      }
      // 处理超时，直接
      if (Date.now() - this.memoryLeakTimer >= 5000) {
        console.error("processing timeout");
        return [];
      }
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
        const selfClosing = selfClosingElements.includes(name);
        // 将当前数据追加到数组
        jsonData.push({
          type: selfClosing ? "selfClosing" : "end",
          name,
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
        // 获取属性
        const attrs = this.formatAttributes(attrString.replace(/ /g, ""), name);
        // 配置display属性
        let display = blockElements.includes(name) ? "block" : "inline";
        const styleObj = attrs.styleObj as ObjType;
        if (styleObj) {
          const { display: styleDisplay } = styleObj;
          if (styleDisplay) display = styleDisplay;
        }
        // 将当前数据追加到数组
        jsonData.push({
          type: selfClosing ? "selfClosing" : "start",
          name,
          attrs,
          display,
        });
        continue;
      }

      // 寻找<符号，将之前的字符视为文字
      const index = decodedHtml.indexOf("<");
      const isExist = index < 0;
      let content = isExist ? decodedHtml : decodedHtml.substring(0, index);
      content = this.decodeHtml(content);
      decodedHtml = isExist ? "" : decodedHtml.substring(index);
      jsonData.push({
        type: "text",
        name: "text",
        display: "inline",
        // 允许使用配置项的文字转换函数
        attrs: this.attributeProcessor({ content }, "text"),
      });
    }

    return jsonData;
  }

  // 当子元素含有图片标签时，将所有父级元素设置为块级元素
  transToBlock(skeleton: JsonDataType): boolean {
    const { name, display, attrs, children = [] } = skeleton;
    // 当前为图片标签或无子元素则返回
    if (name === "img") return true;
    if (children.length <= 0) return false;
    // 执行递归
    const hasImage = !!children.find((item) => this.transToBlock(item));
    // 如果存在图片子元素且当前元素是未设置宽度的非块级元素时
    if (
      hasImage &&
      display !== "block" &&
      attrs &&
      attrs.styleObj &&
      !("width" in attrs.styleObj)
    ) {
      skeleton.display = "block";
      attrs.styleObj.display = "block";
      attrs.style += ";display:block";
    }
    return hasImage;
  }

  // 自动修复常见问题
  autoFixer(skeleton: JsonDataType[]) {
    // 当没有图片元素时不执行
    if (!this.isPureText) {
      skeleton.forEach((skeletonItem) => {
        // 解决非块级元素内含有图片元素时图片宽度为0的问题
        this.transToBlock(skeletonItem);
      });
    }
  }

  // 结构数据生成器
  skeletonGenerator(jsonData: JsonDataTypeDev[], parentId = 0): JsonDataType[] {
    if (jsonData.length <= 0) return [];
    const { autoFix = true } = this.config;
    let count = 0;
    const skeleton = [];
    while (count < jsonData.length) {
      const { genKey, type, ...current } = jsonData[count];
      const { name } = current;
      const id = `${parentId}_${count}_${name}`;
      // 优化输出数据的type
      const newType = ["start", "end"].includes(type) ? "default" : type;
      // 通过起始标签的genKey去寻找对应的闭合标签
      if (type === "start") {
        const endElementIndex = jsonData.findIndex(
          ({ type, genKey: curGenKey }) =>
            type === "end" && curGenKey === genKey
        );
        // 如果找不到对应的闭合标签，则抛出错误并跳出循环
        if (endElementIndex === -1) break;
        // 如果找到对应的标签，则将两者间的元素作为其子元素
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

    if (autoFix) {
      this.autoFixer(skeleton);
    }

    return skeleton;
  }

  // json数据转结构数据
  jsonToSkeleton(jsonData: JsonDataTypeDev[]): JsonDataType[] {
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

export { MiniParser, defaultIgnoreElements };
