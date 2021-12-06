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
      const data =
        typeof htmlStr === "string"
          ? new MiniParser(htmlStr, this.data.config)
          : htmlStr;
      this.setData({
        parserData: data,
      });
    },
  },
  methods: {},
});
