exports.elementType = {
  desc: "element type",
  html: "<!--hello--><head /><title></title><br/><div/><video></video><img/>汉字Aa01!@#$%",
  except: [
    {
      id: "0_0_view",
      name: "view",
      originName: "br",
      attrs: {},
      display: "inline",
      type: "selfClosing",
    },
    {
      id: "0_1_view",
      name: "view",
      originName: "div",
      attrs: {},
      display: "block",
      type: "selfClosing",
    },
    {
      id: "0_2_video",
      name: "video",
      originName: "video",
      attrs: {},
      display: "inline",
      type: "default",
      children: [],
    },
    {
      id: "0_4_image",
      name: "image",
      originName: "img",
      attrs: {},
      display: "inline",
      type: "selfClosing",
    },
    {
      id: "0_5_text",
      name: "text",
      originName: "text",
      attrs: {
        content: "汉字Aa01!@#$%",
      },
      type: "text",
    },
  ],
};

exports.elementAttrs = {
  desc: "element attrs",
  html: '<img class="test-class" id="test-id" src="https://xxx.com" alt="">',
  except: [
    {
      id: "0_0_image",
      name: "image",
      originName: "img",
      attrs: {
        class: "test-class",
        id: "test-id",
        src: "https://xxx.com",
        alt: "",
      },
      display: "inline",
      type: "selfClosing",
    },
  ],
};

exports.config = {
  desc: "config",
  html: '<img class="test-class" id="img-id" src="https://xxx.com" alt="">test word 123 $%#@<br/>',
  config: {
    format: {
      img: {
        src: (data) => data.replace("xxx", "zzz"),
        id: "overwrite-id",
      },
      text: {
        content: (data) => data.replace(/123/g, "一二三"),
      },
    },
    transMap: {
      br: "rich-text",
    },
  },
  except: [
    {
      id: "0_0_view",
      type: "selfClosing",
      name: "view",
      originName: "img",
      attrs: {
        class: "test-class",
        id: "overwrite-id",
        src: "https://zzz.com",
        alt: "",
      },
      display: "inline",
    },
    {
      id: "0_1_text",
      type: "text",
      name: "text",
      originName: "text",
      attrs: {
        content: "test word 一二三 $%#@",
      },
    },
    {
      id: "0_2_rich-text",
      type: "selfClosing",
      name: "rich-text",
      originName: "br",
      attrs: {},
      display: "inline",
    },
  ],
};

exports.specialHtml = {
  desc: "special html string",
  html: "<div>",
  except: [],
};
