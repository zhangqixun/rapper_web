<template>
  <div class="browsing-history">
    <h3>浏览记录</h3>
    <div class="table-wrapper">
      <table class="table-normal">
        <thead>
          <tr>
            <td width="34%">
              时间
            </td>
            <td width="66%">
              电影
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in movies" v-bind:key="item.id">
            <td>{{item.created_time}}</td>
            <td>{{item.movie_title}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userApi from '../../api/userApi'
export default {
  name: 'BrowsingHistory',
  data() {
    return {
      movies: ''
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  mounted() {
    const data = {
      'Token': this.token
    }
    userApi.getRecord(data).then(res => {
      res.data.data.map(item => {
        item.created_time = this.formatTime(item.created_time)
      })
      this.movies = res.data.data
    })
  },
  methods: {
    formatTime(timestamp) {
      const date = new Date(timestamp * 1000)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    }
  }
}
</script>
<style lang="stylus" scoped>
.browsing-history
  .table-wrapper
    margin-top 10px
    margin-bottom 20px
    border 1px solid #ddd
    border-radius 2px
    .table-normal
      width 100%
      height 100%
      border-collapse collapse
      border-spacing 2px
      border-color grey
      vertical-align middle
      thead
        display table-header-group
        vertical-align middle
        border-color inherit
        tr
          td
            text-align center
            background #f5f5f5
            height 42px
            border-bottom 1px solid #ddd
            border-left 1px solid #ddd
            font-weight bold
      tbody
        tr
          td
            text-align center
            height 40px
            border-left 1px solid #ddd
            border-bottom 1px solid #ddd
</style>
