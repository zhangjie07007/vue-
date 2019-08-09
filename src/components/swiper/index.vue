<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item) in datalist" :key="item.bannerId">
        <img class="swiperimg" :src="item.imgUrl" alt />
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
export default {
  data() {
    return {
      datalist: []
    };
  },
  mounted() {
    this.axios({
      url: "https://m.maizuo.com/gateway?type=2&cityId=110100&k=6711783",
      method: "get",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1563888146987842478543"}',
        "X-Host": "mall.cfg.common-banner"
      }
    }).then(res => {
      // console.log(res.data.data);
      this.datalist = res.data.data;
      this.$nextTick(() => {
        let swiper = new Swiper(".swiper-container", {
          loop: true, // 循环模式选项
          autoplay: {
            delay: 1500,
            stopOnLastSlide: true,
            disableOnInteraction: true
          },
          pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true
            // dynamicMainBullets: 2
          }
          // effect: "fade"
        });
      });
    });
  }
};
</script>
<style lang="scss" scoped>
.swiper-wrapper div {
  line-height: 200px;
  font-size: 32px;
  font-weight: 600;
}
.swiperimg {
  width: 100%;
}
</style>


