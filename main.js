const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const jsmediatags = require("jsmediatags");
const NodeID3 = require('node-id3');
const readFileList = require('./src/lib/readFileList.js');
const ffmpeg = require('fluent-ffmpeg');

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
        // 请求Tik-Tok中视频的封面
        case /^\/poster\/[^\/\.]*\.mp4$/.test(pathName):
            let regMp4 = /^\/poster\/(([^\/\.]*)\.mp4)$/.exec(pathName);
            let fileName = regMp4[1];
            new ffmpeg(path.join(__dirname, '/public/video/' + fileName)).screenshots({
                timemarks: ['1'],
                count: 1,
                filename: regMp4[2],
                folder: 'public/poster',
                // size: '320x240'
            }).on('end', function() {
                urlName = path.join(__dirname, 'public/poster/' + regMp4[2] + '.png');
                fs.readFile(urlName, (err, data) => {
                    if(err){
                        response.end('Can\'t read the poster image of tik-tok video!');
                        return;
                    }
            
                    response.end(data);
                })
            });
            break;

        // 请求TikTok Video中的视频文件列表
        case /\/videoList/.test(pathName):
            urlName = path.join(__dirname, '/public/video');
            let fileList = readFileList(urlName);
            response.end(JSON.stringify(fileList));
            break;

        // 请求mp3文件的封面图片
        case /^\/album\/.*\.mp3/.test(pathName):
            let reg = /.*\/([^\/\.]*\.mp3)$/;
            let musicTitle = reg.exec(pathName)[1];
            urlName = path.join(__dirname, '/public/music/' + musicTitle);
            NodeID3.read(urlName, function(err, tags) {
                if(err){
                    fs.readFile(path.join(__dirname, '/public/images/defaultCover.jpg'), (err, data) => {
                        if(err){
                            response.end('Can\'t read the defaultCover.jpg!');
                            return;
                        }
                
                        response.end(data);
                    })
                }else{
                    response.end(tags.image.imageBuffer);
                }

                /*
                tags: {
                  title: "Tomorrow",
                  artist: "Kevin Penkin",
                  image: {
                    mime: "jpeg",
                    type: {
                      id: 3,
                      name: "front cover"
                    },
                    description: String,
                    imageBuffer: Buffer
                  },
                  raw: {
                    TIT2: "Tomorrow",
                    TPE1: "Kevin Penkin",
                    APIC: Object (See above)
                  }
                }
                */
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
                    response.end('Can\'t read the file client requested!');
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
