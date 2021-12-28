const {
  elementType,
  elementAttrs,
  config,
  specialHtml,
  domLevel,
} = require("./mock");
const { MiniParser } = require("../test_build");

// 测试各种类型的元素的解析
test(elementType.desc, () => {
  expect(new MiniParser(elementType.html)).toStrictEqual(elementType.except);
});

// 测试元素属性解析
test(elementAttrs.desc, () => {
  expect(new MiniParser(elementAttrs.html)).toStrictEqual(elementAttrs.except);
});

// 测试配置项
test(config.desc, () => {
  expect(new MiniParser(config.html, config.config)).toStrictEqual(
    config.except
  );
});

// 测试DOM层级
test(domLevel.desc, () => {
  expect(new MiniParser(domLevel.html)).toStrictEqual(domLevel.except);
});

// 测试错误的字符串
test(specialHtml.desc, () => {
  expect(new MiniParser(specialHtml.html)).toStrictEqual(specialHtml.except);
});
