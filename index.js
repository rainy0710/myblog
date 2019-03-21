var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer();

server.on('request', function (request, response) {
    var urlName = './src/index.html';

    if (request.url !== '/') {
        urlName = request.url;
    }

    fs.readFile(path.join(__dirname, urlName), function (err, data) {
        if (err) {
            return response.end('404 Resource Not Found!');
        }

        response.end(data);
    })
});

server.listen(80, function () {
    console.log('The http server is running ......');
})