import MiniParser from "./main";

const htmlStr = `
<div id="div_class">
    <img src="https://img1.dxycdn.com/2020/0707/961/8465402606288233243-68.jpg" style="white-space: normal;" />
</div>
`;

const data = new MiniParser(htmlStr);
console.log(data);
