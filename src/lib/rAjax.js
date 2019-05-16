/*
 * 自定义对象转url字符串格式的方法，同时也对非标准字符进行转码
 * 例：
 * { 'para1':'value1', 'para2':'value2', ... }
 * =》
 * ‘para1=value1&para2=value2...&time=561324561’
 * 注：末尾会自动添加时间参数
 */
function robj2str(obj){
    let result = [];
    Object.keys(obj).forEach(item => {
        result.push(encodeURIComponent(item) + '=' + encodeURIComponent(obj[item]));
    });
    result.push('time=' + new Date().getTime());
    let ret = result.join('&');
    return ret;
}

/*
 * 自定义异步 Ajax 方法
 * 参数一：请求方法：'GET'或'POST'
 * 参数二：请求文件的url：例'/exampleDir/exampleFile'
 * 参数三：参数对象，例{ 'para1':'value1', 'para2':'value2', ... }
 * 参数四：请求成功回调函数
 * 参数五：请求失败回调函数
 */
function rAjax(method, url, success, error, paraObj = {}, timeout = 3000){
    let xmlhttp;
    if (window.XMLHttpRequest){
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    }else{
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // 设置状态监听事件，在Ajax状态变化时触发
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState === 4){
            clearTimeout(timer);
            if((xmlhttp.status >= 200 && xmlhttp.status < 300) || xmlhttp == 304){
                success(xmlhttp);
            }else{
                error(xmlhttp);
            }
        }
    }

    // 修改参数格式
    paraStr = robj2str(paraObj);
    url = encodeURIComponent(url);
    
    method = method.toUpperCase();
    if(method === 'GET'){
        // 发送 GET请求
        if(paraStr){
            url = url + '?' + paraStr;
        }
        xmlhttp.open(method, url, true);
        xmlhttp.send();
    }else if(method === 'POST'){
        // 发送 POST请求
        xmlhttp.open(method, url, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(paraStr);
    }else{
        console.log('The method parameter is invalid!');
    }

    // 设置请求超时处理机制
    var timer = setTimeout(() => {
        xmlhttp.abort();
        console.log('请求超时！');
        clearTimeout(timer);
    }, timeout);
}

module.exports = rAjax;