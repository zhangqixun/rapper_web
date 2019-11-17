<template>
    <div class="find-view">
        <h2>电影导航</h2>
        <div class="button_index">
            <mu-flat-button v-for="type in typeList" :key="type" :label="type" class="demo-flat-button" @click="chooseType(type)" :backgroundColor="type===current_type?'#0066CC':''" :color="type===current_type?'#FFFFFF':''"/>
        </div>
        <div class="movies-result">
            <div class="border-movie" v-if="movie.id" v-for="movie in movies" :key="movie.id">
                <div class="single-movie" @click="goToMovie(movie.id)" @mouseenter="change_movieclass(movie)" @mouseleave="re_movieclass()">
                <img width="100%" height="85%" :src="movie.poster" >
                <div class="movie-title">
                    <label>{{movie.title}}<span> {{movie.imdb_rating}}</span></label>
                </div>
            </div>
                <div v-if="current_movie === movie" class="movie_context_active">
                    <div class="movie_context">
                        <label>{{movie.title}}<span> {{movie.year}}</span></label>
                        <div class="movie_rate">
                            <el-rate :max=10 v-model="rating" disabled show-text text-color="#ff9900">
                            </el-rate>
                        </div>
                        <div class="movie_type">
                            <label>{{movie.runtime}}&nbsp;&nbsp;&nbsp;&nbsp;<label>{{movie.country}}</label></label>
                        </div>
                        <div class="movie_members">
                            <label>导演&nbsp;&nbsp;&nbsp;&nbsp;{{movie.director}}</label><br>
                            <label>演员&nbsp;&nbsp;&nbsp;&nbsp;{{movie.actors}}</label>
                        </div>
                    </div>
                    <div class="movie_comment">
                        {{movie.plot.substring(0,100)}}...
                    </div>
                </div>
            </div>
        </div>
        <el-pagination
                v-if=movies
                layout="total, prev, pager, next, jumper"
                style="float: left;margin-left: 300px;margin-top: 40px;margin-bottom: 20px"
                :total="total"
                :page-size=9
                :current-page="page"
                @current-change="fetchData"
        />
    </div>
</template>

<script>
  import movieApi from 'src/api/movieApi'
  export default {
    name: 'FindView',
    data() {
      return {
        current_type: '',
        typeList: ['纪录', '音乐', '体育', '短片', '惊悚', '神秘', '喜剧', '犯罪', '历史', '传记', '冒险', '爱情', '动作', '戏剧', '西方', '战争', '恐怖', '动画', '科幻', '家庭'],
        typeMap: ['Documentary', 'Music', 'Sport', 'Short', 'Thriller', 'Mystery', 'Comedy', 'Crime', 'History', 'Biography', 'Adventure', 'Romance', 'Action', 'Drama', 'Western', 'War', 'Horror', 'Animation', 'Sci-Fi', 'Family'],
        current_movie: '',
        movies: '',
        page: 1,
        total: null
      }
    },
    methods: {
      chooseType(arg) {
        this.current_type = arg
        this.fetchData(this.page)
      },
      fetchData(page) {
        this.page = page
        this.movies = ''
        const type = this.typeMap[this.typeList.indexOf(this.current_type)]
        movieApi.getMovieByType(type, this.page).then((res) => {
          this.total = res.data.data.total
          this.movies = res.data.data.projects
        })
      },
      change_movieclass: function(arg) {
        this.current_movie = arg
      },
      re_movieclass: function() {
        this.current_movie = ''
      },
      goToMovie: function(id) {
        this.$router.push('/movie/' + id)
      }
    },
    computed: {
      rating() {
        return parseFloat(this.current_movie.imdb_rating)
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .find-view
        width 1400px
        height auto
        overflow hidden
    @media screen and (min-width: 1201px) {
        .find-view {width: 1400px}
    }
    @media screen and (max-width: 1200px) {
        .find-view {width: 900px}
    }
    @media screen and (max-width: 900px) {
        .find-view {width: 200px;}
    }
    @media screen and (max-width: 500px) {
        .find-view {width: 100px;}
    }
    .find-view .movies-result
        width 1100px
        height 550px
        margin 0px auto
    @media screen and (min-width: 1201px) {
        .find-view .movies-result {width: 1100px}
    }
    @media screen and (max-width: 1200px) {
        .find-view .movies-result {width: 900px}
    }
    @media screen and (max-width: 900px) {
        .find-view .movies-result {width: 200px;}
    }
    @media screen and (max-width: 500px) {
        .find-view .movies-result {width: 100px;}
    }
    .border-movie
        width 20%
        height 45%
        float left
        margin-left 10%
    .single-movie
        height 95%
        width 75%
        margin-top 10%
        margin-left 2%
    .single-movie:hover
        cursor pointer
    .movie_context_active
        border 1px solid #C0C0C0
        background rgb(255,255,255)
        height 300px
        width 300px
        margin-top -315px
        margin-left 80%
        float left
        position relative
        z-index 1999
        display block
    .movie_context
        width 100%
        height 80%
        text-align left
        font-size 16px
        color #4682B4
        padding 10px 10px 10px 20px
        border-bottom 1px solid #DCDCDC
    .movie_context label span
        color #7B7B7B
        font-size 12px
    .movie_context .movie_rate
        margin-top 5px
    .movie_context .movie_type
        margin-top 10px
        color #4F4F4F
        font-size 14px
    .movie_context .movie_members
        margin-top 15px
        color #4F4F4F
        font-size 14px
    .movie_context .movie_members label
        padding-bottom 10px
    .movie_comment
        width 100%
        height 30%
        background #F5F5F5
        padding 10px 10px 10px 10px
    .movie-title
        text-align center
        padding 0px
        font-size 12px
        margin-bottom 10px
    .movie-title span
        color #FFA042
    h2
        text-align center
    .index-movies
        margin 20px auto
        height 300px
    .button_index
        padding 0px
        border-bottom 1px solid #BEBEBE
    @media screen and (min-width: 1201px) {
        .button_index {width: 1140px}
    }
    @media screen and (max-width: 1200px) {
        .button_index {width: 1140px}
    }
    @media screen and (max-width: 900px) {
        .button_index {width: 200px;}
    }
    @media screen and (max-width: 500px) {
        .button_index {width: 100px;}
    }
    .demo-flat-button
        margin 12px
    .select_index
        border-top 1px solid #BEBEBE
        height 80px
    @media screen and (min-width: 1201px) {
        .select_index {width: 1100px}
    }
    @media screen and (max-width: 1200px) {
        .select_index {width: 900px}
    }
    @media screen and (max-width: 900px) {
        .select_index {width: 200px;}
    }
    @media screen and (max-width: 500px) {
        .select_index {width: 100px;}
    }
    .demo-flat-button
        margin: 12px
    .select_title
        width 140px
        margin 20px
        float left
        padding 5px
    .select_title label
        font-size 18px
        margin-left 50px
    .select_input
        width 200px
        margin 20px 0px 20px 30px
        float left
    .load-more-button
        width 100%
        margin 20px 0px 20px 0px
</style>
