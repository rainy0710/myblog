var express = require('express');
var url = require('url');
var fs = require('fs');
var path = require('path');

var router = express.Router();

//指定暴露给客户端的资源目录
router.use('/dist', express.static(path.join(__dirname, '../dist')));
router.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));


//指定对默认url的默认
router.use(function (request, response) {
    fs.readFile(path.join(__dirname, '../src/index.html'), function (err, data) {
        if (err) {
            return response.end('404 Not Found!');
        }

        response.end(data);
    })
})

module.exports = router;