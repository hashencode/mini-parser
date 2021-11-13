import MiniParser from "mini-program-parser";

Component({
  properties: {
    htmlStr: { type: String, optionalTypes: [Array] },
  },
  data: {
    parserData: null,
  },
  observers: {
    // prettier-ignore
    "htmlStr": function (htmlStr) {
      if (!htmlStr) return;
      const data = typeof htmlStr === 'string' ? new MiniParser(htmlStr) : htmlStr;
      this.setData({
        parserData: data,
      });
    },
  },
  methods: {},
});
