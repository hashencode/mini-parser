export interface AttrsMapType {
  [key: string]: string | boolean;
}

// 转换后的数据结构
export type JsonDataType = {
  type: string;
  name: string;
  originName?: string;
  attrs?: AttrsMapType;
  display?: string;
  genKey?: number;
  children?: JsonDataType[];
}[];

// 配置中出现的元素名
export type validElementName = "image" | "video" | "text" | "view" | "link";

// 公用配置项
export interface ElementConfig {
  validAttrs?: string[]; // 不在数组内的属性不会被解析
  overwriteAttrs?: { [key: string]: any }; // 覆写原属性
  format?: { [key: string]: (data: string) => string }; // 自定义属性格式化方法
}

// 解析错误信息
export interface ParserErrorEvent {
  message: string;
  code: number;
}

export type ConfigType = {
  [key in validElementName]?: ElementConfig;
} & {
  timeout?: number; // 解析超时毫秒数，1000
  ignoredElement?: string[]; // 忽略解析的元素类型，[]
  delay?: number; // 延迟解析毫秒数，0
  onError?: (msg: ParserErrorEvent) => any;
};
