import Vue from 'vue'
import web from './web.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(web)
})