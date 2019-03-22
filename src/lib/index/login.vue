<template>
    <div class="box" v-on:click='cancelLogin' v-on:>
        <div class="login" v-on:click.stop>
            <form action="">
                <label for="account">账号</label>
                <input type="text" id="account">
                <label for="passwd">密码</label>
                <input type="text" id="passwd">
                <input type="button" value="登陆">
                <input type="button" value="注册">
            </form>
        </div>
    </div>
</template>
<script>
export default {
    mounted: function () {
        window.addEventListener('scroll', this.cancelLogin, true);
    },
    methods: {
        cancelLogin: function () {
            location.hash = '/';
        }
    }
}
</script>
<style scoped>
div.box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    z-index: 100;
}

div.box div.login{
    position: absolute;
    top: 30%;
    left: 50%;
    width: 500px;
    height: 300px;
    margin-left: -250px;
    background-color: #ddd;
}

div.box div.login form{
    position: absolute;
    top: 25px;
    left: 25px;
    width: 450px;
    height: 250px;
    border: 1px solid #888;
}

div.box div.login form{

}
</style>


