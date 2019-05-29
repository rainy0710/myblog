import Vue from "vue"
import VueRouter from "vue-router"
import videoPlayer from '../components/videoplayer.vue'

Vue.use(VueRouter);

let mainRouter = new VueRouter({
    routes: [
        // 添加视频播放器的路由表项
        {
            path: '/videoplay',
            component: videoPlayer
        }
    ]
})

export default mainRouter;