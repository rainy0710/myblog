<template>
    <div id="tiktok-video">
        <div class="title">
            <span class="line"></span>
            <span class="centerTitle">Tik-Tok Video</span>
            <span class="line"></span>
        </div>
        <div class="video_list">
            <!-- <div class="videoBox" v-for="(item, index) in videoList">

            </div> -->
        </div>
    </diV>
</template>
<script>
export default {
    data: function(){
        return {
            videoList: []
        }
    },
    methods: {

    },
    created: function(){
        ajax('GET', '/videoList', (xmlhttp) => {
            console.log(xmlhttp.responseText);
        }, (xmlhttp) => {
            console.error('Can\'t get the TikTok video list from server.');
        })
    }
}
</script>
<style scoped>
div#tiktok-video{
    position: relative;
    width: 100%;
    margin-top: 60px;
    background-color: #333;
}

div.title{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100px;
}

div.title span.centerTitle{
    font-size: 30px;
    color: #eee;
    font-family: "Arial Black", "Microsoft YaHei";
    font-weight: bold;
}

div.title span.line{
    display: inline-block;
    width: 30%;
    border-top: 1px solid #eee;
}

div.video_list{
    position: relative;
    width: 90%;
    height: 500px;
    margin: 0 auto;
    background-color: yellow;
}
</style>