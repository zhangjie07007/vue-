<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isLoading" />
      <Scroller v-else ref="citylist">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="(item) in hotcity"
                :key="item.id"
                @tap="tocity(item.nm,item.id)"
              >{{item.nm}}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city">
            <div>
              <h2 v-for="item in citylist" :key="item.index">
                {{item.index}}
                <ul>
                  <li
                    v-for="item1 in item.list"
                    :key="item1.id"
                    @tap="tocity(item1.nm,item1.id)"
                  >{{item1.nm}}</li>
                </ul>
              </h2>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(item,index) in citylist" :key="item.index" @click="tolist(index)">{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getcitylist } from "../../api";
export default {
  name: "City",
  data() {
    return {
      citylist: [],
      hotcity: [],
      isLoading: true
    };
  },
  mounted() {
    if (localStorage.getItem("citylist") && localStorage.getItem("hotcity")) {
      this.citylist = JSON.parse(localStorage.getItem("citylist"));
      this.hotlist = JSON.parse(localStorage.getItem("hotlist"));
      this.isLoading = false
    } else {
      getcitylist().then(res => {
          console.table(res.data.data.cities);
        let { citylist, hotcity } = this.getlist(res.data.data.cities);
        this.citylist = citylist;
        this.hotcity = hotcity;
        localStorage.setItem("citylist", JSON.stringify(citylist));
        localStorage.setItem("hotcity", JSON.stringify(hotcity));
        this.isLoading = false;
        console.log(this.citylist);
      });
    }
  },
  methods: {
    getlist(cities) {
      let citylist = [];
      let hotcity = [];

      for (let i = 0; i < cities.length; i++) {
        if (cities[i].isHot == 1) {
          hotcity.push(cities[i]);
        }
      }
      // console.log(hotcity[2].py)
      for (let i = 0; i < cities.length; i++) {
        let index = cities[i].py.substr(0, 1).toUpperCase();
        if (test(index)) {
          citylist.push({
            index,
            list: [cities[i]]
          });
        } else {
          for (let j = 0; j < citylist.length; j++) {
            //感动了自己，太完美了！
            if (citylist[j].index == index) {
              citylist[j].list.push(cities[i]);
            }
          }
        }
      }
      function test(index) {
        for (let i = 0; i < citylist.length; i++) {
          if (citylist[i].index == index) {
            return false;
          }
        }
        return true;
      }
      citylist.sort((item1, item2) => {
        if (item1.index < item2.index) {
          return -1;
        } else if (item1.index > item2.index) {
          return 1;
        } else {
          return 0;
        }
      });
      return { hotcity, citylist };
    },
    tolist(index) {
      let h2 = this.$refs.city.getElementsByTagName("h2");
      console.log(h2[index].offsetTop, this.$refs.citylist);
      this.$refs.citylist.toScrollTop(-h2[index].offsetTop);
    },
    tocity(name, id) {
      alert("加班开发中...");
    }
  }
};
</script>

<style scoped>
#content .city_body {
  margin-top: 250px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
