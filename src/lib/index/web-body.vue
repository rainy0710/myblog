<template>
    <div class="box">
        <div class="poster"></div>
        <div class="articles">
            <div class="art1">
                <div class="swipe">
                    <h2>windwos装机教程</h2>
                    <span>windows 8/8.1/10 操作系统通用安装教程，通俗地讲解windows安装步骤及配置原理。windows 8/8.1/10 操作系统通用安装教程，通俗地讲解windows安装步骤及配置原理。</span>
                </div>
            </div>
            <div class="art2">
                <div class="swipe">
                    <h2>miui个人优化方案</h2>
                    <span>个人日用miui相关优化设置，无需root，用以保证miui更佳的流畅和续航。个人日用miui相关优化设置，无需root，用以保证miui更佳的流畅和续航。</span>
                </div>
            </div>
            <div class="art3">
                <div class="swipe">
                    <h2>大话miui与ios</h2>  
                    <span>对比基于android的miui系统和ios的功能设置、应用质量等指标。</span>  
                </div>
            </div>
            <div class="art4">
                <div class="swipe">
                    <h2>畅聊QQ与微信</h2>
                    <span>对于微信和QQ的个人简介。</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
div.box{
    margin-top: 50px;
    overflow: hidden;
}

div.box div.poster{
    height: 700px;
    width: 100%;
    overflow: hidden;
    background: #222 url('/public/images/uestc_slogan.jpg') 0 0 no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center center;
}

div.articles{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 auto;
    padding-top: 60px;
    width: 80%;
    /* background-color: #666; */
}

div.box div.articles div{
    position: relative;
    display: inline-block;
    width: 350px;
    height: 400px;
    margin: 0 25px 50px 25px;
    overflow: hidden;
    background-color: grey;
}

div.box div.articles div div.swipe{
    position: absolute;
    right: 0;
    top: 300px;
    width: 85%;
    height: 250px;
    padding: 0;
    margin: 0;
    transition: top 0.5s ease;
    background-color: #ddd;
}

div.box div.articles div:hover div.swipe{
    top: 150px;
}

div.box div.articles div div.swipe h2{
    width: 100%;
    height: 100px;
    font-size: 25px;
    font-weight: bold;
    line-height: 100px;
    text-align: center;
    color: #222;
    background-color: #bbb;
}

div.box div.articles div div.swipe span{
    display: inline-block;
    padding: 15px;
    font-size: 15px;
    line-height: 25px;
    text-indent: 2em;
    color: #444;
}

div.box div.articles>div:nth-child(1){
    background-image: url('/public/images/windows.jpg');
}

div.box div.articles>div:nth-child(2){
    background-image: url('/public/images/miui.jpg');
}

div.box div.articles>div:nth-child(3){
    background-image: url('/public/images/miui_ios.jpg');
}

div.box div.articles>div:nth-child(4){
    background-image: url('/public/images/qq_wechat.jpg');
}

div.box div.articles>div{
    background-color: #111;
    background-size: cover;
    background-position: center center;
}

</style>