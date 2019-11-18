<template>
  <div class="movie-slider">
    <slider height="360px">
      <slider-item>
        <div>
          <img src="http://img5.mtime.cn/mg/2016/11/29/090307.59995664.jpg">
        </div>
      </slider-item>
      <slider-item>
        <div>
          <img src="http://img5.mtime.cn/mg/2016/11/26/090325.11034692.jpg">
        </div>
      </slider-item>
      <slider-item>
        <div>
          <img src="http://img5.mtime.cn/mg/2016/11/28/155750.78638707.jpg">
        </div>
      </slider-item>
    </slider>
  </div>
</template>

<script>
import { Slider, SliderItem } from 'vue-easy-slider'
export default {
  name: 'MovieSlider',
  components: {
    Slider,
    SliderItem
  }
}
</script>

<style lang="stylus" scoped>
</style>
