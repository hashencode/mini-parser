const {
  elementType,
  elementAttrs,
  config,
  specialHtml,
  domLevel,
  adapter,
} = require("./mock");
const { MiniParser } = require("../test_build");

// 测试各种类型的元素的解析
test(elementType.desc, () => {
  const { html, except } = elementType;
  expect(new MiniParser({ html })).toStrictEqual(except);
});

// 测试元素属性解析
test(elementAttrs.desc, () => {
  const { html, except } = elementAttrs;
  expect(new MiniParser({ html })).toStrictEqual(except);
});

// 测试配置项
test(config.desc, () => {
  const { html, except } = config;
  expect(new MiniParser({ html, config: config.config })).toStrictEqual(except);
});

// 测试DOM层级
test(domLevel.desc, () => {
  const { html, except } = domLevel;
  expect(new MiniParser({ html })).toStrictEqual(except);
});

// 测试错误的字符串
test(specialHtml.desc, () => {
  const { html, except } = specialHtml;
  expect(new MiniParser({ html })).toStrictEqual(except);
});
