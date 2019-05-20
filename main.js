const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const jsmediatags = require("jsmediatags");

const server = http.createServer();

server.on('request', (request, response) => {
    // 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');    // 访问控制允许来源：所有
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since, Range');    // 访问控制允许报头 X-Requested-With: xhr请求, 同时允许JS MediaTags分片读取文件
    response.setHeader('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS');    // 访问控制允许方法
    response.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range');    // 允许访问JS MediaTags分片读取文件
    response.setHeader('X-Powered-By', 'nodejs v10.15.3');    // 自定义头信息，表示服务端用nodejs

    // 获取请求的URL信息
    let filePath = url.parse(request.url, true);

    // 提取并解码URI和参数
    let pathName = decodeURIComponent(filePath.pathname);
    let paras = {};
    Object.keys(filePath.query).forEach((item, index, arr) => {
        paras[decodeURIComponent(item)] = decodeURIComponent(filePath.query[item]);
    })

    // 拿到该请求资源的绝对路径
    let urlName = path.join(__dirname, pathName);
    
    
    // // 使用正则来对URL进行识别并做相应的处理
    // switch(true){
    //     case /^\/$/.test(pathName):
    //     case /^\/index$/.test(pathName):
    //     case /^\/index\.html$/.test(pathName):
    //         // 设置主页地址
    //         urlName = path.join(__dirname, '/src/index.html');

    //         // 记录访问日志
    //         let pingAct = `
    //         ${new Date()} IP--${request.socket.remoteAddress}:${request.socket.remotePort}
    //         `;
            
    //         fs.writeFile('./pinglog.txt', pingAct, {
    //             flag: 'a'
    //         }, (err) => {
    //             if(err){
    //                 console.log('One request hasn\'t been recorded!');
    //             }
    //         })

    //         break;
    //     case /.*\.mp3$/.test(pathName):
    //         // 读取请求的mp3文件
    //         fs.readFile(urlName, (err, data) => {
    //             if(err){
    //                 response.end('Music file Not Found!');
    //                 return;
    //             }
        
    //             new jsmediatags.Reader(urlName)
    //             .setTagsToRead(["title", "artist"])
    //             .read({
    //                 onSuccess: function(tag) {
                        
    //                     response.end(JSON.stringify(tag));
    //                     console.log('Something has been sent back.');
    //                 },
    //                 onError: function(error) {
    //                     response.end(':(' + error.type + error.info);
    //                 }
    //             });
    //         });
    //         break;
            
    // }


    if(pathName === '/' || pathName === '/index' || pathName === '/index.html'){
        urlName = path.join(__dirname, '/src/index.html');
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
