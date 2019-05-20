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
                    </div>
                </div>
                <audio preload loop ref="player">
                    <source :src="musicSrc" type="audio/mp3">
                </audio>
            </div>
        </div>
    </diV>
</template>
<script>
export default {
    data: function(){
        return {
            selectedNum: 0,
            state: '',
            prevInfo: '已切换至第一首',
            nextInfo: '',

            musicDate: '',
            musicSrc: '',
            musicTitle: '',
            musicArtist: '',
            musicDescription: '',
            
            imgSrc: '/public/images/defaultCover.jpg',
            iconSrc: '/public/icon/playerIcon.png',
            musicList: []
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
            let reg = /.*\/([^-\/\.]*)\s-\s([^-\/\.]*)\.mp3$/;
            let musicInfo = reg.exec(selected.url);
            
            this.musicTitle = musicInfo[1];
            this.musicArtist = musicInfo[2];
            this.musicDate = selected.date;
            this.musicSrc = selected.url;
            this.musicDescription = selected.description;
        },
        switchPrev: function(){
            this.nextInfo = '';
            if(this.selectedNum === 0){
                this.prevInfo = '已切换至第一首';
                return;
            }

            if(!this.$refs.player.paused){
                this.$refs.player.pause();
            }else{
                this.state = 'pause';
            }
            
            this.selectedNum --;
            this.selectMusic();
            
            this.$refs.player.play();
        },
        switchNext: function(){
            this.prevInfo = '';
            if(this.selectedNum === (this.musicList.length - 1)){
                this.nextInfo = '已切换至最后一首';
                return;
            }

            if(!this.$refs.player.paused){
                this.$refs.player.pause();
            }else{
                this.state = 'pause';
            }
            
            this.selectedNum ++;
            this.selectMusic();
            
            this.$refs.player.play();
        },
        playPause: function(){
            if(this.$refs.player.paused){
                this.state = 'pause';
                this.$refs.player.play();
                console.log('start playing!');
            }else{
                this.state = 'play';
                this.$refs.player.pause();
                console.log('stop playing!');
            }
        }

    },
    created: function(){
        ajax('GET', '/public/music.json', (xmlhttp) => {
            this.musicList = JSON.parse(xmlhttp.responseText);
            this.selectMusic();
        })
    }
}
</script>
<style scoped>
div#good-night-music{
    position: relative;
    width: 100%;
    height: 500px;
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
    border-top: 1px solid #222;
}

div.main{
    position: relative;
    width: 100%;
    height: 400px;
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
        transform: rotate(-360deg);
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
    display: flex;
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
}

div.main div.right div.player div.icons div.iconBox img.pause{
    margin-left: -80px;
}

div.main div.right div.player div.icons div.iconBox img.prev{
    margin-left: -160px;
}

div.main div.right div.player div.icons div.iconBox img.next{
    margin-left: -240px;
}
</style>