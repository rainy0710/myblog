<template>
    <div id="good-night-music">
        <div class="title">
            <span class="line"></span>
            <span class="centerTitle">Good-Night-Music</span>
            <span class="line"></span>
        </div>
        <div class="main">
            <div class="left">
                <div class="date" v-text="musicDate"></div>
                <div class="description" v-text="musicDescription"></div>
            </div>
            <div class="right">
                <img :src="imgSrc" :alt="musicTitle" class="album" :class="state">
                <div class="player">
                    <div class="name" v-text="musicTitle"></div>
                    <div class="artist" v-text="musicArtist"></div>
                    <div class="icons">
                        <div class="iconBox">
                            <img :src="iconSrc" @click="switchPrev" alt="Previous" :title="prevInfo" class="prev">
                        </div>
                        <div class="iconBox">
                            <img :src="iconSrc" @click="playPause" alt="Play/Pause" :class="state">
                        </div>
                        <div class="iconBox">
                            <img :src="iconSrc" @click="switchNext" alt="Next" class="next">
                        </div>
                        <div class="iconBox" @mouseover="setVolume1 = true" @mouseout="setVolume1 = false">
                            <img :src="iconSrc" alt="volume" class="volume">
                        </div>
                        <div class="volume" v-show="setVolume1 || setVolume2" 
                        @mouseover="setVolume2 = true" 
                        @mouseout="setVolume2 = false" 
                        @mousedown="setVolume">
                            <div class="unsetted" 
                            :style="{width: '10px', 
                            height: (160 - parseFloat(setted)) + 'px',
                            'background-color': '#333', 
                            'padding-top': '5px', 
                            'border-radius': '5px 5px 0 0'}"></div>
                            <div class="setted" 
                            :style="{width: '10px', 
                            height: setted, 
                            'background-color': '#eee', 
                            'padding-bottom': '5px', 
                            'border-radius': '0 0 5px 5px'}"></div>
                        </div>
                    </div>
                </div>
                <audio :src="musicSrc" preload loop ref="player">
                    <source type="audio/mp3">
                </audio>
            </div>
            <div class="music_list" :class="styleConvert">
                <div class="icon_box" v-show="!listshow">
                    <img :src="iconSrc" class="list_button" title="Play List" alt="Play List" @click="listshow = true; styleConvert = 'back';">
                </div>
                <transition name="list">
                    <div class="play_list" v-show="listshow">
                        <div class="direct">
                            <span>日期</span>
                            <span>歌曲名</span>
                        </div>
                        <div class="hide_scroll">
                            <div class="list_box">
                                <div class="item" v-for="(item,index) in musicList" :key="index" 
                                :style="{backgroundColor: itemBgc[index]}"
                                @click="switchSelected(index)">
                                    <span>{{ item.date }}</span>
                                    <span>{{ (/\/public\/music\/(.*)\s-\s(.*)\.mp3$/.exec(item.url))[1] }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="icon_box">
                            <img :src="iconSrc" class="back_button" title="Go Back" alt="Go Back" @click="listshow = false; styleConvert = 'front';">
                        </div>
                    </div>
                </transition>

            </div>
        </div>
    </diV>
</template>
<script>
export default {
    data: function(){
        return {
            selectedNum: 0,
            state: 'play',
            prevInfo: '已切换至第一首',
            nextInfo: '',

            musicDate: '',
            musicSrc: '',
            musicTitle: '',
            musicArtist: '',
            musicDescription: '',

            // 控制音量调节器的显示
            setted: '80px',
            setVolume1: false,
            setVolume2: false,
            
            imgSrc: '',
            iconSrc: '/public/icon/playerIcon.png',
            musicList: [],
            listshow: false,
            itemBgc: [],
            styleConvert: 'front'
        }
    },
    methods: {
        selectMusic: function (){
            // 判断索引是否越界
            if(this.selectedNum < 0 || this.selectedNum >= this.musicList.length) {
                console.log("Selecting music error!");
                return;
            }

            // 根据音乐文件的url提取出音乐名和歌手名
            let selected = this.musicList[this.selectedNum];
            let reg = /.*\/([^\/]*)\s-\s([^\/]*)\.mp3$/;
            let musicInfo = reg.exec(selected.url);
            
            this.musicTitle = musicInfo[1];
            this.musicArtist = musicInfo[2];
            this.musicDate = selected.date;
            this.musicSrc = selected.url;
            this.imgSrc = '/album/' + musicInfo[1] + ' - ' + musicInfo[2] + '.mp3';
            this.musicDescription = selected.description || "音乐伴孤独，一曲解忧愁。";
            this.$refs.player.volume = parseInt(this.setted) / 160;
        },
        switchPrev: function(){
            this.nextInfo = '';
            if(this.selectedNum === 0){
                alert("已切换至第一首！");
                return;
            }

            if(!this.$refs.player.paused){
                this.$refs.player.pause();
            }else{
                this.state = 'pause';
            }
            
            this.selectedNum --;
            this.selectMusic();
            
            this.$refs.player.load();
            setTimeout(() => {
                this.$refs.player.play();
            }, 500);
        },
        switchNext: function(){
            this.prevInfo = '';
            if(this.selectedNum === (this.musicList.length - 1)){
                alert("已切换至最后一首！");
                return;
            }

            if(!this.$refs.player.paused){
                this.$refs.player.pause();
            }else{
                this.state = 'pause';
            }
            
            this.selectedNum ++;
            this.selectMusic();
            
            this.$refs.player.load();
            setTimeout(() => {
                this.$refs.player.play();
            }, 500);
        },
        playPause: function(){
            if(this.$refs.player.paused){
                this.state = 'pause';
                this.$refs.player.play();
            }else{
                this.state = 'play';
                this.$refs.player.pause();
            }
        },
        setVolume: function(e){
            let topLength = e.layerY;
            if(e.layerY <= 10){
                topLength = 0;
            }
            if(e.layerY >= 170){
                topLength = 170;
            }
            
            this.setted = (170 - topLength) + 'px';
            this.$refs.player.volume = (170 - topLength) / 160;
            document.onmousemove = (e) => {
                topLength = e.layerY;
                this.setted = (170 - topLength) + 'px';
                this.$refs.player.volume = (170 - topLength) / 160;  
            }
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        },
        getItemBgc: function(){
            // 渲染播放列表各表项的背景色
            let arrTemp = [];
            for(let i = 0; i < this.musicList.length; i ++){
                if(i === this.selectedNum){
                    arrTemp[i] = 'rgb(162, 189, 66)';
                    continue;
                }

                if(i % 2 === 0){
                    arrTemp[i] = '#bbb';
                }else{
                    arrTemp[i] = '#999';
                }
            }
            this.itemBgc = arrTemp;
        },
        switchSelected: function(index){
            // 在播放列表选中新的歌曲后切换播放曲目
            if(index === this.selectedNum){
                if(this.$refs.player.paused){
                    this.state = 'pause';
                    setTimeout(() => {
                        this.$refs.player.play();
                    }, 500);
                }

                this.listshow = false;
                this.styleConvert = 'front';
                return;
            }
            
            if(!this.$refs.player.paused){
                this.$refs.player.pause();
            }else{
                this.state = 'pause';
            }
            this.selectedNum = index;
            this.getItemBgc();
            this.selectMusic();

            this.$refs.player.load();
            setTimeout(() => {
                this.$refs.player.play();
            }, 500);

            this.listshow = false;
            this.styleConvert = 'front';
        }
    },
    created: function(){
        let getJsonWait = setInterval(() => {
            if(this.$store.state.jsonObj.music){
                this.musicList = this.$store.state.jsonObj.music;
                this.selectMusic();
                this.getItemBgc();
                clearInterval(getJsonWait);
            }
        }, 300);
    },
    mounted: function(){
        let that = this;
        window.onhashchange = function(){
            if(!that.$refs.player.paused){
                that.state = 'play';
                that.$refs.player.pause();
            }
        }
    }
}
</script>
<style scoped>
div#good-night-music{
    position: relative;
    width: 100%;
    height: 500px;
    margin-bottom: 80px;
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
    font-family: "Arial Black", "Microsoft YaHei";
    font-weight: bold;
}

