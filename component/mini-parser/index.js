Component({
  options: {
    addGlobalClass: true, // page样式影响组件内样式
  },
  properties: {
    html: { type: String },
    config: { type: Object, value: { adaptive: true } },
  },
  data: {
    containerWidth: 0,
    renderVisible: false,
  },
  ready() {
    const { html, config } = this.data;
    const { adaptive = true } = config;
    if (html) {
      if (adaptive) {
        // 获取外层容器宽度
        wx.createSelectorQuery()
          .in(this)
          .select(".mini-parser")
          .boundingClientRect((res) => {
            if (res && res.width > 0) {
              this.setData({
                containerWidth: res.width,
                renderVisible: true,
              });
            }
          })
          .exec();
      } else {
        this.setData({
          renderVisible: true,
        });
      }
    }
  },
});
