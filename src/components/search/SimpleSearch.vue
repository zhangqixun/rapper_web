<template>
  <div class="simple-search" @keyup.enter="onSearch" @mouseover="changeMouseStatus(true)">
    <mu-text-field v-model="searchKeywords" class="appbar-search-field"  slot="right" hintText="请输入搜索内容"/>
    <div v-if="searchKeywords!=='' && isMouseOver" class="search-suggest">
      <span class="close-search-suggest" @click="changeMouseStatus(false)">关闭</span>
      <mu-list>
        <mu-list-item v-if="suggestion.id" style="margin-top: 25px" v-bind:key="suggestion.title" :title="suggestion.title" @click="goToMovie(suggestion.id)" v-for="suggestion in suggestions">
          <img :src="suggestion.poster" slot="left">
        </mu-list-item>
      </mu-list>
  </div>
  </div>
</template>

<script>
import _ from 'lodash'
import movieApi from '../../api/movieApi'
export default {
  name: 'SimpleSearch',
  data() {
    return {
      isMouseOver: false,
      searchKeywords: '',
      suggestions: ''
    }
  },
  methods: {
    goToMovie(id) {
      this.suggestions = ''
      this.isMouseOver = false
      this.$router.push('/movie/' + id)
    },
    onSearch() {
      this.suggestions = ''
      this.isMouseOver = false
      this.$router.push('/search?keywords=' + this.searchKeywords)
      this.searchKeywords = ''
    },
    changeMouseStatus(isOver) {
      this.isMouseOver = isOver
    },
    getSuggestionMovie:
      _.debounce(function() {
        movieApi.searchMovieByTitle(this.searchKeywords, 1, false).then((res) => {
          this.suggestions = res.data.data.projects
        })
      }, 500)
  },
  watch: {
    searchKeywords() {
      this.getSuggestionMovie()
    }
  }
}
</script>

<style lang="stylus" scoped>
.simple-search
  .search-suggest
    margin 0 auto
    width 260px
    background #eee
    position fixed
    z-index 999
    img
      width 50px
    .close-search-suggest
      float right
      color red
      cursor pointer

</style>
