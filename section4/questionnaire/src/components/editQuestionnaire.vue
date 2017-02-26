<template>
	<div id='edit'>
    <div class='title'><input :value='editing.title' @input='updateTitle'/></div>
		<hr/>
    <div class='questions'>
      <div class='question' v-for='(q, index) in editing.questions'>
        <div class='q-title'><span>Q{{index}}</span><input :value='q.content' @input='updateQnTitle(index, $event)'/></div>
        <div class='q-content'>
          <div class='q-option' v-for='(key, oindex) in q.options'><input :type='q.type' :name='q.content' :value='key' disabled="disabled" /><span contenteditable='true' @blur='updateOption(index, oindex, $event)'>{{key}}</span><span class='q-option-del' @click='deleteOption(index, oindex)'>X</span></div>
        </div>
        <textarea v-if='q.type=="text"' class='type-text-input'></textarea>
        <div v-if='q.type=="text"' class="type-text-isRequired"><input type='checkbox' :value='q.isRequired' :checked='q.isRequired' @click='updateIsrequired(index, $event)'/><span> 此题是否必填</span></div>
        <div class='add-option' v-if='q.type!="text"' @click='addOption(index)'>+</div>
        <div class='q-operation'>
          <div class='up' v-if='index!=0' @click='upQuestion(index)'><span>上移</span></div>
          <div class='down' v-if='index!=editing.questions.length-1' @click='downQuestion(index)'><span>下移</span></div>
          <div class='copy' @click='copyQuestion(index)'><span>复用</span></div>
          <div class='delete' @click='deleteQuestion(index)'><span>删除</span></div>
        </div>
      </div>
    </div>
    	<div class='add-qn'>
        <transition name='type'>
          <div class='type-qn' v-if='status.isChooseType'>
            <button class='radio' @click='chooseType("radio")'>单选</button>
            <button class='checkbox' @click='chooseType("checkbox")'>多选</button>
            <button class='text' @click='chooseType("text")'>文本</button>
          </div>
        </transition>
        <div class='btn-qn' @click='addQn'><span>添加问题</span></div>
      </div>
    <hr/>
    <div class='footer clearfix'>
      <div class='expdate'>
        <span>问卷截止日期</span>
        <!--<calendar @saveDate='saveDate'></calendar>-->
        <calendar></calendar>
      </div>
      <input type='button' value='保存问卷' @click='saveQuestionnaire'>
      <input type='button' value='发布问卷' @click='releaseQuestionnaire'>
    </div>
    <saveModal v-if='saveModal' @confirm='confirmSave' @close='close'>
      <h3 slot='header'>提示</h3>
      <p slot='content'>是否保存问卷</p>
    </saveModal>
    <validateDateModal  v-if='validateDateModal' @confirm='close' @close='close'>
      <h3 slot='header'>提示</h3>
      <p slot='content'>请设置问卷截止时间</p>
    </validateDateModal>
    <validateModal  v-if='validateModal' @confirm='close' @close='close'>
      <h3 slot='header'>提示</h3>
      <p slot='content'>请设置合理的问卷内容</p>
    </validateModal>
    <releaseModal  v-if='releaseModal' @confirm='confirmRelease' @close='close'>
      <h3 slot='header'>提示</h3>
      <p slot='content'>是否发布问卷</p>
    </releaseModal>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import calendar from './calendar';
import dialog from './dialog';

