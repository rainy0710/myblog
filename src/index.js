// 切勿使用vue.runtime.common.js
import Vue from "vue"
import maincom from "./components/maincom.vue"
import rAjax from "../src/lib/rAjax"

// 将引入的rAjax模块设置为全局变量，使得各组件均可调用
global.ajax = rAjax;

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
