import { MiniParser } from "./main";

const htmlStr = "&lt;<br><div>";

const data = new MiniParser(htmlStr);
console.log(data);
