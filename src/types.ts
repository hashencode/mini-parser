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

// 配置项
export type ConfigType = {
  ignoredElement?: string[]; // 忽略解析的元素类型，[]
  format?: { [key: string]: { [key: string]: any } }; // 属性格式化
  transMap?: { [key: string]: string }; // 元素转换对应表
  onError?: (msg: ParserErrorEvent) => any; // 错误回调
};

// 错误类型
export type ErrorType = "htmlToJson" | "closure";

// 解析错误信息
export interface ParserErrorEvent {
  message: string;
  code: number;
}
