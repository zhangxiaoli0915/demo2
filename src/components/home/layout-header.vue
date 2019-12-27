<template>
  <el-row class="layout-header" type="flex" align="middle" justify="space-between">
    <el-col class="left" :span="10">
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col class="right" :span="4">
      <el-row type="flex" justify="end" align="middle">
        <img :src="userInfo.photo?userInfo.photo:defaultImg" alt />
        <!-- <img src="../../assets/img/header.jpg" alt=""> -->
        <el-dropdown @command="handle">
          <span>主页</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">Git地址</el-dropdown-item>
            <el-dropdown-item command="lgout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/header.jpg')
    }
  },
  created () {
    // this.$axios({
    //   url: '/user/profile'
    // }).then(result => {
    //   // this.userInfo = result.data.data
    //   this.userInfo = result.data
    // })
    this.getUserInfo()
    // 实例创建完毕，立刻监听
    eventBus.$on('updateUserInfoSuccess', () => {
      // 别人告诉你，它更新了数据  应该立刻处理
      this.getUserInfo()
    })
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      //   headers参数
      }).then(result => {
        this.userInfo = result.data // 获取用户个人信息
      })
    },
    handle (commad) {
      if (commad === 'lgout') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (commad === 'git') {
        window.location.href = 'http://github.com/zhangxiaoli0915/toutiao-89'
      } else if (commad === 'info') {
        this.$router.push('/home/account')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  height: 60px;
  .left {
    font-size: 18px;
  }
  .title {
    margin-left: 4px;
    color: #2c3e50;
    font-size: 16px;
    height: 50px;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 5px;
  }
}

</style>
