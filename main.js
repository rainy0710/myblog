const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const jsmediatags = require("jsmediatags");

const server = http.createServer();

server.on('request', (request, response) => {
    // // 设置允许跨域
    // response.setHeader('Access-Control-Allow-Origin', '*');    // 访问控制允许来源：所有
    // response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since, Range');    // 访问控制允许报头 X-Requested-With: xhr请求, 同时允许JS MediaTags分片读取文件
    // response.setHeader('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS');    // 访问控制允许方法
    // response.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range');    // 允许访问JS MediaTags分片读取文件
    response.setHeader('X-Powered-By', 'nodejs v10.15.3');    // 自定义头信息，表示服务端用nodejs

    // 获取请求的URL信息
    let filePath = url.parse(request.url, true);

    // 提取并解码URI和参数
    let pathName = decodeURIComponent(filePath.pathname);
    let paras = {};
    Object.keys(filePath.query).forEach((item, index, arr) => {
        // 使用encodeURIComponent方式加密遇到'%'解密时会报错
        paras[unescape(item)] = unescape(filePath.query[item]);
    })

    // 拿到该请求资源的绝对路径
    let urlName = path.join(__dirname, pathName);


    switch(true){
        // 请求主页
        case /^\/index$/.test(pathName):
        case /^\/index\.html$/.test(pathName):
        case /^\/$/.test(pathName):
            urlName = path.join(__dirname, '/src/index.html');

            // 记录访问日志
            let pingAct = `
            ${new Date()} IP--${request.socket.remoteAddress}:${request.socket.remotePort}
            `;

            let logDate = new Date();
            let logFile = logDate.getFullYear().toString().concat((logDate.getMonth() + 1), logDate.getDate());
            fs.writeFile('./pinglog/' + logFile + '.txt', pingAct, {
                flag: 'a'
            }, (err) => {
                if(err){
                    console.log('One request hasn\'t been recorded!');
                }
            })
        
        // 其他资源均采用默认urlName路径访问
        default:
            // 设置jsonp跨域访问：url?query=filepath&callback=function
            if('query' in paras && 'callback' in paras){
                urlName = path.join(__dirname, unescape(paras['query']));
            }
            console.log(urlName);
            fs.readFile(urlName, (err, data) => {
                if(err){
                    response.end('404 Not Found!');
                    return;
                }

                if('query' in paras && 'callback' in paras){
                    data = `${paras['callback']}(${data})`;
                }
        
                response.end(data);
            })
            break;
    }
});

server.listen(80, () => {
    console.log('The HTTP server is running......');
});
