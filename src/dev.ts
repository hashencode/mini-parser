import { MiniParser } from "./main";

const htmlStr = `<div><span>X<img src=''></span></div>`;

const data = new MiniParser(htmlStr);
console.log(data);
