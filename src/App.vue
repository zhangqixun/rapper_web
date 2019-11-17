<template>
  <div id="app">
    <div class="header">
      <mu-appbar>
        <div class="inner">
          <router-link to="/" exact>
            <img class="logo" src="./assets/cat.png" alt="logo">
          </router-link>
          <router-link to="/">首页</router-link>
          <router-link to="/find">发现电影</router-link>
        </div>
        <div slot="right" class="search-bar">
          <simple-search />
        </div>
        <el-button
          v-if="!login"
          slot="right"
          type="primary"
          @click="goTo('/login')"
        >登录/注册</el-button>
        <img
          v-if="login"
          slot="right"
          :src="defaultAvatar"
          style="width: 60px;height: 45px"
          @click="toggle(true)"/>
        <mu-drawer right :open="open" :docked="docked" width="200" @close="toggle()">
          <mu-appbar title="个人中心">
            <mu-icon-button slot="left" icon="menu" @click="toggle()" />
          </mu-appbar>
          <mu-list @itemClick="toggle()">
            <mu-list-item title="信息管理" @click="goTo('/accounts')">
              <mu-icon slot="left" value="info" />
            </mu-list-item>
            <mu-list-item title="浏览记录" @click="goTo('/history')">
              <mu-icon slot="left" value="history" />
            </mu-list-item>
            <mu-list-item title="退出登录" @click="logout">
              <mu-icon slot="left" value="input" />
            </mu-list-item>
          </mu-list>
        </mu-drawer>
      </mu-appbar>
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="view" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import defaultAvatar from './assets/avatar.png'
import SimpleSearch from './components/search/SimpleSearch'

export default {
  components: {
    SimpleSearch
  },
  data() {
    return {
      defaultAvatar,
      stompClient: null,
      open: false,
      docked: true
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ]),
    login() {
      return this.$store.state.user.login
    }
  },
  methods: {
    goTo(route) {
      this.$router.push(route)
    },
    logout() {
      var data = { Token: this.token }
      this.$store.dispatch('doLogout', data)
      this.$router.push('/')
    },
    toggle(flag) {
      this.open = !this.open
      this.docked = !flag
    }
  }
}
</script>

<style lang="stylus">
    body
        font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
        background-color lighten(#eceef1, 30%)
        margin 0

    a
        color #34495e
        text-decoration none

    .header
        z-index 999
        max-width 100%
        height 55px
        top 0
        left 0
        right 0

        .inner
            padding-left 100px
            font-size 16px
            font-family "Microsoft YaHei"

            a
                color rgba(255, 255, 255, .8)
                line-height 24px
                transition color .15s ease
                display inline-block
                vertical-align middle
                font-weight 300
                letter-spacing .075em
                margin-right 1.8em

                &:hover
                    color #fff

                &.router-link-active
                    color #fff
                    font-weight 400

        .search-bar
            width 300px
            margin-right 100px

        .avatar
            margin-left 35px
            margin-right 15px

            img
                width 135%

    .logo
        width 24px
        margin-right 10px
        display inline-block
        vertical-align middle

    .view
        padding 0 100px
        margin 0 auto
        position relative

    .fade-enter-active, .fade-leave-active
        transition all .2s ease

    .fade-enter, .fade-leave-active
        opacity 0

    @media (max-width 860px)
        .header .inner
            padding 15px 30px

    @media (max-width 600px)
        body
            font-size 14px

        .header
            .inner
                padding 15px

            a
                margin-right 1em

            .github
                display none

    /* 个人中心统一样式 */
    .personal-center
        width 980px
        margin-top 80px
        margin-left auto
        margin-right auto
        padding 0
        padding-bottom 60px

        .menu
            border 1px solid #d8d8d8
            border-radius 3px

            h2
                margin-top 0
                margin-bottom 0
                padding 8px 10px 8px 20px
                border-bottom 1px solid #eee
                border-top-radius 2px
                background-color #f7f7f7

            .menu-item
                display block
                padding 8px 10px 8px 24px
                border-bottom 1px solid #eee
                cursor pointer

            a
                color #111

        .input-button
            border-radius 3px
            width 102px
            height 32px
            background-color #eee
            border 1px solid #e9e9e9
            font-size 14px
            box-shadow 0px 1px 1px rgba(0, 0, 0, 0.3)
            cursor pointer

            &:hover
                border 1px solid #d1d1d1
</style>
