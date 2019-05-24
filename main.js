const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const jsmediatags = require("jsmediatags");
const ID3 = require('ID3');

const server = http.createServer();

server.on('request', (request, response) => {
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
        // 请求mp3文件的封面图片
        case /^\/album\/.*\.mp3/.test(pathName):
            let reg = /.*\/([^\/\.]*\.mp3)$/;
            let musicTitle = reg.exec(pathName)[1];
            urlName = 'http://127.0.0.1/public/music/' + encodeURIComponent(musicTitle);
            ID3.loadTags(urlName, () => {
                let tags = ID3.getAllTags(urlName);

                let image = tags.album;
                if (!image) {
                    let base64String = String.fromCharCode(image);
                    let base64 = "data:" + image.format + ";base64," + window.btoa(base64String);
                    response.end(base64);
                } else {
                    fs.readFile(path.join(__dirname, '/public/images/defaultCover.jpg'), (err, data) => {
                        if(err){
                            response.end('404 Not Found!');
                            return;
                        }
                
                        response.end(data);
                    })
                }
            })
            break;

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
