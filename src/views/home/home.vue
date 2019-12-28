<template>
  <div class="home">
    <!-- 图表的盒子 -->
    <div ref="myChart" class="echarts"></div>
    <div ref="myChart2" class="echarts"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  // mounted () {
  //   let myChart = echarts.init(this.$refs.myChart)
  //   myChart.setOption({
  //     option: {
  //       backgroundColor: '#2c343c',
  //       visualMap: {
  //         show: false,
  //         min: 80,
  //         max: 600,
  //         inRange: {
  //           colorLightness: [0, 1]
  //         }
  //       },
  //       series: [
  //         {
  //           name: '访问来源',
  //           type: 'pie',
  //           radius: '55%',
  //           data: [
  //             { value: 235, name: '视频广告' },
  //             { value: 274, name: '联盟广告' },
  //             { value: 310, name: '邮件营销' },
  //             { value: 335, name: '直接访问' },
  //             { value: 400, name: '搜索引擎' }
  //           ],
  //           roseType: 'angle',
  //           label: {
  //             normal: {
  //               textStyle: {
  //                 color: 'rgba(255, 255, 255, 0.3)'
  //               }
  //             }
  //           },
  //           labelLine: {
  //             normal: {
  //               lineStyle: {
  //                 color: 'rgba(255, 255, 255, 0.3)'
  //               }
  //             }
  //           },
  //           itemStyle: {
  //             normal: {
  //               color: '#c23531',
  //               shadowBlur: 200,
  //               shadowColor: 'rgba(0, 0, 0, 0.5)'
  //             }
  //           }
  //         }
  //       ]
  //     }
  //   })
  // }
  mounted () {
    // console.log(this.$refs.myChart)
    let myChart = echarts.init(this.$refs.myChart) // 获取到实例对象
    let myChart2 = echarts.init(this.$refs.myChart2) // 获取到实例对象
    myChart2.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }
      ]
    })
    myChart.setOption({
      title: {
        text: '堆叠区域图'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: { normal: {} },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }) // 设置图表属性
  }
}
</script>

<style lang='less' scoped>
.home {
  background-image: url("../../assets/img/jie.jpg");
  height: 100vh;
  background-size: cover;
}

.echarts {
  width: 800px;
  height: 400px;
}
</style>
