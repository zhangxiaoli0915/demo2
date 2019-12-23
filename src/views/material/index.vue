<template>
  <el-card>
      <!-- 基本的页面结构 -->
      <bread-crumb slot="header">
      <template slot="title">素材管理</template>
      <!-- slot指向title -->
      </bread-crumb>
      <!-- 素材 -->
      <el-tabs v-model="activeName">
          <el-tab-pane label="全部素材" name="all">
              <!-- 全部素材内容 -->

          </el-tab-pane>
          <el-tab-pane label="收藏素材" name="collect"></el-tab-pane>
      </el-tabs>
      <!-- <button @click="test">测试</button> -->
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'collect'
    }
  },
  methods: {
    // test () {
    //   this.activeName = 'all'
    // }

  }

}
</script>

<style>

</style>
