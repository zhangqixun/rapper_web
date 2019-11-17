<template>
  <div class="movie-view">
    <div id="content">
      <div id="header">
        <section id="header-left">
          <h1>
            <span id="name" v-text="movie.title" />
            <span id="year" v-text="'(' + movie.year +')'" />
          </h1>
          <div class="article">
            <div class="movie-img" style="float: left; width: 250px">
              <img slot="left" :src="movie.poster" style="width: 200px">
            </div>
            <div slot="right" class="movie-content" style="width: 1000px">
              <span v-show="movie.director">
                <span class="pl">导演：</span>
                <span class="attrs">{{ movie.director }}</span>
                <br>
              </span>
              <span v-show="movie.writer">
                <span class="pl">编剧：</span>
                <span class="attrs">{{ movie.writer }}</span>
                <br>
              </span>
              <span v-show="movie.actors" class="actor">
                <span class="pl">主演：</span>
                <span class="attrs">
                  <span>{{ movie.actors }}</span>
                </span>
                <br>
              </span>
              <span v-show="movie.genre">
                <span class="pl">类型：</span>
                <span class="attrs">{{ movie.genre }}</span>
                <br>
              </span>
              <span v-show="movie.country">
                <span class="pl">制片国家/地区：</span>
                {{ movie.country }}
                <br>
              </span>
              <span v-show="movie.language">
                <span class="pl">语言：</span>
                {{ movie.language }}
                <br>
              </span>
              <span v-show="movie.released">
                <span class="pl">上映日期：</span>
                <span>{{ movie.released }}</span>
                <br>
              </span>
              <span v-show="movie.runtime">
                <span class="pl">片长：</span>
                <span>{{ movie.runtime }}</span>
                <br>
              </span>
              <span v-show="movie.imdbID">
                <span class="pl">IMDb链接：</span>
                <a :href="'https://www.imdb.com/title/' + movie.imdbID">{{ movie.imdbID }}</a>
                <br>
              </span>
              <span v-show="imdbRating">
                <div id="ratingPlace">
                  <span id="ratingLeft" class="pl">IMDb评分：</span>
                  <el-rate id="ratingRight" v-model="imdbRating" :max="10" disabled show-score :colors="['#99A9BF', '#F7BA2A', '#FF9900']" />
                </div>
                <br>
              </span>
            </div>
          </div>
        </section>
      </div>
      <section id="synopsis" class="section-same">
        <h2>剧情简介</h2>
        <div id="synopsis-content">
          {{ movie.plot }}
        </div>
      </section>
      <br><br><br><br><br><br>
      <br>
      <section v-if="movie.awards" id="award" class="section-same">
        <h2>获奖情况</h2>
        {{ movie.awards }}
      </section>
<!--      <section id="also-like-movie" class="section-same">-->
<!--        <h2>喜欢这部电影的人也喜欢</h2>-->
<!--        <div v-for="similarityMovie in movie.similarityMovies" id="also-like-movie-content" v-bind:key="similarityMovie.id">-->
<!--          <dl class="alsoLikeID" @click="goTo(similarityMovie.id)">-->
<!--            <dt>-->
<!--              <a>-->
<!--                <img :src="similarityMovie.poster">-->
<!--              </a>-->
<!--            </dt>-->
<!--            <dd>-->
<!--              <a>{{ similarityMovie.title }}</a>-->
<!--            </dd>-->
<!--          </dl>-->
<!--        </div>-->
<!--      </section>-->
      <section class="like-movies">
        <h2>喜欢这部电影的人也喜欢</h2>
        <div class="border-movie" v-for="similarityMovie in movie.similarityMovies" :key="similarityMovie.id">
          <div class="single-movie" @click="goTo(similarityMovie.id)">
            <img width="100%" height="85%" :src="similarityMovie.poster" >
            <div class="movie-title">
              <label>{{similarityMovie.title}}<span> {{similarityMovie.imdb_rating}}</span></label>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import movieApi from '../api/movieApi'
import userApi from '../api/userApi'
import { mapGetters } from 'vuex'
export default {
  name: 'MovieView',
  data() {
    return {
      movie: '',
      second: 0
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'login'
    ]),
    imdbRating: {
      get: function() {
        return parseFloat(this.movie.imdbRating)
      },
      set: function() {
      }
    }
  },
  mounted() {
    this.get_one_movie()
    setInterval(() => {
      this.second++
    }, 1000)
  },
  destroyed() {
    if (this.login !== false) {
      var data = {
        'token': this.token,
        'movie_title': this.movie.title,
        'movie_id': this.movie.id,
        'time_on_site': String(this.second)
      }
      userApi.insertRecord(data)
    }
  },
  methods: {
    get_one_movie() {
      var id = this.$route.params.id
      movieApi.searchMovieByID(id)
        .then((res) => {
          this.movie = res.data.data
        })
      movieApi.similarityMovieByID(id).then((res) => {
        this.$set(this.movie, 'similarityMovies', res.data.data)
      })
    },
    goTo(id) {
      this.$router.replace('/movie/' + id)
      this.get_one_movie()
    }
  }
}

</script>

<style lang="stylus" scoped>
  .movie-img
  float left
  width 150px
  height 100px
  margin-left 150px
  img
    width 120px
h2
  color:#7e57c2;

h1
  font-size:25px;
  font-weight:bold;
  color:#494949;
  line-height:1.1;
a
  color:#0085DD;
.section-same
  width:1000px;
  float:left;
  margin-left:10%;
  margin-right:10%;
#header
  width:1000px;
  margin-left:10%;
  margin-right:10%;
  margin-top: 20px;
#cover
  .nbgnbg
    img
      width:70%;
#header-left
  float:left;
  width: 1200px;
#header-right
  padding-top:50px;
  margin-left:600px;
  width: 500px;
#comment-btn
  width:80px;
  color:#ca6445;
  background:#fae9da;
#rating-btn
  margin-left: 50%;
  width:80px;
  color:#ca6445;
  background:#fae9da;
.comment-author
  color:#0085DD;
#synopsis-content
  width:1000px;

#photo
  ul
    float:left;
    li
      float:left;
      img
        height:100px;
#also-like-movie-content
  float:left;
  dl
    float:left;
    img
      height:250px;
#ratingPlace
  float:left;
#ratingLeft
  float:left;
#ratingRight
  float:left;
#commentSubmit
  float:right;
#commentCancle
  float:left;
.alsoLikeID
  margin: 10px 10px 10px 10px
.like-movies
  width:1000px;
  margin-left:10%;
  margin-right:10%;
  float: left;
  height 600px
  h3
    border-bottom 1px solid #d0d0d0
    padding-bottom 15px
  @media screen and (min-width: 1201px) {
    .today-movies {width: 1200px}
  }
  @media screen and (max-width: 1200px) {
    .today-movies {width: 900px}
  }
  @media screen and (max-width: 900px) {
    .today-movies {width: 200px;}
  }
  @media screen and (max-width: 500px) {
    .today-movies {width: 100px;}
  }
.border-movie
  width: 20%
  height 47%
  float left
.single-movie
  height 100%
  width 80%
  margin-top 10%
  margin-left 2%
.movie-title
    text-align center
    padding 0px
    font-size 12px
    margin-bottom 10px
.movie-title span
    color #FFA042
</style>
