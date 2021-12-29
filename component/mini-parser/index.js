Component({
  options: {
    addGlobalClass: true, // page样式影响组件内样式
  },
  properties: {
    htmlStr: { type: String, optionalTypes: [Array] },
    config: { type: Object },
  },
  ready() {
    // 如果需要进行宽度自适应
    const { config } = this.data;
    if (config && config.widthAdaptive) {
      const query = wx.createSelectorQuery().in(this);
      query
        .select(".mini-parser")
        .boundingClientRect((res) => {
          console.log("@@@", res);
        })
        .exec();
    }
  },
});