div.title span.line{
    display: inline-block;
    width: 30%;
    border-top: 1px solid #444;
}

div.main{
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
}

div.main div.left{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    float: left;
    width: 44%;
    height: 94%;
    margin: 3%;
}

div.main div.left div.date{
    color: #222;
    font-size: 32px;
    font-family: "Bell MT", "Harlow Solid Italic", "Arial";
}

div.main div.left div.description{
    color: #444;
    font-size: 26px;
    font-family: "Arial", "华文楷体", "Microsoft YaHei";
    margin: 10px 20px;
    text-indent: 2em;
}

div.main div.right{
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    width: 50%;
    height: 100%;
    background-color: grey;
}

div.main div.right img.album{
    width: 30%;
    height: auto;
    border-radius: 50%;
}

div.main div.right>img.pause{
    transform-origin: 50% 50%;
    animation: rotating 20s linear infinite;
}

@keyframes rotating{
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}

div.main div.right div.player{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    width: 60%;
    height: 50%;
    margin-left: 20px;
    /* background-color: yellow; */
}

div.main div.right div.player div.name{
    color: #444;
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 2px;
    font-family: "Arial", "Microsoft YaHei";
}

div.main div.right div.player div.artist{
    color: #222;
    font-size: 18px;
    letter-spacing: 2px;
    font-family: "Arial", "楷体";
}

