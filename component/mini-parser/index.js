Component({
  options: {
    addGlobalClass: true, // page样式影响组件内样式
  },
  properties: {
    html: { type: String },
    config: { type: Object, value: {} },
  },
  data: {
    containerWidth: 0,
    renderVisible: false,
  },
  queryTimer: null,
  queryCount: 0,
  ready() {
    this.init();
  },
  observers: {
    // 适应异步请求富文本数据
    html() {
      this.init();
    },
  },
  methods: {
    init() {
      const { html, config } = this.data;
      const { adaptive = true } = config;
      if (html) {
        if (adaptive) {
          this.queryCount = 0;
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
    getContainerWidth() {
      if (this.queryTimer) {
        if (this.queryCount < 10) {
          // 获取外层容器宽度
          wx.createSelectorQuery()
              .in(this)
              .select('.mini-parser')
              .boundingClientRect(res => {
                if (res && res.width > 0) {
                  clearInterval(this.queryTimer);
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
        } else {
          // 找不到外层元素时，将自适应设置为false
          clearInterval(this.queryTimer);
          this.setData({
            config: { ...this.data.config, adaptive: false },
            renderVisible: true,
          });
        }
      }
    },
  },
});
