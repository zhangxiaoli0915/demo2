<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>文章状态</span>
      </el-col>
      <!-- 用一个单选框组 -->
      <el-col :span="18">
        <el-radio-group @change="changeCondition" v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>频道列表</span>
      </el-col>
      <el-col :span="18">
        <!-- label指el-option显示值 -->
        <!-- value值el-option的存储值 -->
        <el-select @change="changeCondition" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>时间选择</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
          @change="changeCondition"
          value-format="yyyy-MM-dd"
          v-model="formData.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
    <!-- 主体部分 -->
    <el-row class="total">
      <span>共找到{{page.total}}条符合条件的内容</span>
    </el-row>
    <!-- 循环模板 -->
    <el-row
      v-for="item in list"
      :key="item.id.toString()"
      class="article-item"
      type="flex"
      justify="space-between"
    >
      <!-- 左侧 -->
      <el-col :span="14">
        <el-row type="flex">
          <!-- <img src="../../assets/img/jie.jpg" alt /> -->
          <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt ="">
          <div class="info">
            <!-- <span>年少轻狂，一路前行</span> -->
            <span>{{item.title}}</span>
            <!-- <el-tag class="tag">标签一</el-tag> -->
            <el-tag :type="item.status|filterType" class="tag">{{item.status|filterStatus}}</el-tag>
            <!-- <span class="date">2019-12-24 16:29:42</span> -->
            <span class="date">{{item.pubdate}}</span>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row class="right" type="flex" justify="end">
          <span @click="toModify(item.id)">
            <i class="el-icon-edit"></i>修改
          </span>
          <span @click="delArticle(item.id)">
            <i class="el-icon-delete"></i>删除
          </span>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle" style="height:60px">
      <el-pagination
      background
      :page-size="page.pageSize"
      :current-page="page.currentPage"
      layout="prev, pager, next"
      :total="page.total"
      @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>
<script>
import { getArticles, getChannels } from '../../actions/articles'
export default {
  data () {
    return {
      formData: {
        status: 5,
        channel_id: null, // 默认为空
        dateRange: [] // 日期范围
      },
      channels: [], // 定义一个channels接收频道
      list: [],
      defaultImg: require('../../assets/img/jie.jpg'),
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  filters: {
    filterStatus (value) {
      // value是过滤器前面表达式计算的值
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    toModify (id) {
      // 去修改页面
      this.$router.push(`/home/publish/${id.toString()}`)
    },

    async delArticle (id) {
      await this.$confirm('您是否要删除这个文章？')
      // .then(() => {
      await this.$axios({
        method: 'delete',
        url: `/articles/${id.toString()}`
      })
      // .then(() => {
      this.$message({
        type: 'success',
        message: '删除文章成功！'
      })
      this.getConditionArticle()
      // }
      // )
      // })
    },
    // 改变页码事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getConditionArticle()
    },
    changeCondition () {
      this.page.currentPage = 1
      this.getConditionArticle()
    },
    getConditionArticle () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.dateRange.length
          ? this.formData.dateRange[0]
          : null,
        end_pubdate:
          this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null
      }
      this.getArticles(params)
    },
    async getChannels () {
      // let result = await this.$axios({
      //   url: '/channels'
      // })
      // 调用频道数据
      let result = await getChannels()
      // .then(result => {
      // console.log(result)
      this.channels = result.data.channels
    },
    async getArticles (params) {
      // let result = await this.$axios({
      //   url: '/articles',
      //   params
      // })
      // 获取文章列表数据 分页 切换/条件切换
      let result = await getArticles(params)
      // .then(result => {
      this.list = result.data.results
      this.page.total = result.data.total_count // 文章总数
    }
  // )
  // }
  // },
    // )
  },

  created () {
    this.getChannels() // 调用获取频道数据

    this.getArticles({ page: 1, per_page: 10 }) // 调用获取文章列表
  }
}
</script>

<style lang="less" scoped>
.articles {
  .searchTool {
    height: 60px;
    padding-left: 50px;
  }
}
.total {
  margin: 60px 0;
  height: 30px;
  border-bottom: 1px dashed #ccc;
}
.article-item {
  margin: 20px 0;
  padding: 10px 0;
  border-bottom: 1px solid #f2f3f5;
  img {
    width: 180px;
    height: 100px;
    margin-right: 10px;
    border-radius: 5px;
  }
  .info {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .tag {
      max-width: 60px;
    }
    .date {
      color: #999;
      font-size: 12px;
    }
  }
  .right {
    span {
      margin-left: 8px;
      font-size: 14px;
      cursor: pointer; //设置鼠标的样式为手指
    }
  }
}
</style>
