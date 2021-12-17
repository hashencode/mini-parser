import { MiniParser } from "./main";

const htmlStr = `
<div></div>
`;

const data = new MiniParser(htmlStr);
console.log(data);
