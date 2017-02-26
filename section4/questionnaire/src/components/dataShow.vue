<template>
  <div id="data">
    <div class='title'><span>{{editing.title}}</span></div>
    <hr/>
    <div class='questions'>
      <div v-for='(q, index) in editing.questions' class='question-content clearfix'>
        <div class="question">
          <div class='q-title'><span>Q{{index}} {{q.content}}</span></div>
          <div class='q-content'>
            <div class='q-option' v-for='(key, oindex) in q.options'>{{key}}</div>
          </div>
        </div>
        <div class='static' :id='index' :style="{width:'250px',height:'200px'}"></div>
      </div>
    </div>

    <hr/>
    <div class="footer clearfix">
      <input type="button" value="返回" @click='backMyquestionnaire'>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import { mapGetters } from 'vuex';
export default {
  name: 'editQuestionnaire',
  data () {
    return {
      questionnaireId: ''
    };
  },
  computed: {
    ...mapGetters({
      editing: 'editing'
    })
  },
  beforeCreate () {
    this.$store.dispatch('statisticsQuestionnaire', this.$route.params.id);
  },
  mounted () {
    var questions = this.$store.state.editing.questions;
    var data = this.$store.state.editing.data;
    var chartsOptions = [];
    // 找出选项内容
    for (let i = 0; i < questions.length; i++) {
      // chartsOptions[i].title = {text: this.$store.state.editing.title};
      var chartsOption = {};
      chartsOption.tooltip = {};
      if (questions[i].type === 'radio') {
        // 单选题 饼状图
        chartsOption.series = [
          {
            type: 'pie',
            name: '人数',
            radius: '50%',
            color: ['#d95850', '#f2d643', '#ebdba4', '#339ca8', '#32a487', '#546570', '#c4ccd3'],
            // center: ['50%', '60%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ];
        for (let j = 0; j < questions[i].options.length; j++) {
          // 存放选项内容
          let tempContent = {};
          tempContent.value = 0;
          tempContent.name = questions[i].options[j];
          chartsOption.series[0].data.push(tempContent);
        }
        chartsOptions.push(chartsOption);
      } else if (questions[i].type === 'checkbox') {
        // 多选
        chartsOption.color = ['#ee7419'];
        chartsOption.grid = {
          // left: '3%',
          // right: '4%',
          bottom: '2%',
          containLabel: true
        };
        chartsOption.xAxis = [
          {
            data: []
          }
        ];
        chartsOption.yAxis = {};
        chartsOption.series = [
          {
            type: 'bar',
            name: '人数',
            barWidth: '60%',
            data: []
          }
        ];
        for (let j = 0; j < questions[i].options.length; j++) {
          // 存放选项内容
          chartsOption.series[0].data.push(0);
          chartsOption.xAxis[0].data.push(questions[i].options[j]);
        }
        chartsOptions.push(chartsOption);
      } else {
        // 文本题
        chartsOption.color = ['#ee7419'];
        chartsOption.grid = {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        };
        chartsOption.xAxis = [
          {
            data: []
          }
        ];
        chartsOption.yAxis = {};
        chartsOption.series = [
          {
            type: 'bar',
            name: '人数',
            barWidth: '60%',
            data: [0, 0]
          }
        ];
        chartsOption.xAxis[0].data = ['有效回答数', '无效回答数'];
        chartsOptions.push(chartsOption);
      }
    }
    for (let i = 0; i < data.length; i++) {
      console.log('共有几道题：' + data[i].length);
      for (let j = 0; j < data[i].length; j++) {
        // data[i][j]表示第j题的答案
        if (data[i][j] instanceof Array) {
          // 多选题
          for (let k = 0; k < data[i][j].length; k++) {
            let value = data[i][j][k];
            chartsOptions[j].series[0].data[value]++;
          }
        } else if (data[i][j] !== '' && !isNaN(data[i][j])) {
          // 单选题
          let val = data[i][j];
          chartsOptions[j].series[0].data[val].value++;
        } else {
          // 文本题
          if (data[i][j] !== '') {
            chartsOptions[j].series[0].data[0]++;
          } else {
            chartsOptions[j].series[0].data[1]++;
          }
        }
      }
    }
    // 绑定到echarts容器中
    // 数据放进去
    for (let i = 0; i < questions.length; i++) {
      echarts.init(document.getElementById(i)).setOption(chartsOptions[i]);
    }
  },
  methods: {
    backMyquestionnaire () {
      this.$router.push({path: '/myQuestionnaire'});
    }
  }
};
</script>

<style scoped>
#data{
  padding: 10px 0;
  width: 100%;
  position: relative;
}
.title {
  width: 97%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  height: 45px;
}
.title span {
  width: 100%;
  text-align: center;
  border: none;
  font-weight: 700;
  font-size: 20px;
}
hr {
  height: 1px;
  border: none;
  border-top: 2px solid #ccc;
  width: 98%;
  margin: 5px auto;
}
.questions {
  width: 90%;
  margin: 10px auto;
  padding: 5px 10px;
}
.question-content {
  border: 1px solid #ccc;
  margin-top: 10px;
}
.questions .question {
  padding: 10px 15px;
  float: left;
}
.static {
  float: right;
  right: 20px;
}
.questions .question .q-title {
  text-align: left;
  width: 100%;
  display: flex;
  align-items:center;
}
.questions .question .q-title span {
  font-size: 16px;
  font-weight: 700;
}
.questions .question .q-content {
  margin-top: 5px;
}
.questions .question .q-option {
  text-align: left;
  padding-left: 25px;
  height: 25px;
  line-height: 25px;
  font-size: 16px;
}
.footer {
  padding: 5px;
}
.footer input{
  width: 80px;
  height: 30px;
  border: 1px solid #888;
  border-radius: 3px;
  box-shadow: 0 0.05em 0.25em rgba(0,0,0,.5);
  cursor: pointer;
  background-color: #fff;
  display: inline-block;
  font-size: 16px;
  color: inherit;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden
}
.clearfix {
  *+height: 1%;
}
</style>
