import MiniParser from "miniParser";

Component({
  properties: {
    htmlData: { type: String, optionalTypes: [Array] },
  },
  data: {
    parserData: null,
  },
  observers: {
    // prettier-ignore
    "htmlData": function (htmlData) {
      if (!htmlData) return;
      const data = typeof htmlData === 'string' ? new MiniParser(htmlData) : htmlData;
      this.setData({
        parserData: data,
      });
    },
  },
  methods: {},
});
