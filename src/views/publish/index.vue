<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:50px" label-width="100px">
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <!-- <el-input v-model="formData.content" type="textarea" :rows="4"></el-input> -->
        <quill-editor style="height:400px" v-model="formData.content"></quill-editor>
      </el-form-item>
      <el-form-item prop="type" label="封面" style="margin-top:100px">
        <el-radio-group>
          <el-radio>单图</el-radio>
          <el-radio>三图</el-radio>
          <el-radio>无图</el-radio>
          <el-radio>自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
             <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publishArticle()">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 定义一个channels接收频道
      formData: {
        title: '', // 标题
        content: '', // 文章内容
        cover: {
          type: 0,
          images: []// 存储的图片的地址
        },
        channel_id: null

      },
      publishRules: {
        title: [{ required: true, message: '标题内容不能为空' }, {
          min: 5, max: 30, message: '标题长度需要在5到30字符之间'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      // Object.keys(obj)

      // 参数：要返回其枚举自身属性的对象

      // 返回值：一个表示给定对象的所有可枚举属性的字符串数组
      if (Object.keys(to.params).length) {
        // 有参数为修改  没有参数为发布

      } else {
        this.formData = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          }
        }
      }
    }

  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // console.log(result)
        this.channels = result.data.channels
      })
    },
    publishArticle (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          // 回去动态路由参数
          let{ articleId } = this.$route.params

          // console.log('校验成功')
          this.$axios({
            // url: '/articles',
            // method: 'post',
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : `/articles`,
            params: { draft }, // query参数
            data: this.formData
          }).then(result => {
            // 成功了去内容列表
            this.$router.push('/home/articles')
          })
        }
      })
    },
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data // 将指定文章数据给data数据
      })
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>
</style>
