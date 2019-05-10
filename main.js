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
    if(pathName !== '/' && pathName !== '/index'){
        urlName = path.join(__dirname, pathName);
    }else{
        // 记录访问日志
        let pingAct = `
        ${new Date()} IP--${request.socket.remoteAddress}:${request.socket.remotePort}
        `;
    
        fs.writeFile('./pinglog.txt', pingAct, {
            flag: 'a'
        }, (err) => {
            if(err){
                console.log('One request hasn\'t been recorded!');
            }
        })
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
