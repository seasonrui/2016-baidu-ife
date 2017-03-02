<template>
  <div id="app">
    <div class="header">
      <h1>问卷管理</h1>
      <router-link to="/myQuestionnaire"><h2>我的问卷</h2></router-link>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app'
  /* created () {
    localStorage.list === '[{"questionnaireId":"c68ebba5-b176-49e0-b91d-07ff389d226a","title":"教学满意度调查","status":"已发布","time":"2017年5月31日","questions":[{"type":"radio","content":"性别","options":["男","女"]},{"type":"radio","content":"对教材的满意程度","options":["一般满意","较为满意","很满意","特别满意"]},{"type":"checkbox","content":"该老师课堂教学以什么方式为主","options":["教授知识点","大量的练习","知识点与练习相结合"]},{"type":"text","content":"你认为教学课堂有哪些还需要改进的","isRequired":true}],"data":[[0,0,[1,0],"风趣幽默"],[1,1,[1,2],"增加互动练习"],[1,2,[0],"提高各方面的能力"],[1,3,[1,0],"教学能力增强"],[1,1,[1,2],"思考和解决问题的能力"]]},{"questionnaireId":"2cc7b14b-a166-443e-a022-222052053905","title":"求职意向调查","status":"未发布","time":"2017年4月29日","questions":[{"type":"radio","content":"性别","options":["男","女"]},{"type":"checkbox","content":"求职过程中会考虑哪些方面","options":["地域","薪资与福利","个人发展机会","单位性质","家庭期望"]},{"type":"text","content":"你的专业是","isRequired":false}],"data":[]}]'
  } */
};

</script>

<style>
*{
  margin: 0;
  padding: 0;
  font: 12px/1 Microsoft YaHei,Tahoma,Helvetica,Arial,\\5B8B\4F53,sans-serif;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header {
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background: #ee7419;
}
a {
  text-decoration: none;
  color: #fff;
}
h1 {
  font-size: 20px;
  color: #fff;
}
h1:before {
  content: '?';
  display: inline-block;
  background: #fff;
  border-radius: 50%;
  color: #ee7419;
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  margin-left: 50px;
}
h2 {
  font-size: 16px;
  width: 100px;
  height: 100%;
}
.main {
  width: 75%;
  margin: 70px auto;
  padding: 20px 10px;
  border: 1px solid #ccc;
  font-size: 20px;
  background: #fff;
  box-shadow: 0 0.05em 0.25em rgba(0,0,0,.5);
}

</style>
