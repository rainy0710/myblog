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
        // 使用jsonObj存储来自good-night-music、照片墙和BT-Movie的数据，存储为{music:[], images:[], movie:[]}的形式
        jsonObj: {
            test: "这是测试数据"
        }
    },
    mutations: {
        setJson: function(state, jsonData){
            state.jsonObj = JSON.parse(jsonData);
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
    created: function(){
        ajax("GET", '/public/data.json', (xmlhttp) => {
            this.$store.commit('setJson', xmlhttp.responseText);
        }, (xmlhttp) => {
            console.log("Error when request json data from the http server.");
        })
    },
    store: store
})
