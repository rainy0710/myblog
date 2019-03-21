<template>
    <div class="box">
        <h1>
            <a href="/index.html" target="_self">R.Z's Blog</a>
        </h1>
        <ul class="nav">
            <li>搜索</li>
            <li>社区</li>
            <li>用户</li>
        </ul>
    </div>
</template>

<script>
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
    width: 20%;
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


</style>

