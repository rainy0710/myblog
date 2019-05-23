<template>
    <div id="my-album">
        <p class="title">房屋  婚介  租车  公正</p>
        <div class="slogan">
            <p>或许,你和爱情之间，只有一个网站的距离。</p>
            <p>————某位智者</p>
        </div>
        <div class="poster">
            <transition>
                <img :src="imgSrc" v-bind:title="imgTitle" v-show="aniControl" />
            </transition>
            
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            imgSrc: '/public/images/0.jpg',
            imgTitle: 'Wen Shu Yuan',
            images: [],
            imgNum: 0,
            aniControl: false
        }
    },
    methods: {},
    mounted: function(){
        let that = this;
        
        ajax('GET', '/public/images.json', (xmlhttp) => {
            let json = xmlhttp.responseText;

            this.aniControl = true;
            that.images = JSON.parse(json);
            let imgTimer = setInterval(() => {
                this.aniControl = false;
                that.imgSrc = that.images[that.imgNum].imgSrc;
                that.imgTitle = that.images[that.imgNum].imgTitle;
                that.imgNum = (that.imgNum + 1) % that.images.length;
                setTimeout(() => {
                    this.aniControl = true;
                }, 500);
            }, 8000);
        }, (xmlhttp) => {
            console.log('404 Resource Not Found!');
        });
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
}

.v-enter{
    opacity: 0;
    transform: scale(1, 1);
}

.v-enter-active{
    animation: scroll 8s linear;
}

.v-enter-to,
.v-leave{
    opacity: 1;
    transform: scale(1.2, 1.2);
}

.v-leave-active{
    transform: opacity 0.5s ease;
}


.v-leave-to{
    opacity: 0;
    transform: scale(1.2, 1.2);
}


@keyframes scroll{
    0%{
        transform: scale(1, 1);
        opacity: 0;
    }
    10%{
        opacity: 1;
    }
    100%{
        transform: scale(1.2, 1.2);
    }
}

</style>

