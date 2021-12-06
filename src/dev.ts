import MiniParser from "./main";

const htmlStr = `
<div class="test-class" id="test-id" style="display: flex;align-items: center" width="100px" noValue></div>
<img class="test-class" id="test-id" src="https://xxx.com" alt="">
`;

const data = new MiniParser(htmlStr);
console.log(data);
