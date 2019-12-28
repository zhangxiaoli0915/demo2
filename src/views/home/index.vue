<template>
  <el-container>
    <el-aside :style="{width:collaspse?'60px':'230px'}" style="transition:all 0.3s; background-color:#353b4e;min-height:100vh;">
      <layout-aside :collaspse="collaspse"></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header>头部</layout-header>
      </el-header>
      <el-main style="padding:0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../utils/eventBus'
import layoutAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'
export default {
  data () {
    return {
      collaspse: false
    }
  },
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader
  },
  created () {
    eventBus.$on('changeCollapse', () => {
      this.collaspse = !this.collaspse
    })
  }

}
</script>

<style>

</style>
