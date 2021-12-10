const {
  elementType,
  elementAttrs,
  config,
  errorHtmlString,
} = require("./mock");
const MiniParser = require("../dist");

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

// 测试错误的字符串
test(errorHtmlString.desc, () => {
  expect(new MiniParser(errorHtmlString.html)).toStrictEqual(
    errorHtmlString.except
  );
});
