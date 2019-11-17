<template>
  <div class="search-view">
    <div class="search-bar" @keyup.enter="searchMovie(1)">
      <el-input v-model="keywords" placeholder="请输入内容" style="width: 600px;" size="large">
        <el-button slot="append" icon="el-icon-search" type="primary" @click="searchMovie(1)" />
      </el-input>
    </div>
    <div class="search-result">
      <mu-list>
        <template v-for="movie in movies">
          <div v-if="movie.id" class="movie-detail" @click="goToMovie(movie.id)" v-bind:key="movie.id">
            <div class="movie-img">
              <img slot="left" :src="movie.poster">
            </div>
            <div slot="right" class="movie-content">
              <br>
              <span>电影名：{{ movie.title }}</span>
              <br>
              <br>
              <span>发行年份：{{ movie.year }}</span>
              <br>
              <span>imdb评分：{{ movie.imdb_rating }}</span>
            </div>
          </div>
        </template>
      </mu-list>
    </div>
    <el-pagination
            v-if=movies
            layout="total, prev, pager, next, jumper"
            style="margin-left: 350px"
            :total="total"
            :page-size=9
            :current-page="page"
            @current-change="searchMovie"
    />
  </div>
</template>

<script>
import movieApi from 'src/api/movieApi'
export default {
  name: 'SearchView',
  data() {
    return {
      keywords: '',
      movies: '',
      page: 1,
      total: null
    }
  },
  mounted() {
    this.keywords = this.$route.query.keywords
    this.searchMovie(this.page)
  },
  methods: {
    goToMovie(id) {
      this.$router.push('/movie/' + id)
    },
    searchMovie(page) {
      this.page = page
      movieApi.searchMovieByTitle(this.keywords, page, true).then((res) => {
        if (res.data['Response'] === 'False') {
          this.$message({ message: res.data['Error'], type: 'warning', duration: 1000, center: true })
        } else {
          this.total = parseInt(res.data.data.total)
          this.movies = res.data.data.projects
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-bar
  margin-top 30px
  margin-left 25%
  margin-bottom 30px
.el-select
  width 115px
.load-more-button
  width 100%
.movie-img
  float left
  width 150px
  height 100px
  margin-left 350px
  img
    width 120px
    height 150px
.movie-content
  width 1000px
  margin-bottom 75px
</style>
