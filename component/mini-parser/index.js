Component({
  options: {
    addGlobalClass: true, // page样式影响组件内样式
  },
  properties: {
    htmlStr: { type: String, optionalTypes: [Array] },
    config: { type: Object },
  },
  data: {
    containerWidth: 0,
  },
  ready() {
    // 获取外层容器宽度
    wx.createSelectorQuery()
      .in(this)
      .select(".mini-parser")
      .boundingClientRect((res) => {
        this.setData({
          containerWidth: res.width,
        });
      })
      .exec();
  },
});
