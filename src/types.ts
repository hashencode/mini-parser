// 从容器传入的数据类型
export interface extraDataType {
  containerWidth: number;
}

// 构造函数参数类型
export interface ConstructorType {
  config?: ConfigType; // 配置参数
  extraData?: extraDataType; // 额外参数，包含外部容器宽度（containerWidth）
  html: string; // 富文本字符串
}

// 元素属性类型
export interface AttrsMapType {
  style?: string;
  styleObj?: ObjType;
  [key: string]: any;
}

// 默认对象类型
export interface ObjType {
  [key: string]: string;
}

// html专属元素正则类型
export type HtmlOnlyType = [RegExp, string][];

// 转换后的数据结构
export interface JsonDataTypeDev extends JsonDataType {
  genKey?: number;
  type: string;
}

export type JsonDataType = {
  attrs?: AttrsMapType;
  children?: JsonDataType[];
  display?: string;
  name: string;
};

// 配置项
export type ConfigType = {
  adaptive?: boolean; // 图片自适应
  autoFix?: boolean; // 自动修复常见问题
  format?: { [key: string]: { [key: string]: any } }; // 属性格式化
  ignoredElement?: string[]; // 忽略解析的元素类型
};
