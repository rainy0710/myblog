<template>
    <div id="my-album">
        <div v-for="(item,index) in pics" v-bind:key="item" v-bind:class="'scroll pos' + item">
            <div class="pic" v-bind:style="'background-image: ' + backgroundImg[index]"></div>
        </div>
    </div>
</template>
<script>


export default {
    data: () => {
        return {
            pics: [
                1,2,3,4,5,6
            ],
            backgroundImg: [
                'url("/public/images/001.jpg")',
                'url("/public/images/002.jpg")',
                'url("/public/images/003.jpg")',
                'url("/public/images/004.jpg")',
                'url("/public/images/005.jpg")',
                'url("/public/images/006.jpg")'
            ]
        }
    },
    methods: {


    },
    mounted: function(){
        
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

