import Vue from 'vue'
import app from './app.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app)
})