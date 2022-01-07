Component({
  options: {
    addGlobalClass: true, // page样式影响组件内样式
  },
  properties: {
    html: { type: String, optionalTypes: [Array] },
    config: { type: Object, value: { adaptive: true } },
  },
  data: {
    containerWidth: 0,
  },
  ready() {
    const { adaptive = true } = this.data.config;
    if (adaptive) {
      // 获取外层容器宽度
      wx.createSelectorQuery()
        .in(this)
        .select(".mini-parser")
        .boundingClientRect((res) => {
          if (res.width > 0) {
            this.setData({
              containerWidth: res.width,
            });
          }
        })
        .exec();
    }
  },
});
