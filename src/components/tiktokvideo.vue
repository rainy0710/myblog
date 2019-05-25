<template>
    <div id="tiktok-video">
        <div class="title">
            <span class="line"></span>
            <span class="centerTitle">Tik-Tok Video</span>
            <span class="line"></span>
        </div>
        <div class="video_list" :style="{height: contentHeight}" ref="mainContent">
            <div class="videoBox" v-for="(item, index) in videoList" v-bind:key="index" 
            v-bind:style="{left: 285 * (index % numInLine) + 'px', top: 450 * Math.floor(index / numInLine) + 'px'}"
            @click="videoPlay">
                <video :src="'/public/video/' + item.name"></video>
            </div>
        </div>
        <div class="bottom_line">
            <p>我是个有底线的网站！</p>
        </div>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            videoList: [],
            contentHeight: '800px',
            numInLine: 5,
            playClass: 'pause'
        }
    },
    methods: {
        videoPlay: function(){
            
        }

    },
    created: function(){
        ajax('GET', '/videoList', (xmlhttp) => {
            this.$store.commit('setState', xmlhttp.responseText);
            this.videoList = this.$store.state.videoList;
            this.contentHeight = Math.ceil((this.videoList.length + 1) / this.numInLine) * 450 + 'px'
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
    margin: 0 auto;
    overflow: hidden;
    /* background-color: yellow; */
}

div.video_list div.videoBox{
    display: flex;
    position: absolute;
    align-items: center;
    width: 225px;
    height: 400px;
    overflow: hidden;
    background-color: black;
}

div.video_list div.videoBox video{
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
    height: 50px;
    color: #aaa;
    font-size: 16px;
}
</style>