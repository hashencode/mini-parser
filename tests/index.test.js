const { elementType, elementAttrs } = require("./mock");
const MiniParser = require("../dist");

// 测试各种类型的元素的解析
test(elementType.desc, () => {
  expect(new MiniParser(elementType.html)).toStrictEqual(elementType.except);
});

// 测试元素属性解析
test(elementAttrs.desc, () => {
  expect(new MiniParser(elementAttrs.html)).toStrictEqual(elementAttrs.except);
});
