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
`,
  config: {
    timeout: 2000,
    ignoredElement: [],
    delay: 0,
    image: {
      rewriteAttrs: {
        id: "rewrite-id",
      },
      format: { src: (data) => data.replace("xxx", "zzz") },
    },
    text: {
      format: { text: (data) => data.replace(/123/g, "一二三") },
    },
  },
  except: [
    {
      id: "0_0_image",
      type: "selfClosing",
      name: "image",
      originName: "img",
      attrs: {
        class: "test-class",
        id: "rewrite-id",
        src: "https://zzz.com",
        alt: "",
      },
      display: "inline",
    },
    {
      id: "0_1_text",
      type: "text",
      name: "text",
      text: "test word 一二三 $%#@",
    },
  ],
};