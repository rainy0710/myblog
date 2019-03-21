<template>
    <!--The main page of myBlog.-->
    <div class="box">
        <web-head></web-head>
        <web-body></web-body>
        <web-foot></web-foot>
    </div>
</template>

<script>
import head from './lib/index/web-head.vue'
import body from './lib/index/web-body.vue'
import foot from './lib/index/web-foot.vue'

export default {
    components: {
        webHead: head,
        webBody: body,
        webFoot: foot
    }
    
}
</script>

<style>
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td {
    margin: 0;
    padding: 0;
    border: none;
}

div.box{
    font-family: 'Arial', 'Microsoft YaHei';
    background-color: #eee;
}
</style>


