<template>
<div id="myQuestionnaire">
  <div class="questionnaire-list" v-if="isEmpty">
    <table>
        <thead>
          <tr>
            <th>标题</th>
            <th>截止时间</th>
            <th>状态</th>
            <th>操作<span id='newQn' @click='addQuestionnaire'>+ 新建问卷</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in this.$store.state.list">
            <td>{{item.title}}</td>
            <td>{{item.time}}</td>
            <td :class='{released:item.status==="已发布"}'>{{item.status}}</td>
            <td><span v-if='item.status=== "已发布"' @click='fillQn(item)'>填写</span><span v-else @click='editQn(item)'>编辑</span><span @click='deleteQn(index)'>删除</span><span @click='viewData(item)'>查看数据</span></td>
          </tr>
        </tbody>
    </table>
  </div>
  <div class="addQn" v-else>
    <div id="addQn" @click="addQuestionnaire"><span>新建问卷</span></div>
  </div>
  <deleteModal v-if='deleteModal' @confirm='confirmDelete' @close='close'>
    <h3 slot='header'>提示</h3>
    <p slot='content'>是否删除该问卷</p>
  </deleteModal>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import dialog from './dialog';
export default {
  name: 'hello',
  data () {
    return {
      deleteModal: false,
      deleteIndex: -1
    };
  },
  components: {
    'deleteModal': dialog
  },
  computed: {
    ...mapGetters({
      list: 'list'
    }),
    isEmpty: function () {
      return this.list.length > 0;
    }
  },
  beforeCreated () {

  },
  methods: {
    confirmDelete () {
      this.$store.dispatch('deleteQuestionnaire', this.deleteIndex);
      this.deleteModal = false;
    },
    close () {
      this.deleteModal = false;
    },
    addQuestionnaire () {
      this.$router.push({path: '/editQuestionnaire'});
    },
    deleteQn (index) {
      this.deleteIndex = index;
      this.deleteModal = true;
      // this.$store.dispatch('deleteQuestionnaire', index);
    },
    editQn (item) {
      this.$router.push({name: 'id', params: {id: item.questionnaireId}});
      // this.$router.push({path: '/editQuestionnaire'});
    },
    fillQn (item) {
      this.$router.push({name: 'fill', params: {id: item.questionnaireId}});
    },
    viewData (item) {
      this.$router.push({name: 'data', params: {id: item.questionnaireId}});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addQn {
  display: flex;
  height: 300px;
  align-items: center;
  justify-content: center;
}
#addQn {
  height: 40px;
  width: 100px;
  background: #ee7419;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0.05em 0.25em rgba(0,0,0,.5);
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
#addQn span:before {
  content: "+";
  color: #fff;
  padding: 5px 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
tbody tr {
  border-bottom: 1px solid #ccc;
}
thead tr th{
  font-size: 18px;
}
tbody tr {
  height: 40px;
}
tbody tr:hover {
  background: #fef1e8;
}
tbody tr td {
  font-size: 14px;
}
tbody tr td span {
  display: inline-block;
  padding: 2px 5px;
  border: 1px solid #ccc;
  margin-left: 5px;
  cursor: pointer;
}
#newQn {
  display: inline-block;
  width: 80px;
  height: 20px;
  line-height: 20px;
  background: #ee7419;
  color: #fff;
  margin-left: 10px;
  cursor: pointer;
}
.released {
  color: #5cb85c;
}
</style>
