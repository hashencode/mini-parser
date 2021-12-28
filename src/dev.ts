import { MiniParser } from "./main";

const htmlStr = `<div>&lt;</div>`;

const data = new MiniParser(htmlStr);
console.log(data);
