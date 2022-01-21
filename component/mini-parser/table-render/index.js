Component({
  options: {
    addGlobalClass: true, // page样式影响组件内样式
  },
  properties: {
    tableData: { type: [Array] },
  },
  data: {
    parserData: null,
  },
  observers: {
    tableData(data) {
      if (!data) return;
      const { children } = data;
      if (!children) return;
      const parserData = data;
      const wrapper = children.filter((item) =>
        ["thead", "tbody"].includes(item.name)
      );
      if (wrapper) {
        parserData.children = [];
        wrapper.forEach((item) => {
          parserData.children = [...parserData.children, ...item.children];
        });
      }
      console.log(parserData);
      this.setData({
        parserData,
      });
    },
  },
});
