// 切勿使用vue.runtime.common.js
import Vue from "vue"
import Vuex from 'vuex'
import maincom from "./components/maincom.vue"
import rAjax from "../src/lib/rAjax"

// 将引入的rAjax模块设置为全局变量，使得各组件均可调用
global.ajax = rAjax;

// 创建vuex对象，存储Tik-Tok video的视频列表信息
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        boxWidth: 0,
        videoList: []
    },
    mutations: {
        setJson: function(state, jsonData){
            state.videoList = JSON.parse(jsonData);
        },
        setWidth: function(state, newData){
            state.boxWidth = newData;
        }
    }
})

let app =new Vue({
    el: '#app',
    data: {
        
    },
    methods: {

    },
    components: {
        'main-com': maincom
    },
    store: store
})
