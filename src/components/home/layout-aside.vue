<template>
  <div class="layout-aside">
    <div class="title">
      <!-- <img src="../../assets/img/logo_admin.png" alt=""> -->
      <img :src="collaspse?smallImg:bigImg" alt />
    </div>
    <!-- <el-menu router style="width:231px" background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04bl"> -->
    <el-menu :collapse="collaspse"
      router
      :style="{width:collaspse?'60px':'230px'}"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04bl"
    >
      <!-- 导航组件 index作为跳转的地址  类似于 router-link  to -->
      <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span>首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <!-- 具名插槽 -->
        <!-- <span slot="title">内容管理</span> -->
        <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材列表</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <!-- <span slot="title">粉丝管理</span> -->
        <template slot="title">
            <i class="el-icon-s-flag"></i>
            <span>粉丝管理</span>
        </template>
        <el-menu-item index="/home/picture">图文数据</el-menu-item>
        <el-menu-item index="/home/fansinfo">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanslife">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/account">
      <i class="el-icon-s-custom"></i>
      <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: ['collaspse'], // 接收传递过来的折叠值
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  }

}
</script>

<style lang='less' scoped>
.layout-aside {
//   width: 230px;
  background-color: #353b4e;
  overflow: hidden;
  .el-menu{
      border-right:none;
  }
  .title {
    text-align: center;
    background-color: #2e2f32;
    padding: 10px 0;
    img {
      height: 20px;
    }
  }
}
</style>
