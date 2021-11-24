export interface AttrsMapType {
  [key: string]: string;
}

export type JsonDataType = {
  type: string;
  name: string;
  originName?: string;
  attrs?: { [key: string]: string };
  genKey?: number;
  children?: JsonDataType[];
}[];

// 配置中出现的元素名
export type validElementName = "image" | "video" | "text" | "view" | "link";

// 图片缩放模式可选值
type ModeType =
  | "scaleToFill"
  | "aspectFit"
  | "aspectFill"
  | "widthFix"
  | "heightFix"
  | "top"
  | "bottom"
  | "center"
  | "left"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

export interface CommonConfig {
  clearAttrs?: string[]; // 需要被移除的属性，[]
  defaultClass: string; // 默认类名，mini-parser-*
}

export interface ImageConfig extends CommonConfig {
  srcFormat?: (url: string) => string; // 自定义路径格式化方法
  // 内置属性
  buildInAttrs: {
    lazyLoad: boolean; // 是否懒加载，false
    mode: ModeType; //裁剪、缩放模式，"widthFix"
    showMenu: boolean; // 是否显示分享菜单，false
    webp: boolean; // 是否支持webp格式，true
  };
}

export interface TextConfig extends CommonConfig {
  textFormat?: (text: string) => string; // 自定义文字格式化方法
  // 内置属性
  buildInAttrs: {
    decode: boolean; // 是否解码，false
    space?: "ensp" | "emsp" | "nbsp"; // 显示连续空格
    userSelect: boolean; // 文本是否可选中，false
  };
}

export interface VideoConfig extends CommonConfig {
  srcFormat?: (url: string) => string; // 自定义路径格式化方法
  // 内置属性
  buildInAttrs: {
    autoplay: boolean; // 自动播放，false
    controls: boolean; // 显示播放控件，true
    direction?: 0 | 90 | -90; // 全屏时旋转方向
    enablePlayGesture: boolean; // 开启播放手势，false
    enableProgressGesture: boolean; // 支持进度手势，true
    loop: boolean; // 循环播放，false
    muted: boolean; // 静音，false
    objectFit: "contain" | "fill" | "cover"; // 视频与容器大小不一致时的表现形式，contain
    playBtnPosition: "bottom" | "center"; // 播放按钮位置，bottom
    poster?: string | ((attrs: AttrsMapType[]) => string); // 封面图片地址
    showCastingButton: boolean; // 显示投屏按钮，false
    showCenterPlayBtn: boolean; // 显示视频中间播放按钮，true
    showFullscreenBtn: boolean; // 显示全屏按钮，true
    showMuteBtn: boolean; // 显示静音按钮，false
    showPlayBtn: boolean; // 显示底部控制栏播放按钮，true
    showProgress: boolean; // 显示进度条，true
    title?: string | ((attrs: AttrsMapType[]) => string); // 视频标题
    vslideGesture: boolean; // 非全屏下开启亮度和音量调节手势，false
    vslideGestureInFullscreen: boolean; // 全屏下开启亮度和音量调节手势，true
  };
}

export interface LinkConfig extends CommonConfig {
  onTap?: (url: string) => void; // 链接点击事件回调
}

export interface ConfigType {
  timeout: number; // 解析超时毫秒数，1000
  ignoredElement: string[]; // 忽略解析的元素类型，[]
  delay: number; // 延迟解析毫秒数，0
  image: ImageConfig;
  text: TextConfig;
  video: VideoConfig;
  view: CommonConfig;
  link: LinkConfig;
}
