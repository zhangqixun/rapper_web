<template>
  <div class="hot-movies">
    <h3> {{msg}} </h3>
    <slider>
      <slider-item>
        <div>
          <img width="75%" height="300" src="http://img5.mtime.cn/mg/2016/11/29/090307.59995664.jpg">
          <div class="hot_movie_context">
            <label>海洋奇缘&nbsp;<span>2016</span></label>
            <el-rate v-model="value5" disabled show-text text-color="#ff9900">
            </el-rate>
            <div class="hot_movie_introduce">
              <label>导演&nbsp;&nbsp;罗恩·克莱蒙兹</label><br>
              <label>演员&nbsp;&nbsp;奥丽依·卡拉瓦霍</label>
            </div>
            <div class="hot_movie_comment">
              <label>推荐理由</label><br>
              <p>航海世家后代的波利尼西亚公主莫阿娜，为了找寻传说中的神秘之岛，独自踏上了航海之旅的故事。</p>
            </div>
          </div>
        </div>
      </slider-item>
      <slider-item>
        <div>
          <img width="75%" height="300" src="http://img5.mtime.cn/mg/2016/11/28/155750.78638707.jpg">
          <div class="hot_movie_context">
            <label>海洋奇缘&nbsp;<span>2016</span></label>
            <el-rate v-model="value5" disabled show-text text-color="#ff9900">
            </el-rate>
            <div class="hot_movie_introduce">
              <label>导演&nbsp;&nbsp;罗恩·克莱蒙兹</label><br>
              <label>演员&nbsp;&nbsp;奥丽依·卡拉瓦霍</label>
            </div>
            <div class="hot_movie_comment">
              <label>推荐理由</label><br>
              <p>航海世家后代的波利尼西亚公主莫阿娜，为了找寻传说中的神秘之岛，独自踏上了航海之旅的故事。</p>
            </div>
          </div>
        </div>
      </slider-item>
    </slider>
  </div>
</template>

<script>
import { Slider, SliderItem } from 'vue-easy-slider'
export default {
  name: 'HotMovies',
  data() {
    return {
      msg: '正在热映的电影',
      value5: 4.7
    }
  },
  components: {
    Slider,
    SliderItem
  }
}
</script>

<style lang="stylus" scoped>
.hot-movies
  height 350px
  margin 0px auto
@media screen and (min-width: 1201px) {
  .hot-movies {width: 1200px}
}
@media screen and (max-width: 1200px) {
  .hot-movies {width: 900px}
}
@media screen and (max-width: 900px) {
  .hot-movies {width: 200px;}
}
@media screen and (max-width: 500px) {
  .hot-movies {width: 100px;}
}
.hot-movies h3
  border-bottom 1px solid #d0d0d0
  padding-bottom 15px
.hot_movie_context
  background #F0F0F0
  height 300px
  width 320px
  padding-top 30px
  padding-left 25px
  padding-right 20px
  margin-top -305px
  margin-left 75%
.hot_movie_context label
  font-size 20px
  color #004B97
.hot_movie_context label span
  font-size 16px
  color #000000
.hot_movie_context .hot_movie_introduce
  margin-top 20px
.hot_movie_context .hot_movie_introduce label
  font-size 16px
  color #000000
.hot_movie_context .hot_movie_comment
  margin-top 30px
.hot_movie_context .hot_movie_comment label
  font-size 18px
  color #0066CC
.hot_movie_context .hot_movie_comment p
  font-size 12px
  color #ADADAD
</style>
