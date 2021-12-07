import MiniParser from "./main";

const htmlStr = `
<img class="test-class" id="img-id" src="https://xxx.com" alt="">
test word 123 $%#@
`;

const data = new MiniParser(htmlStr, {
  timeout: 2000,
  ignoredElement: [],
  delay: 0,
  image: {
    format: { src: (data) => data.replace("xxx", "zzz") },
  },
  text: {
    format: { text: (data) => data.replace(/123/g, "一二三") },
  },
});
console.log(data);
