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
