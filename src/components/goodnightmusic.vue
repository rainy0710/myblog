<template>
    <div id="good-night-music">
        <div class="title">
            <span class="leftline"></span>
            Good-Night-Music
            <span class="rightline"></span>
        </div>
        <div class="todaymusic">
            <div class="words" v-text="words"></div>
            <div class="player">
                <audio preload loop>
                    <source v-bind:src="mp3Src" type="audio/mp3">
                    <source v-bind:src="wavSrc" type="audio/wav">
                </audio>
            </div>
            

        </div>
    </diV>
</template>
<script>
export default {
    data: function(){
        return {
            mp3Src: '/public/music/当你走了 - 吾尊.mp3',
            wavSrc: '/public/music/当你走了 - 吾尊 (mp3cut.net).wav',
            words: '当你走了，我也哭了',
            musicList: []
        }
    },
    methods: {
        musicPlay: function(url){

        }
    },
    created: function(){

    }
}
</script>
<style scoped>
div#good-night-music{
    background-color: yellow;
}
</style>