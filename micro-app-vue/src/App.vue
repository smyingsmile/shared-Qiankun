<template>
  <div id="app">
        <a-menu :selectedKeys="[currentRoute]" mode="horizontal" theme="dark">
            <a-menu-item 
                v-for="(item) in menus" 
                :key="item.key"
                >
                <router-link :to="item.route">{{item.title}}</router-link>
            </a-menu-item>
        </a-menu>
    <div class="father">
        <div class="c1"></div>
        <div class="c2"></div>
    </div>
    <router-view :key="(new Date()).getTime()" />
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      menus: [
        {
          key: "vue",
          route: "/",
          title: "主页"
        },
          {
          key: "vue-communication",
          route: "/communication",
          title: "通讯页"
        },
        {
          key: "vue-list",
          route: "/list",
          title: "列表页"
        },
        {
          key: "vue-1",
          route: "/test1",
          title: "test1"
        },
        {
          key: "vue-2",
          route: "/test2",
          title: "test2"
        },
        {
          key: "vue-3",
          route: "/test3",
          title: "test3"
        }
      ]
    }
  },

  computed: {
    currentRoute() {
      const menu = this.menus.find(item => item.route === this.$route.path)
      return menu ? menu.key : "vue";
    }
  },
}
</script>

<style>
    /* .father {
        overflow: hidden;
    } */
    .c1 {
        height: 100px;
        float: left;
        background-color: lightblue;
    }
    .c2 {
        height: 100px;
        float: right;
        background-color: black;
        color: white;
    }
</style>
