<template>
    <div id="tiktok-video">
        <div class="title">
            <span class="line"></span>
            <span class="centerTitle">Tik-Tok Video</span>
            <span class="line"></span>
        </div>
        <div class="video_list" :style="{height: contentHeight}" ref="mainContent">
            <div class="videoBox" @click="hashChange(item.name)"
            v-for="(item, index) in videoList" v-bind:key="index" 
            v-bind:style="{left: 285 * (index % numInLine) + 'px', top: 450 * Math.floor(index / numInLine) + 'px'}">
                <img :src="'/poster/' + item.name" alt="图片获取失败！">
            </div>
        </div>
        <div class="bottom_line">
            <p>我是个有底线的网站！</p>
        </div>
    </div>
</template>
<script>
import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);
export default {
    data: function(){
        return {
            videoList: [],
            contentHeight: '800px',
            numInLine: 5,
            playClass: 'pause',
        }
    },
    methods: {
        hashChange: function(name){
            window.location.hash = '/videoplay?url=/public/video/' + name;
        },
        hotLoad: function(){
            if(this.videoList.length === this.$store.state.videoList.length){
                window.onscroll = function(){
                    if(window.location.hash !== '/'){
                        window.location.hash = '/';
                    }
                }
                return;
            }
            let arrTemp = [];
            for(let i = 0; i < 15 && (this.videoList.length + i) < this.$store.state.videoList.length; i ++){
                arrTemp.push(this.$store.state.videoList[this.videoList.length + i]);
            }
            this.videoList = this.videoList.concat(arrTemp);
            this.contentHeight = Math.ceil((this.videoList.length) / this.numInLine) * 450 + 'px';
        }
    },
    created: function(){
        let that = this;
        ajax('GET', '/videoList', (xmlhttp) => {
            this.$store.commit('setState', xmlhttp.responseText);
            window.onscroll = function(){
                if(window.location.hash !== '/'){
                    window.location.hash = '/';
                }

                // 检查当前滚动条高度是否需要热加载
                if(that.$refs.mainContent.offsetTop + that.$refs.mainContent.clientHeight <= (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop) + window.innerHeight){
                    that.hotLoad();
                }
                // console.log(that.$refs.mainContent.offsetTop);
                // console.log(document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop);
            }
            // this.videoList = this.$store.state.videoList;
            // this.contentHeight = Math.ceil((this.videoList.length) / this.numInLine) * 450 + 'px';
        }, (xmlhttp) => {
            console.error('Can\'t get the TikTok video list from server.');
        })
    },
    mounted: function(){
        let that = this;
        this.numInLine = Math.floor((this.$refs.mainContent.offsetWidth + 60) / 285);
        // chrome不支持div标签的onresize事件，因此可以间接利用window对象的onresize事件
        window.onresize = function(){
            that.numInLine = Math.floor((that.$refs.mainContent.offsetWidth + 60) / 285);
            that.contentHeight = Math.ceil((that.videoList.length + 1) / that.numInLine) * 450 + 'px';
        };
    }
}
</script>
<style scoped>
div#tiktok-video{
    /* position: relative; */
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
    margin: 0 auto;
    /* overflow: hidden; */
    /* background-color: yellow; */
}

div.video_list div.videoBox{
    display: flex;
    position: absolute;
    align-items: center;
    width: 225px;
    height: 400px;
    overflow: hidden;
    box-shadow: 0 0 5px 0px #000;
    border-radius: 10px;
    background-color: #111;
    transition: all 0.3s ease;
}

div.video_list div.videoBox:hover{
    box-shadow: 15px 15px 10px 0px #000;
    transform: scale(1.05, 1.05);
}

div.video_list div.videoBox img{
    width: 100%;
    height: auto;
}

div.bottom_line{
    display: flex;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
    border-top: 1px dotted #aaa;
    /* background-color: green; */
}

div.bottom_line p{
    height: 80px;
    line-height: 40px;
    color: #aaa;
    font-size: 16px;
}
</style>