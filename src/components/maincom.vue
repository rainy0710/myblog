<template>
    <div id="main">
        <my-album></my-album>
        <good-night-music></good-night-music>
        <tiktok-video></tiktok-video>
    </diV>
</template>
<script>
import Vue from 'vue'

// 组件引入时最好使用相对路径
import myAlbum from './myalbum.vue'
import goodNightMusic from './goodnightmusic.vue'
import tiktokVideo from './tiktokvideo.vue'

export default {
    data: () => {
        return {
            msg: '这是main组件中的data数据'
        }
    },

    methods: {

    },

    components: {
        'my-album': myAlbum,
        'good-night-music': goodNightMusic,
        'tiktok-video': tiktokVideo
    }
}
</script>
<style>
body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select{
    margin:0;
    padding:0
} 
body{
    font:12px,"Arial Narrow","Microsoft YaHei",HELVETICA;
    background-color: #eee;
    -webkit-text-size-adjust:100%;
} 
a{
    color:#2d374b;
    text-decoration:none;
} 
a:hover{
    color:#cd0200;
    text-decoration:underline;
} 
em{
    font-style:normal;
} 
li{
    list-style:none;
} 
img{
    border:0;
    vertical-align:middle;
} 
table{
    border-collapse:collapse;
    border-spacing:0;
} 
p{
    word-wrap:break-word;
}
</style>