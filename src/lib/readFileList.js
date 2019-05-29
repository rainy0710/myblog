/*
 * 读取文件夹中的文件列表，并将文件信息保存为JS对象
 * 参数：文件路径（必须为本地路径）
 * 返回值：包含文件夹中所有文件的文件列表对象数组，每个文件对象包含属性{文件名file,文件大小size,文件绝对路径path}
 */
const path = require('path');
const fs = require('fs');

function getFileList(dirPath) {
    let fileList = [];
    readFile(dirPath, fileList);
    return fileList;
}
 
// 遍历读取文件
function readFile(dirPath, filesList) {
    // 需要用到同步读取
    files = fs.readdirSync(dirPath);
    files.forEach(walk);
    function walk(file) {
        states = fs.statSync(dirPath + '/' + file);
        if (states.isDirectory()) {
            readFile(dirPath + '/' + file, filesList);
        }
        else {
            // 创建一个对象保存信息
            let obj = new Object();
            obj.name = file;//文件名
            obj.size = states.size;
            obj.path = path.join(dirPath, file); //文件绝对路径
            filesList.push(obj);
        }
    }
}

module.exports = getFileList;