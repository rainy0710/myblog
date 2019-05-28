<template>
    <div class="video_player" ref="mainbox" v-bind:style="{width: boxWidth, height: boxHeight}">
        <p>这是播放器组件</p>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            boxWidth: window.innerWidth + 'px',
            boxHeight: window.innerHeight + 'px'
        }
    }
}
</script>
<style scoped>
div.video_player{
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.8);
}
</style>


