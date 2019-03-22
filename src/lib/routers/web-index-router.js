import VueRouter from 'vue-router'

import login from '../index/login.vue'
import search from '../index/search.vue'

var routerObj = new VueRouter({
    routes: [
        {
            path: '/login',
            component: login
        },
        {
            path: '/search',
            component: search
        }
    ]
})

export default routerObj;