const MiniParser = require("mini-program-parser");

Component({
  options: {
    addGlobalClass: true, // page样式影响组件内样式
  },
  properties: {
    htmlStr: { type: String, optionalTypes: [Array] },
    config: { type: Object },
  },
  data: {
    parserData: null,
  },
  observers: {
    htmlStr(htmlStr) {
      if (!htmlStr) return;
      const data = Array.isArray(htmlStr)
        ? htmlStr
        : new MiniParser(htmlStr, this.data.config);
      this.setData({
        parserData: data,
      });
    },
  },
  methods: {
    // 处理链接点击
    handleLinkTap(ev) {
      const { href } = ev.currentTarget.dataset.attrs;
      if (href) console.log(href);
    },
  },
});
