<template>
    <div id="my-album">
        <p class="title">房屋  婚介  租车  公正</p>
        <div class="slogan">
            <p>或许，你和爱情之间，只有一个网站的距离。</p>
            <p>————某位智者</p>
        </div>
        <div class="poster">
            <transition>
                <img :src="imgSrc" v-bind:title="imgTitle" v-show="aniControl" ref="img"/>
            </transition>
            
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            imgSrc: '',
            imgTitle: '',
            images: [],
            aniControl: false,
            imgNum: 0
        }
    },
    methods: {},
    mounted: function(){
        let getJsonWait = setInterval(() => {
            if(this.$store.state.jsonObj.images){
                // 控制照片墙动画的开始
                this.aniControl = true;

                // 从vuex中提取出照片数据信息
                this.images = this.$store.state.jsonObj.images;
                if(this.images.length <= 0){
                    console.log('Can\'t get the images.json data.');
                    return;
                }

                // 设计照片墙照片切换以触发动画效果
                this.imgNum = Math.floor(Math.random() * this.images.length);
                this.imgSrc = '/public/images/' + this.imgNum + '.jpg';
                this.imgTitle = this.images[this.imgNum].imgTitle;
                let imgTimer = setInterval(() => {
                    this.aniControl = false;
                    this.imgNum = Math.floor(Math.random() * this.images.length)

                    setTimeout(() => {
                        this.imgTitle = this.images[this.imgNum].imgTitle;
                        this.imgSrc = '/public/images/' + this.imgNum + '.jpg';
                        this.$refs.img.onload = () => {
                            this.aniControl = true;
                        }
                    }, 500);
                }, 8000);

                // 清除循环等待定时器
                clearInterval(getJsonWait);
            }
        }, 300);
    }
}
</script>

<style scoped>
div#my-album{
    position: relative;
    height: 750px;
    overflow: hidden;
}

div#my-album>p.title{
    position: absolute;
    left: 50%;
    top: 200px;
    width: 600px;
    height: 250px;
    line-height: 250px;
    text-align: center;
    margin-left: -300px;
    font-weight: 750;
    font-size: 50px;
    color: #333;
    font-family: "Arial", "Microsoft YaHei";
    background-color: rgba(230, 230, 230, 0.7);
}

div#my-album>div.slogan{
    position: absolute;
    right: 3%;
    top: 600px;
    width: 220px;
    height: 70px;
    color: #eee;
    font-size: 16px;
    font-family: "Arial Black", "楷体", "Microsoft YaHei";
    padding: 20px 40px;
    overflow: hidden;
    background-color: rgba(60, 60, 60, 0.6);
}

div#my-album>div.slogan p:nth-child(2){
    margin-left: 90px;
}

div.poster{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    background-color: #000;
}

div.poster img{
    width: 100%;
    height: auto;
    transform: scale(1.2, 1.2);
}

.v-enter{
    opacity: 0;
    transform: scale(1, 1);
}

.v-enter-active{
    animation: fadein 7.5s linear;
}

.v-enter-to,
.v-leave{
    opacity: 1;
    transform: scale(1.2, 1.2);
}

.v-leave-active{
    animation: fadeout 0.5s linear;
}


.v-leave-to{
    opacity: 0;
    transform: scale(1.2, 1.2);
}


@keyframes fadein{
    0%{
        transform: scale(1, 1);
        opacity: 0;
    }
    10%{
        opacity: 1;
    }
    100%{
        opacity: 1;
        transform: scale(1.2, 1.2);
    }
}

@keyframes fadeout{
    from{
        opacity: 1;
        transform: scale(1.2, 1.2);
    }
    to{
        opacity: 0;
        transform: scale(1.2, 1.2);
    }
}

</style>

