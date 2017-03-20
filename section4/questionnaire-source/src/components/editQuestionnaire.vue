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
      this.$store.dispatch('editQuestionnaire', this.$route.params.id);
    } else {
      this.$store.dispatch('addQuestionnaire');
    }
  },
  methods: {
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
      this.$router.push({path: '/myQuestionnaire'});
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
      this.$router.push({path: '/myQuestionnaire'});
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
<style scoped lang='scss'>
@import '../../common/style/mixins/flex-center.scss';
@import '../../common/style/mixins/button.scss';
@import '../../common/style/variables.scss';

#edit {
	padding: 10px 0;
  width: 100%;
  position: relative;
  .title {
    width: 97%;
    margin: 0 auto;
    @include flex-center;
    height: 45px;
    input {
      width: 100%;
      text-align: center;
      border: none;
      font-weight: 700;
      font-size: $font-size-lg;
    }
    &:hover {
      background-color: $hover-bcg-color;
      input {
        background-color: $hover-bcg-color;
      }
    }
  }
  hr {
    height: 1px;
    border: none;
    border-top: 2px solid $grey;
    width: 98%;
    margin: 5px auto;
  }
  .questions {
    width: 90%;
    margin: 10px auto;
    padding: 5px 10px;
    .question {
      font-size: $font-size-sm;
      padding: 10px 15px;
      &:hover {
        background-color: $hover-bcg-color;
        textarea {
          background-color: $hover-bcg-color;
        }
        .q-title input {
          font-weight: 700;
        }
        .q-operation {
          opacity: 1;
        }
        input {
          background-color: $hover-bcg-color;
        }
        .q-content .q-option span {
          border: 1px solid $hover-bcg-color;
          font-size: $font-size-md;
        }
      }
      .q-title {
        width: 100%;
        @include flex-center;
        span {
          display: inline-block; 
          flex: none;
          width: 25px;
          font-size: $font-size-md;
        }
        input {
          flex: 1;
          border: none;
          font-size: $font-size-md;
        }
      }
      .q-content {
        margin-top: 5px;
        .q-option {
          height: auto;
          display: flex;
          align-items:center;
          padding-left: 20px;
          input {
            flex: none;
          }
          span {
            margin-left: 5px;
            margin-top: 3px;
            padding: 2px 8px 2px 5px;
            display: inline-block;
            border: 1px solid #fff;
            text-align: left;
            font-size: $font-size-md;
            &:focus {
              border: 1px solid #BBFFEE;
            }
          }
          .q-option-del {
            cursor: pointer;
            opacity: 0;
          }
          &:hover {
            .q-option-del {
              opacity: 1;
            }
          }
        }
      }
      .type-text-input {
        width: 90%;
        height: 80px;
        border: 1px solid $grey;
        margin-top: 5px;
        &:hover {
          background-color: $hover-bcg-color;
        }
      }
      .type-text-isRequired {
        text-align: left;
        margin: 5px 0 10px 20px;
      }
      .add-option {
        height: 20px;
        line-height: 20px;
        border: 1px dashed #000;
        cursor: pointer;
        opacity: 0;
        margin: 10px 0 10px 20px;
        vertical-align: middle;
        &:hover {
          opacity: 1;
        }
      }
      .q-operation {
        display: flex;
        justify-content:flex-end;
        padding-right: 10px;
        opacity: 0;
        div {
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
  }
  .add-qn {
    width: 90%;
    margin: 10px auto;
    padding: 5px 10px;
    .type-qn {
      border: 1px solid $grey;
      height: 80px;
      @include flex-center;
      button {
        width: 100px;
        height: 40px;
        margin-left: 20px;
        cursor: pointer;
      }
    }
    .btn-qn{
      height: 80px;
      line-height: 80px;
      border: 1px solid $grey;
      cursor: pointer;
      span{
        &:before {
          content: '+';
          padding: 5px;
        }
      }
    }
  }
  .clearfix {
    &:after {
      content: ".";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
  }
  .footer {
    padding: 10px 80px;
    input {
      float: right;
      margin-right: 10px;
      @include button;
    }
    .expdate {
      float: left;
      padding: 0 10px;
      span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        width: 100px;
        margin-right: 10px;
        font-size: $font-size-md;
      }
      div {
        float: right;
      }
    }
  }
}

</style>
