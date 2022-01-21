<h1 align="center">Mini Parser</h1>

<div align="center">适用于微信小程序的富文本解析方案</div>

## 🎉 特性

- 🎈  轻量高效，体积仅5KB

- 📦 组件式封装，开箱即用

- 🔨 数据纯净，功能精简，更适合业务开发

## 📦 安装

```bash
npm install mini-program-parser
```

## 🔨 使用

1. 使用上述方法安装 mini-parser 并使用微信开发者工具进行 npm 构建

2. 将库中`component/mini-parser`路径下的 mini-parser 组件拷贝至你的项目中

3. 在页面的 json 文件中引入 mini-parser：
   
   ```json
   {
     "component": true,
     "usingComponents": {
       "mini-parser": "{{your_path}}/mini-parser/index"
     }
   }
   ```

4. 在 wxml 中使用 mini-parser：
   
   ```html
   <mini-parser html="{{htmlStr}}" config="{{config}}"></mini-parser>
   ```
5. 小程序代码示例片段：https://developers.weixin.qq.com/s/3BHREtmN7xwn

## ⚙️ 配置项

| 属性                   | 说明        | 类型                        | 默认值                   |
| -------------------- | --------- | ------------------------- | --------------------- |
| adaptive             | 宽度自适应模式   | boolean                   | true                  |
| format               | 属性格式化     | -                         | -                     |
| ignoredElement       | 无需解析的元素类型 | string[]                  | defaultIgnoreElements |

### adaptive

宽度自适应模式

默认开启，当元素的宽度超过外层容器的宽度时，脚本会自动修改其宽度为容器宽度，并等比缩放其高度（如果有设置的话）

### format

属性格式化

干涉解析结果的方法，可以对具体元素的属性解析行为进行干涉，新增/修改具体的属性/方法，举个例子：

```javascript
format: {
    img: {
        /* 替换图片链接协议 */
        src: (data) => data.replace("http", "https"),
        /* 重写图片ID */
        id: "overwrite-id",
        /* 点击事件回调函数名 */
        tapEvent: "handleTap"
    },
    text: {
        /* 修改文本 */
        content: (data) => data.replace("123", "abc"),
    },
}
```

### ignoredElement

无需解析的元素类型

存在于该数组内的元素，在解析时不会解析其本身及其子元素，可在`MiniParser.defaultIgnoreElements`上追加元素或者替换为自己的忽略配置

```javascript
ignoredElement:[...MiniParser.defaultIgnoreElements, 'iframe']
// or
ignoredElement:['iframe', 'table', '...']
```
































