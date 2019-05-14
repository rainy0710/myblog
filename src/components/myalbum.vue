<template>
    <div id="my-album">
        <div class="scroll" v-for="(item,index) in pics" v-bind:key="index" v-bind:class="pics[index]">
            <div class="pic" v-bind:style="{backgroundImage: backgroundImg[index]}"></div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            shiftPic: 0,
            showPic: 6,
            // 记录相册中可展示的照片总数
            picCount: 22,
            pics: [],
            backgroundImg: []
        }
    },
    methods: {
    },
    created: function(){
        for(let i = 0; i < 6; i ++){
            this.backgroundImg[this.backgroundImg.length] = "url('/public/images/" + i + ".jpg')";
            this.pics.push('pos' + (i + 1));
        }
    },
    mounted: function(){
        let scrollTimer = setInterval(() => {
            // 创建一个临时数组对象以为data中的数组更新做准备
            let arrTemp = [];
            // 迭代修改各个容器的class属性值以修改他们CSS特性
            this.pics.forEach((item, index, arr) => {
                let num = parseInt(item.substring(3));
                arrTemp.push('pos' + (num - 1));
            });
            // 只有model数据的实际值发生变化才会出发view-model层的值更新
            this.pics = arrTemp;
            this.pics[this.shiftPic] = 'pos6'
            
            arrTemp = [];
            this.backgroundImg.forEach((item, index, arr) => {
                if(index === this.shiftPic){
                    arrTemp.push("url('/public/images/" + this.showPic + ".jpg')");
                }else{
                    arrTemp.push(item);
                }
            })
            this.backgroundImg = arrTemp;

            this.showPic = (this.showPic + 1) % this.picCount;
            this.shiftPic = (this.shiftPic + 1) % 6;
        }, 3000);
    }
}
</script>

<style scoped>
div#my-album{
    position: relative;
    height: 420px;
    background-size: cover;
    background-position: center center;
    background-image: url('/public/images/albumImage.jpg');
    overflow: hidden;
}

div.scroll{
    position: absolute;
    transition: all 0.5s ease;
    background-color: #fff;
}

div.pic{
    position: absolute;
    background-color: #000;
    background-size: cover;
    background-position: center center;
    width: 94%;
    height: 94%;
    left: 0;
    top: 0;
    margin: 3% 3%;
}

div.pos1,div.pos5{
    width: 180px;
    height: 240px;
    opacity: 0.6;
    filter: alpha(opacity:60);
}

div.pos2,div.pos4{
    width: 240px;
    height: 320px;
    opacity: 0.85;
    filter: alpha(opacity:85);
}

div.pos0,div.pos6{
    width: 150px;
    height: 200px;
    opacity: 0.3;
    filter: alpha(opacity:30);
}

div.scroll.pos3{
    width: 270px;
    height: 360px;
}

div.pos0{
    left: -25%;
    top: 25%;
}

div.pos1{
    left: 4%;
    top: 20%;
}

div.pos2{
    left: 20%;
    top: 10%;
}

div.pos3{
    left: 41%;
    top: 5%;
}

div.pos4{
    left: 64%;
    top: 10%
}

div.pos5{
    left: 85%;
    top: 20%;
}

div.pos6{
    left: 105%;
    top: 25%;
}

</style>

