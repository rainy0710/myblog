import Vue from 'vue'
import VueRouter from 'vue-router'
import web from './web.vue'
import router from './lib/routers/web-index-router.js'

Vue.use(VueRouter);

var vm = new Vue({
    el: '#app',
    render: c => c(web),
    router
})