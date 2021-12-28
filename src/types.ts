// 元素属性类型
export interface AttrsMapType {
  [key: string]: string | boolean | object;
}

// 转义字典类型
export interface decodeMapType {
  [key: string]: string;
}

// html专属元素正则类型
export type htmlOnlyType = [RegExp, string][];

// 转换后的数据结构
export type JsonDataType = {
  type: string;
  name: string;
  originName: string;
  attrs?: AttrsMapType;
  display?: string;
  genKey?: number;
  children?: JsonDataType[];
}[];

// 配置项
export type ConfigType = {
  ignoredElement?: string[]; // 忽略解析的元素类型，[]
  format?: { [key: string]: { [key: string]: any } }; // 属性格式化
  decodeAttributeValue?: boolean; // 对属性值进行格式化
  transMap?: { [key: string]: string }; // 元素转换对应表
};
