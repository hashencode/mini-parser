import { MiniParser } from "mini-program-parser";

Component({
  options: {
    addGlobalClass: true, // page样式影响组件内样式
  },
  properties: {
    html: { type: String },
    parsedData: { type: [Array] },
    config: { type: Object },
    containerWidth: { type: Number },
  },
  data: {
    parserData: null,
  },
  observers: {
    html(html) {
      if (!html) return;
      // 传入容器的宽度
      const { containerWidth, config } = this.data;
      const extraData = { containerWidth };
      const data = new MiniParser({ html, config, extraData });
      this.setData({
        parserData: data,
      });
    },
    parsedData(data) {
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
