exports.elementType = {
  desc: "element type",
  html: `
<!--ignore element-->
<head />
<title></title>
<!--selfClosing element-->
<br/><div/>
<!--block element-->
<article></article><span></span>
<!--format element-->
<video></video><img/><a></a>
<!--text element-->
汉字Aa01!@#$%
`,
  except: [
    {
      id: "0_0_view",
      type: "selfClosing",
      name: "view",
      originName: "br",
      attrs: {},
      display: "inline",
    },
    {
      id: "0_1_view",
      type: "selfClosing",
      name: "view",
      originName: "div",
      attrs: {},
      display: "block",
    },
    {
      id: "0_2_view",
      type: "default",
      name: "view",
      originName: "article",
      attrs: {},
      display: "block",
      genKey: 2,
      children: [],
    },
    {
      id: "0_4_view",
      type: "default",
      name: "view",
      originName: "span",
      attrs: {},
      display: "inline",
      genKey: 4,
      children: [],
    },
    {
      id: "0_6_video",
      type: "default",
      name: "video",
      originName: "video",
      attrs: {},
      display: "inline",
      genKey: 6,
      children: [],
    },
    {
      id: "0_8_image",
      type: "selfClosing",
      name: "image",
      originName: "img",
      attrs: {},
      display: "inline",
    },
    {
      id: "0_9_link",
      type: "default",
      name: "link",
      originName: "a",
      attrs: {},
      display: "inline",
      genKey: 9,
      children: [],
    },
    {
      id: "0_11_text",
      type: "text",
      name: "text",
      text: "汉字Aa01!@#$%",
      attrs: {
        decode: false,
        userSelect: false,
      },
    },
  ],
};

exports.elementAttrs = {
  desc: "element attrs",
  html: `
<div class="test-class" id="test-id" style="display: flex;align-items: center" width="100px" noValue></div>
<img class="test-class" id="test-id" src="https://xxx.com" alt="">
`,
  except: [
    {
      id: "0_0_view",
      type: "default",
      name: "view",
      originName: "div",
      attrs: {
        class: "test-class",
        id: "test-id",
        style: "display: flex;align-items: center",
        width: "100px",
        noValue: "",
      },
      display: "block",
      genKey: 0,
      children: [],
    },
    {
      id: "0_2_image",
      type: "selfClosing",
      name: "image",
      originName: "img",
      attrs: {
        class: "test-class",
        id: "test-id",
        src: "https://xxx.com",
        alt: "",
        mode: "scaleToFill",
        webp: false,
        lazyLoad: false,
        showMenu: false,
      },
      display: "inline",
    },
  ],
};

exports.config = {
  desc: "config",
  html: `
<img class="test-class" id="img-id" src="https://xxx.com" alt="">
test word 123 $%#@
<video src="https://ccc.com" controls></video>
<div class="test-class" id="div-id" style="display: block"></div>
<a href="https://bbb.net"></a>
`,
  config: {
    timeout: 2000,
    ignoredElement: [],
    delay: 0,
    image: {
      defaultClass: "test-image",
      validAttrs: ["id", "src"],
      format: { src: (data) => data.replace("xxx", "zzz") },
      // 内置属性
      buildInAttrs: {
        mode: "widthFix",
        webp: true,
        lazyLoad: true,
        showMenu: true,
      },
    },
    text: {
      defaultClass: "test-text",
      format: { text: (data) => data.replace(/123/g, "一二三") },
      // 内置属性
      buildInAttrs: {
        decode: true,
        userSelect: true,
      },
    },
    video: {
      defaultClass: "test-video",
      validAttrs: [],
      // 内置属性
      buildInAttrs: {
        autoplay: true,
        controls: true,
        enablePlayGesture: false,
        enableProgressGesture: true,
        loop: false,
        muted: false,
        objectFit: "contain",
        playBtnPosition: "bottom",
        showCastingButton: false,
        showCenterPlayBtn: true,
        showFullscreenBtn: true,
        showMuteBtn: false,
        showPlayBtn: true,
        showProgress: true,
        vslideGesture: false,
        vslideGestureInFullscreen: true,
      },
    },
    view: {
      defaultClass: "test-view",
      validAttrs: ["style"],
    },
    link: {
      defaultClass: "",
      format: { href: (data) => data.replace("https", "http") },
    },
  },
  except: [
    {
      id: "0_0_image",
      type: "selfClosing",
      name: "image",
      originName: "img",
      attrs: {
        id: "img-id",
        src: "https://zzz.com",
        mode: "widthFix",
        webp: true,
        lazyLoad: true,
        showMenu: true,
      },
      display: "inline",
    },
    {
      id: "0_1_text",
      type: "text",
      name: "text",
      text: "test word 一二三 $%#@",
      attrs: {
        decode: true,
        userSelect: true,
      },
    },
    {
      id: "0_2_video",
      type: "default",
      name: "video",
      originName: "video",
      attrs: {
        autoplay: true,
        controls: true,
        enablePlayGesture: false,
        enableProgressGesture: true,
        loop: false,
        muted: false,
        objectFit: "contain",
        playBtnPosition: "bottom",
        showCastingButton: false,
        showCenterPlayBtn: true,
        showFullscreenBtn: true,
        showMuteBtn: false,
        showPlayBtn: true,
        showProgress: true,
        vslideGesture: false,
        vslideGestureInFullscreen: true,
      },
      display: "inline",
      genKey: 2,
      children: [],
    },
    {
      id: "0_4_view",
      type: "default",
      name: "view",
      originName: "div",
      attrs: {
        style: "display: block",
      },
      display: "block",
      genKey: 4,
      children: [],
    },
    {
      id: "0_6_link",
      type: "default",
      name: "link",
      originName: "a",
      attrs: {
        href: "http://bbb.net",
      },
      display: "inline",
      genKey: 6,
      children: [],
    },
  ],
};
