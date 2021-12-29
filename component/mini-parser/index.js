Component({
  options: {
    addGlobalClass: true, // page样式影响组件内样式
  },
  properties: {
    htmlStr: { type: String, optionalTypes: [Array] },
    config: { type: Object },
  },
});
