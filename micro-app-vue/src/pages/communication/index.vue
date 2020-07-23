<template>
  <section class="communication-container">
    <a-card :title="`欢迎你，${userInfo.nickname}`">
      <section class="container">
        <div>
          <a-avatar :size="50" :src="userInfo.avatarUrl" />
        </div>
        <div>
          <span>用户名：</span>
          {{userInfo.nickname}}
        </div>
        <div>
          <span>用户token：</span>
          {{ token }}
        </div>
        <div>
          <span>性别：</span>
          {{userInfo.gender ? "男" : "女"}}
        </div>
        <div>
          <span>所在地：</span>
          {{`${userInfo.country} ${userInfo.province} ${userInfo.city}`}}
        </div>
      </section>
    </a-card>
  </section>
</template>
<script>
// 引入 actions 实例
import actions from '../../shared/actions';
import { ApiGetUserInfo } from '../../apis';

export default {
  name: 'Communication',

  data() {
    return {
      userInfo: {},
      token: ''
    };
  },
  mounted() {
      // 添加观察者
      // onGlobalStateChange 第二个入参为 true，代表立即执行一次观察者函数
      let tokenOriginal = sessionStorage.getItem('token')
      //   console.log('init token', token)
      if (!tokenOriginal) {
          // console.log('in')
          actions.onGlobalStateChange(state => {
              console.log('state', state)
              const {token} = state;
              // 未登录 - 返回主页
              console.log('token', token)
              if (!token) {
                  this.$Message.error({
                      content: '未检测到登录信息！',
                      duration: 3
                  })
                  return this.$router.push('/')
              } else {
                  console.log('*** token', token)
                  sessionStorage.setItem('token', token);
              }
          }, true)
          this.token = sessionStorage.getItem('token')
      }  else {
          this.token = tokenOriginal
      }
      // 获取用户信息
      this.getUserInfo(this.token);
  },
  methods: {
    async getUserInfo(token) {
      // ApiGetUserInfo 是用于获取用户信息的函数
      const result = await ApiGetUserInfo(token);
      this.userInfo = result.data.getUserInfo;
      console.log('userInfo', this.userInfo)
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/styles/flex.less";

.communication-container {
  .container {
    .flex-center;
    padding-top: 30px;
    flex-wrap: wrap;
    div {
      width: 100%;
      margin: 10px;
      text-align: center;
      font-size: 16px;
      span {
        font-weight: bold;
      }
    }
  }
}
</style>