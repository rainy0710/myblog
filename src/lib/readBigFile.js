/* 
 * 在Node服务器上通过流的形式实现对大文件的分段读取和发送发送响应
 * 参数一：指定文件的文件路径
 * 参数二：HTTP的请求对象request
 * 参数三：HTTP的响应对象response
 */

const fs = require('fs');

function readBigFile(filename, request, response) {
    fs.exists(filename, function(exists) {
        if (!filename || !exists) {
            response.writeHead(404);
            response.end('Can\'t find the indicated file!');
            return;
        }
        
        // 获取文件大小
        let stat = fs.statSync(filename);
        let fileSize = stat.size;
        // 获取HTTP请求头部的range信息
        let range = request.headers.range;

        
        if (range) {
            // 请求头部中有range信息便使用206分段传输
    
            let parts = range.replace(/bytes=/, "").split("-");
            let start = parseInt(parts[0], 10);
            // 默认按10mB分段
            let end = parts[1] ? parseInt(parts[1], 10) : start + 10000000; 
    
            // 如果自定义的end大于了文件大小则以文件大小为准
            end = end > fileSize - 1 ? fileSize - 1 : end;
    
            let chunksize = (end - start) + 1;
            let file = fs.createReadStream(filename, { start, end });
            let head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mpeg4',
            };
            response.writeHead(206, head);
            file.pipe(response);
        } else {
            let head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mpeg4',
            };
            res.writeHead(200, head);
            fs.createReadStream(filename).pipe(response);
        }
    });
}

module.exports = readBigFile;