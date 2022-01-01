// 从容器传入的数据类型
export interface extraDataType {
  containerWidth: number;
}

// 构造函数参数类型
export interface ConstructorType {
  config?: ConfigType;
  extraData?: extraDataType;
  html: string;
}

// 元素属性类型
export interface AttrsMapType {
  [key: string]: string | boolean | object | StyleObjType;
}

// 行内样式对象类型
export interface StyleObjType {
  [key: string]: string;
}

// 转义字典类型
export interface DecodeMapType {
  [key: string]: string;
}

// html专属元素正则类型
export type HtmlOnlyType = [RegExp, string][];

// 转换后的数据结构
export type JsonDataType = {
  attrs?: AttrsMapType;
  children?: JsonDataType;
  display?: string;
  genKey?: number;
  name: string;
  originName: string;
  type: string;
}[];

// 配置项
export type ConfigType = {
  adaptive?: boolean; // 自适应
  decodeAttributeValue?: boolean; // 对属性值进行反转义
  format?: { [key: string]: { [key: string]: any } }; // 属性格式化
  ignoredElement?: string[]; // 忽略解析的元素类型
  transMap?: { [key: string]: string }; // 元素转换对应表
};
