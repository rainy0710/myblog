const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const server = http.createServer();

server.on('request', (request, response) => {
    // 获取请求的URL信息
    let filePath = url.parse(request.url, true);
    let pathName = filePath.pathname;

    // 设置默认的主页地址
    let urlName = path.join(__dirname, '/src/index.html');

    // 如果请求其他资源
    if(pathName !== '/'){
        urlName = path.join(__dirname, pathName);
    }

    fs.readFile(urlName, (err, data) => {
        if(err){
            response.end('404 Not Found!');
            return;
        }

        response.end(data);
    })

});

server.listen(80, () => {
    console.log('The HTTP server is running......');
});




// 原生Apache模式
// var server = http.createServer();

// server.on('request', function (request, response) {
//     var urlName = './src/index.html';

//     pathName = url.parse(request.url, true).pathname;
//     if (pathName !== '/') {
//         urlName = pathName;
//     }

//     fs.readFile(path.join(__dirname, urlName), function (err, data) {
//         if (err) {
//             return response.end('404 Resource Not Found!');
//         }

//         response.end(data);
//     })
// });

// server.listen(80, function () {
//     console.log('The http server is running ......');
// })