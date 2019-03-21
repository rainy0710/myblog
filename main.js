var express = require('express');
var router = require('./routers/router.js')

var app = express(); 
app.use(router);

app.listen(80, function () {
    console.log('The server is running ......');
});



//原生Apache模式
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