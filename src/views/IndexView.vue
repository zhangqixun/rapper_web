<template>
  <div class="index-view">
    <div class="wrapper">
      <hot-movies />
    </div>
    <div class="wrapper">
      <today-movies />
    </div>
    <div class="wrapper">
        <user-movies />
    </div>
  </div>
</template>

<script>
import TodayMovies from '../components/index/TodayMovies.vue'
import HotMovies from '../components/index/HotMovies.vue'
import UserMovies from '../components/index/UserMovies'
export default {
  name: 'IndexView',
  components: {
    TodayMovies,
    HotMovies,
    UserMovies
  },
  computed: {
    login() {
      return this.$store.state.user.login
    }
  }
}
</script>

<style lang="stylus" scoped>
h1
  background rgba(110, 86, 117, 0.22)
.index-view
  height auto
  overflow hidden
.wrapper
  margin 20px auto
</style>
