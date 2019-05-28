<template>
    <div class="video_player" ref="mainbox" v-bind:style="{width: boxWidth, height: boxHeight}" @click=" window.location.hash = '/'; ">
        <video controls ref="videoObj" @click.stop="">
            <source :src="videoSrc" type="video/mp4" />
        </video>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            boxWidth: window.innerWidth + 'px',
            boxHeight: window.innerHeight + 'px',
            videoSrc: ''
        }
    },
    methods: {},
    mounted: function(){
        this.videoSrc = this.$route.query.url;
        if(!this.videoSrc){
            console.log("The source of video can't be found!");
            window.location.hash = '/';
            return;
        }
        this.$refs.videoObj.play();
        this.$refs.videoObj.volume = 0.5;
        window.onscroll = function(){
            window.location.hash = '/';
            window.onscroll = null;
        }
    }
}
</script>
<style scoped>
div.video_player{
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(240, 240, 240, 0.8);
}

video{
    width: auto;
    height: 100%;
    box-shadow: 0 0 10px 5px #111;
}
</style>


