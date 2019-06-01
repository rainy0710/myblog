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
                    <a :href="getMovieUrl(item)" class="unselected" @mouseover="mouseOn" @mouseout="mouseOut">{{ item.name }}</a>
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
        // 获取a标签的跳转链接，后台视频链接接口为：/btmovie/movie.mp4?age=2019&rate=10
        getMovieUrl: function(item){
            return '/btmovie/' + item.name + '.mp4';
        },
        mouseOn: function(e){
            e.target.setAttribute('class', 'selected');
        },
        mouseOut: function(e){
            e.target.setAttribute('class', 'unselected');
        }
    },
    created: function(){
        ajax('GET', '/public/movie.json', (xmlhttp) => {
            this.movieList = JSON.parse(xmlhttp.responseText);
        }, (xmlhttp) => {
            console.log('404 Not found the movie.json file.');
        })
    }
}
</script>
<style scoped>
div.bt_movie{
    width: 100%;
    padding-bottom: 30px; 
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

div.movie_list{
    position: relative;
    width: 90%;
    margin: 0 auto;
    
}

div.movie_list li{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 275px;
    height: 60px;
    box-sizing: border-box;
    /* background-color: yellow; */
}

div.movie_list li a{
    font-size: 26px;
    font-family: "Microsoft JhengHei", "Arial Unicode MS", "Bell MT", "Arial", "Microsoft YaHei", "";
    font-weight: bold;
    text-decoration: none;
    transition: all 0.5s ease;
    box-sizing: border-box;
    /* background-color: blue; */
}

div.movie_list li a.selected{
    color: #111;
    text-shadow: 3px 3px 5px #111;
}

div.movie_list li a.unselected{
    color: #333;
    text-shadow: 0 0 1px #333;
}

</style>


