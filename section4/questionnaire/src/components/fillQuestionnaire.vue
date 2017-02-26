<template>
	<div id='fill'>
    <div class='title'><span>{{editing.title}}</span></div>
		<hr/>
    <div class='questions'>
      <div class='question' v-for='(q, index) in editing.questions'>
        <div class='q-title'><span>Q{{index}} {{q.content}}</span></div>
        <div class='q-content'>
          <div class='q-option' v-for='(key, oindex) in q.options'><input :type='q.type' :name='q.content' value='' @click='selectedAnswer(q.type,index,oindex,$event)'/> {{key}}</div>
        </div>
        <textarea v-if='q.type=="text"' class="type-text-input" @input='fillText(index, $event)'></textarea>
        <div v-if='q.type=="text"' class="type-text-isRequired"><span v-if='q.isRequired === true'> 此题必填</span><span v-if='q.isRequired === false'> 此题选填</span></div>
      </div>
    </div>
    <hr/>
    <div class="footer clearfix">
      <input type="button" value="提交问卷" @click='submitQuestionnaire'>
    </div>
    <submitModal v-if='submitModal' @confirm='confirmSubmit' @close='close'>
      <h3 slot='header'>提示</h3>
      <p slot='content'>确定提交该问卷吗</p>
    </submitModal>
    <validateData v-if='validateModal' @confirm='close' @close='close'>
      <h3 slot='header'>提示</h3>
      <p slot='content'>请合理回答该问卷</p>
    </validateData>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import dialog from './dialog';
// import { mapMutations } from 'vuex';
// import { addQuestion, addQuestionnaire } from '../store/actions';

export default {
  name: 'editQuestionnaire',
  data () {
    return {
      questionnaireId: '',
      submitModal: false,
      validateModal: false
    };
  },
  components: {
    'submitModal': dialog,
    'validateData': dialog
  },
  computed: {
    ...mapGetters({
      editing: 'editing',
      status: 'status'
    })
  },
  beforeCreate () {
    this.$store.dispatch('fillQuestionnaire', this.$route.params.id);
  },
  methods: {
    confirmSubmit () {
      this.$store.dispatch('submitQuestionnaire', this.$route.params.id);
      this.submitModal = false;
    },
    close () {
      this.submitModal = false;
      this.validateModal = false;
    },
    selectedAnswer (type, index, oindex, e) {
      // console.log(type, index, oindex);
      e.target.value = e.target.value === '' ? oindex : '';
      let value = e.target.value;
      this.$store.dispatch('selectedAnswer', {type, index, oindex, value});
    },
    validateData () {
      this.$store.dispatch('validateData');
      this.validateModal = !this.$store.state.status.isReasonableData;
    },
    submitQuestionnaire () {
      this.validateData();
      this.submitModal = !this.validateModal;
    },
    fillText (index, e) {
      let value = e.target.value;
      console.log(value);
      this.$store.dispatch('fillText', {index, value});
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#fill {
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
.questions .question:hover .q-title span {
  font-weight: 700;
}
.questions .question:hover input {
  background-color: #fef1e8;
}
/*
.questions .question:hover .q-option span {
  border: 1px solid #fef1e8;
} */
.questions .question .q-title {
  text-align: left;
  width: 100%;
  display: flex;
  align-items:center;
}
.questions .question .q-title span {
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
  text-align: left;
  padding-left: 20px;
  height: 25px;
  line-height: 25px;
  font-size: 16px;
}
.type-enter-active {
  transition: all .3s ease;
}
.type-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
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
  text-indent: 1em;
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
.type-enter-active, .type-leave-active {
  transition: all 1s ease-in;
}
.type-enter, .type-leave {
  transition: all 10s linear;
}
</style>
