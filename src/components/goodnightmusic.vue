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
                    <source v-bind:src="musicSrc" type="audio/mp3">
                </audio>

            </div>
        </div>
    </diV>
</template>
<script>
export default {
    data: function(){
        return {
            musicSrc: '',
            words: '',
            musicList: []
        }
    },
    methods: {
        selectMusic: function (url){

        }
    },
    created: function(){
        ajax('GET', '/public/music.json', (xmlhttp) => {
            let json = xmlhttp.responseText;
            this.musicList = JSON.parse(json);
        })
    }
}
</script>
<style scoped>
div#good-night-music{
    background-color: yellow;
}
</style>