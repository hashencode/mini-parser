exports.elementType = {
  desc: "element type",
  html: "<!--hello--><head /><title></title><br/><div/><video></video><img/>汉字Aa01!@#$%",
  except: [
    {
      id: "0_0_br",
      name: "br",
      attrs: {},
      display: "inline",
      type: "selfClosing",
    },
    {
      id: "0_1_div",
      name: "div",
      attrs: {},
      display: "block",
      type: "selfClosing",
    },
    {
      id: "0_2_video",
      name: "video",
      attrs: {},
      display: "inline",
      type: "default",
      children: [],
    },
    {
      id: "0_4_img",
      name: "img",
      attrs: {},
      display: "inline",
      type: "selfClosing",
    },
    {
      id: "0_5_text",
      name: "text",
      attrs: {
        content: "汉字Aa01!@#$%",
      },
      display: "inline",
      type: "text",
    },
  ],
};

exports.elementAttrs = {
  desc: "element attrs",
  html: '<img class="test-class" id="test-id" src="https://xxx.com" style="display:flex;align-items: center" alt="">',
  except: [
    {
      id: "0_0_img",
      name: "img",
      attrs: {
        class: "test-class",
        id: "test-id",
        src: "https://xxx.com",
        styleObj: {
          display: "flex",
          "align-items": "center",
        },
        style: "display:flex;align-items:center",
        alt: "",
      },
      display: "flex",
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
  },
  except: [
    {
      id: "0_0_img",
      type: "selfClosing",
      name: "img",
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
      attrs: {
        content: "test word 一二三 $%#@",
      },
      display: "inline",
    },
    {
      id: "0_2_br",
      type: "selfClosing",
      name: "br",
      attrs: {},
      display: "inline",
    },
  ],
};

exports.domLevel = {
  desc: "dom level",
  html: "<div><span>X<img src=''></span></div>",
  except: [
    {
      id: "0_0_div",
      name: "div",
      attrs: {},
      display: "block",
      type: "default",
      children: [
        {
          id: "0_0_span",
          name: "span",
          attrs: {},
          display: "inline",
          type: "default",
          children: [
            {
              id: "0_0_text",
              name: "text",
              attrs: {
                content: "X",
              },
              display: "inline",
              type: "text",
            },
            {
              id: "0_1_img",
              name: "img",
              attrs: {
                src: "",
              },
              display: "inline",
              type: "selfClosing",
            },
          ],
        },
      ],
    },
  ],
};

exports.specialHtml = {
  desc: "special html string",
  html: "&lt;<br><div>",
  except: [
    {
      id: "0_0_text",
      name: "text",
      attrs: {
        content: "<",
      },
      display: "inline",
      type: "text",
    },
    {
      id: "0_1_br",
      name: "br",
      attrs: {},
      display: "inline",
      type: "selfClosing",
    },
  ],
};
