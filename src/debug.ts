import MiniParser from "./main";

const htmlStr = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>miniParser</title>
</head>
<body>
    <p><img src="https://img1.dxycdn.com/2020/0707/961/8465402606288233243-68.jpg" style="white-space: normal;" /></p>
    </br>
</body>
</html>`;

new MiniParser(htmlStr);