div.main div.right div.player div.icons{
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
}

div.main div.right div.player div.icons div.iconBox{
    width: 80px;
    height: 80px;
    margin-right: 30px;
    overflow: hidden;
}

div.main div.right div.player div.icons div.iconBox img{
    height: 100%;
    width: auto;
}

div.main div.right div.player div.icons div.iconBox img.play{
    margin-left: 0;
    cursor: pointer;
}

div.main div.right div.player div.icons div.iconBox img.pause{
    margin-left: -80px;
    cursor: pointer;
}

div.main div.right div.player div.icons div.iconBox img.prev{
    margin-left: -160px;
    cursor: pointer;
}

div.main div.right div.player div.icons div.iconBox img.next{
    margin-left: -240px;
    cursor: pointer;
}

div.main div.right div.player div.icons div.iconBox img.volume{
    margin-left: -320px;
}

div.main div.right div.player div.icons div.volume{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 350px;
    top: -180px;
    width: 40px;
    height: 160px;
    padding: 10px 0;
    /* background-color: yellow; */
}

div.main div.music_list.front{
    position: absolute;
    right: 0;
    bottom: 0;
}

div.main div.music_list.back{
    position: absolute;
    width: 50%;
    height: 100%;
    right: 0;
    bottom: 0;
}


div.main div.music_list>div.icon_box{
    position: absolute;
    width: 36px;
    height: 36px;
    right: 0;
    bottom: 0;
    overflow: hidden;
    /* background-color: blue; */
}

div.main div.music_list div.icon_box img{
    height: 100%;
    width: auto;
    margin-left: -180px;
    cursor: pointer;
}

div.main div.music_list div.play_list{
    width: 100%;
    height: 400px;
    padding: 20px 30px;
    box-sizing: border-box;
    font-family: "Arial", "Microsoft YaHei";
    overflow: hidden;
    background-color: rgb(26, 65, 75);
}

div.main div.music_list div.play_list div.direct{
    font-size: 18px;
    color: #bbb;
}

div.main div.music_list div.play_list div.direct span:nth-child(1){
    display: inline-block;
    width: 120px;
    text-align: center;
}

div.main div.music_list div.play_list div.direct span:nth-child(2){
    display: inline-block;
    padding-left: 30px;
}

div.main div.music_list div.play_list div.hide_scroll{
    width: 90%;
    height: 80%;
    margin-top: 10px;
    overflow: hidden;
}

div.main div.music_list div.play_list div.hide_scroll div.list_box{
    width: 110%;
    height: 100%;
    color: rgb(53, 49, 49);
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #bbb;
}

div.main div.music_list div.play_list div.hide_scroll div.list_box div.item{
    width: 100%;
    height: 24px;
    cursor: pointer;
}

div.main div.music_list div.play_list div.hide_scroll div.list_box div.item span{
    display: inline-block;
    height: 24px;
    line-height: 24px;
}

div.main div.music_list div.play_list div.hide_scroll div.list_box div.item span:nth-child(1){
    width: 120px;
    text-align: center;
}

div.main div.music_list div.play_list div.icon_box{
    position: absolute;
    width: 36px;
    height: 36px;
    right: 0;
    bottom: 0;
    overflow: hidden;
    /* background-color: blue; */
}

div.main div.music_list div.play_list div.icon_box img{
    height: 100%;
    width: auto;
    margin-left: -216px;
    cursor: pointer;
}

.list-enter,
.list-leave-to{
    transform: translateX(100%);
}

.list-enter-active{
    animation: listEnter 0.5s ease;
}

.list-enter-to,
.list-leave{
    transform: translateX(0);
}

.list-leave-active{
    animation: listLeave 0.5s ease;
}

@keyframes listEnter{
    from{
        transform: translateX(100%);
    }
    to{
        transform: translateX(0);
    }
}

@keyframes listLeave{
    from{
        transform: translateX(0);
    }
    to{
        transform: translateX(100%);
    }
}

</style>