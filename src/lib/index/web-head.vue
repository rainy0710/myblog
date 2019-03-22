<template>
    <div class="box">
        <h1>
            <a href="/index.html" target="_self">R.Z's Blog</a>
        </h1>
        <router-view></router-view>
        <ul class="nav">
            <li><router-link to="/search">搜索</router-link></li>
            <li><a href="javascript:">首页</a></li>
            <li><a href="javascript:">博文</a></li>
            <li><a href="javascript:">社区</a></li>
            <li><router-link to="/login">用户</router-link></li>
        </ul>
    </div>
</template>

<script>
import search from 

export default {
    
}
</script>

<style scoped>
div.box{
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    box-shadow: 0 0 1px 3px #aaa;
    background-color: white;
    z-index: 10;
}

h1{
    position: absolute;
    left: 10%;
    width: 200px;
    height: 100%;
    font-size: 36px;
    line-height: 50px;
    font-family: 'Cooper Black','Arial','Microsoft YaHei';
    /* background-color: yellow; */
}

h1 a{
    color: black;
    text-decoration: none;
}

ul.nav{
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 10%;
    width: 25%;
    list-style: none;
    height: 100%;
    /* background-color: blue; */
}

ul.nav li{
    display: inline-block;
    height: 100%;
    width: 60px;
    line-height: 50px;
    text-align: right;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 5px; 
    color: #666;
    /* background-color: red; */
}

ul.nav li a{
    text-decoration: none;
    transition: color 0.3s ease;
    color: #666;
}

ul.nav li a:hover{
    color: burlywood;
}


</style>