export default {
  name: 'editQuestionnaire',
  data () {
    return {
      choosetype: false,
      saveModal: false,
      validateDateModal: false,
      releaseModal: false,
      validateModal: false,
      questionnaireId: ''
    };
  },
  computed: {
    ...mapGetters({
      editing: 'editing',
      status: 'status'
    })
  },
  beforeCreate () {
    if (this.$route.params.id !== undefined) {
      // this.questionnaireId = this.$route.params.id;
      // console.log('看id:' + this.questionnaireId);
      this.$store.dispatch('editQuestionnaire', this.$route.params.id);
    } else {
      this.$store.dispatch('addQuestionnaire');
    }
  },
  methods: {
    /* saveDate (selectedDate) {
      this.$store.dispatch('saveDate', selectedDate);
    }, */
    addQn () {
      this.$store.dispatch('addQuestion');
    },
    updateTitle (e) {
      let value = e.target.value;
      this.$store.dispatch('updateTitle', value);
    },
    chooseType (type) {
      this.$store.dispatch('chooseType', type);
    },
    updateQnTitle (index, e) {
      let value = e.target.value;
      console.log(value);
      this.$store.dispatch('updateQnTitle', {index, value});
    },
    addOption (index) {
      this.$store.dispatch('addOption', index);
    },
    deleteQuestion (index) {
      this.$store.dispatch('deleteQuestion', index);
    },
    deleteOption (index, oindex) {
      this.$store.dispatch('deleteOption', {index, oindex});
    },
    updateOption (index, oindex, e) {
      let value = e.target.innerHTML;
      console.log(value);
      this.$store.dispatch('updateOption', {index, oindex, value});
    },
    copyQuestion (index) {
      this.$store.dispatch('copyQuestion', index);
    },
    upQuestion (index) {
      this.$store.dispatch('upQuestion', index);
    },
    downQuestion (index) {
      this.$store.dispatch('downQuestion', index);
    },
    validateQuestionnaire () {
      this.$store.dispatch('validateQuestionnaire');
      this.validateDateModal = !this.$store.state.status.isReasonableTime;
      this.validateModal = !this.$store.state.status.isReasonableQn;
    },
    saveQuestionnaire () {
      // 保存问卷前验证问卷
      this.validateQuestionnaire();
      this.saveModal = !this.validateDateModal && !this.validateModal;
    },
    confirmSave () {
      this.$store.dispatch('saveQuestionnaire', this.$route.params.id);
      this.saveModal = false;
    },
    close () {
      this.saveModal = false;
      this.releaseModal = false;
      this.validateDateModal = false;
      this.validateModal = false;
    },
    releaseQuestionnaire () {
      this.validateQuestionnaire();
      this.releaseModal = !this.validateDateModal && !this.validateModal;
    },
    confirmRelease () {
      this.$store.dispatch('releaseQuestionnaire', this.$route.params.id);
      this.releaseModal = false;
    },
    updateIsrequired (index, e) {
      let value = e.target.value;
      console.log(value);
      this.$store.dispatch('updateIsrequired', index);
    }
  },
  components: {
    calendar,
    'saveModal': dialog,
    'validateDateModal': dialog,
    'validateModal': dialog,
    'releaseModal': dialog
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#edit {
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
.title input {
  width: 100%;
  text-align: center;
  border: none;
  font-weight: 700;
  font-size: 20px;
}
.title:hover input{
  background-color: #fef1e8;
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
.questions .question {
  padding: 10px 15px;
}
.questions .question:hover {
  background-color: #fef1e8;
}
.questions .question:hover textarea {
  background-color: #fef1e8;
}
.questions .question:hover .q-title input {
  font-weight: 700;
}
.questions .question:hover .q-operation {
  opacity: 1;
}
.questions .question:hover input {
  background-color: #fef1e8;
}
.questions .question:hover .q-option span {
  border: 1px solid #fef1e8;
}
.questions .question .q-title {
  text-align: left;
  width: 100%;
  display: flex;
  align-items:center;
}
.questions .question .q-title span {
  display: inline-block; 
  flex: none;
  width: 25px;
  font-size: 16px;
}
.questions .question .q-title input {
  flex: 1;
  border: none;
  font-size: 16px;
}
.questions .question .q-content {
  margin-top: 5px;
}
.questions .question .q-option {
  height: auto;
  display: flex;
  align-items:center;
  padding-left: 20px;
}
.questions .question .q-option input {
  flex: none;
}
.questions .question .q-option span {
  margin-left: 5px;
  margin-top: 3px;
  font-size: 16px;
  padding: 2px 8px 2px 5px;
  display: inline-block;
  border: 1px solid #fff;
  text-align: left;
}

.questions .question .q-option span:focus {
  border: 1px solid #BBFFEE;
}
.questions .question .q-option .q-option-del {
  cursor: pointer;
  opacity: 0;
}
.questions .question .q-option:hover .q-option-del {
  opacity: 1;
}

.questions .question .add-option {
  height: 20px;
  line-height: 20px;
  border: 1px dashed #000;
  cursor: pointer;
  opacity: 0;
  margin: 10px 0 10px 20px;
  vertical-align: middle;
}
.questions .question .add-option:hover {
  opacity: 1;
}
.questions .question .q-operation {
  display: flex;
  justify-content:flex-end;
  padding-right: 10px;
  opacity: 0;
}
.questions .question .q-operation div {
  margin-right: 10px;
  cursor: pointer;
}
.questions .question .q-operation div span {
  font-size: 14px;
}
.add-qn {
  padding: 5px;
}
.add-qn .type-qn {
  border: 1px solid #ccc;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-qn .type-qn button {
  width: 100px;
  height: 40px;
  margin-left: 20px;
  cursor: pointer;
}
.add-qn .btn-qn{
  height: 80px;
  line-height: 80px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.add-qn .btn-qn span:before {
  content: '+';
  padding: 5px;

}
.type-enter-active {
  transition: all .3s ease;
}

.type-enter, .type-leave-active {
  transform: translateY(10px);
  opacity: 0;
}
.type-text-input {
  width: 90%;
  height: 80px;
  border: 1px solid #ccc;
  margin-top: 5px;
}
.type-text-input:hover {
  background-color: #fef1e8;
}
.type-text-isRequired {
  text-align: left;
  margin: 5px 0 10px 23px;
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
.footer input:hover {
  background-color: #ee7419;
  color: #fff;
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
.expdate {
  float: left;
  padding: 0 10px;
}
.expdate span {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  width: 100px;
  font-size: 16px;
  color: #888;
  margin-right: 10px;
}
.expdate div {
  float: right;
}
</style>
