<template>
    <div class="bt_movie">
        <div class="title">
            <span class="line"></span>
            <span class="centerTitle">BT Movie</span>
            <span class="line"></span>
        </div>
        <div class="movie_list">
            <ul>
                <li v-for="(item, index) in movieList" :key="index">
                    <a :href="getMovieUrl(item)"></a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            movieList: []
        }
    },
    methods: {
        getMovieUrl: function(item){
            
        }
    },
    created: function(){
        
    }
}
</script>
<style scoped>
div.bt_movie{
    width: 100%;
    background-color: #999;
}

div.title{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100px;
}

div.title span.centerTitle{
    font-size: 30px;
    font-family: "Arial Black", "Microsoft YaHei";
    font-weight: bold;
}

div.title span.line{
    display: inline-block;
    width: 30%;
    border-top: 1px solid #444;
}
</style>


