<template>
  <el-card v-loading="loading">
    <!-- 基本的页面结构 -->
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
      <!-- slot指向title -->
    </bread-crumb>
    <el-row type="flex" justify="end">
      <el-upload action="" :http-request="uploadImg" :show-file-list="false">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <!-- 素材 -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材内容{{list}} -->
        <!-- div存放所有的列表的容器 -->
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row
              class="operate"
              type="flex"
              align="middle"
              justify="space-around"
              style="font-size:20px"
            >
            <!-- v-bind绑定  style根据绑定状态 -->
            <!-- 收藏图标的点击事件 -->
              <i @click="collectOrCancle(item)" :style="{color:item.is_collected?'red':''}" class="el-icon-star-on"></i>
              <i @click="delMaterial(item.id)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center" style="height:80px" align="middle">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <!-- <el-row
              class="operate"
              type="flex"
              align="middle"
              justify="space-around"
              style="font-size:20px"
            >
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>-->
          </el-card>
        </div>
        <el-row type="flex" justify="center" style="height:80px" align="middle">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!-- <button @click="test">测试</button> -->
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    async delMaterial (id) {
      try {
        await this.$confirm('确定要删除素材吗？')
        //  .then(() => {
        await this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'

        })
        // .then(() => {
        this.getAllMaterial()
      } catch (error) {

      }

      // })
      // })
    },
    async collectOrCancle (row) {
      await this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: {
          collect: !row.is_collected
        }
      })
      // .then(() => {
      this.getAllMaterial()
      // })
    },

    async uploadImg (params) {
      this.loading = true
      let form = new FormData()
      form.append('image', params.file)
      await this.axios({
        method: 'post',
        url: '/user/images',
        data: form
      })
      // .then(result => {
      //   说明已经上传成功了一张图片
      this.loading = false // 关闭进度条
      this.getAllMaterial()
      // })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllMaterial()
    },
    changeTab (newPage) {
      this.page.currentPage = 1
      this.getAllMaterial()
    },
    // test () {
    //   this.activeName = 'all'
    // }
    // 获取所有素材
    async getAllMaterial () {
      let result = await this.$axios({
        url: '/user/images',
        // params: { collect: false }
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      })
      // .then(result => {
      this.list = result.data.results
      this.page.total = result.data.total_count
      // })
    }
  },
  created () {
    this.getAllMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 180px;
    height: 240px;
    margin: 20px 30px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      width: 100%;
      font-size: 20px;
      position: absolute;
      bottom: 0;
      background-color: #ccc;
      height: 30px;
      margin-left: -20px;
      i{
        cursor:pointer;
      }
    }
  }
}
</style>
