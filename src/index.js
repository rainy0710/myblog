// 切勿使用vue.runtime.common.js
import Vue from "vue"
import maincom from "./components/maincom.vue"

var app =new Vue({
    el: '#app',
    data: {
        
    },
    methods: {

    },
    components: {
        'main-com': maincom
    }
})
