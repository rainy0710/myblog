<template>
    <div class="box" v-on:click='cancelLogin' v-on:>
        <div class="login" v-on:click.stop>
            <form action="">
                <label for="account">账号:</label>
                <input type="text" id="account">
                <label for="passwd">密码:</label>
                <input type="password" id="passwd">
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
    background-color: rgba(0,0,0,0.5);
    z-index: 100;
}

div.box div.login{
    position: absolute;
    top: 30%;
    left: 50%;
    width: 500px;
    height: 300px;
    margin-left: -250px;
    background-color: #aaa;
}

div.box div.login form{
    position: absolute;
    top: 25px;
    left: 25px;
    width: 450px;
    height: 250px;
    border: 1px dotted #888;
}

div.box div.login form label{
    position: absolute;
    width: 50px;
    height: 30px;
    font-size: 16px;
    color: #666;
    line-height: 30px;
    /* background-color: yellow; */
}

div.box div.login form label:nth-child(1){
    top: 70px;
    left: 100px;
}

div.box div.login form label:nth-child(3){
    top: 120px;
    left: 100px;
}

div.box div.login form input[type="text"],input[type="password"]{
    position: absolute;
    width: 200px;
    height: 30px;
    font-size: 15px;
    color: #333;
    line-height: 30px;
    background-color: white;
}

div.box div.login form input:nth-child(2){
    top: 70px;
    left: 150px;
}

div.box div.login form input:nth-child(4){
    top: 120px;
    left: 150px;
}

div.box div.login form input[type="button"]{
    position: absolute;
    width: 80px;
    height: 30px;
    font-size: 16px;
    color: #666;
    line-height: 30px;
    text-align: center;
    border: 1px solid grey;
    background-color: white;
}

div.box div.login form input[type="button"]:nth-child(5){
    top: 200px;
    left: 100px;
}

div.box div.login form input[type="button"]:nth-child(6){
    top: 200px;
    right: 100px;
}
</style>


