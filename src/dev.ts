import MiniParser from "./main";

const htmlStr = `
<body>
    <p><img src="https://img1.dxycdn.com/2020/0707/961/8465402606288233243-68.jpg" style="white-space: normal;" /></p>
    <br/>
</body>
<p>AABB<img src="https://img1.dxycdn.com/2020/0707/961/8465402606288233243-68.jpg" style="white-space: normal;" /></p>
<br/>
`;

console.log(new MiniParser(htmlStr));