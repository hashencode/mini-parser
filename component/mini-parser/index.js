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
  queryTimer: null,
  queryCount: 0,
  ready() {
    const { html, config } = this.data;
    const { adaptive = true } = config;
    if (html) {
      if (adaptive) {
        this.queryTimer = setInterval(() => {
          this.getContainerWidth();
        }, 100);
      } else {
        this.setData({
          renderVisible: true,
        });
      }
    }
  },
  methods: {
    getContainerWidth() {
      if (this.queryTimer || this.queryCount > 20) {
        // 获取外层容器宽度
        wx.createSelectorQuery()
          .in(this)
          .select(".mini-parser")
          .boundingClientRect((res) => {
            if (res && res.width > 0) {
              this.queryTimer = null;
              this.setData({
                containerWidth: res.width,
                renderVisible: true,
              });
            } else {
              this.queryCount += 1;
            }
          })
          .exec();
      }
    },
  },
});
