import * as types from './mutation-types';
import { cloneObject, generateUUID } from './util.js';
import { initEditing, status } from './index';

export default {
  [types.ADD_QUESTIONNAIRE] (state) {
    // 添加问卷
    state.editing = cloneObject(initEditing);
    state.editing.questionnaireId = generateUUID();
    console.log(state.editing.questionnaire);
    state.status = cloneObject(status);
  },
  [types.EDIT_QUESTIONNAIRE] (state, questionnaireId) {
    // 编辑问卷
    for (let i = 0, len = state.list.length; i < len; i++) {
      if (state.list[i].questionnaireId === questionnaireId) {
        state.editing = cloneObject(state.list[i]);
        break;
      }
    }
    state.status = cloneObject(status);
  },
  [types.DELETE_QUESTIONNAIRE] (state, index) {
    // 删除问卷
    // 从问卷list中删除，主要就是问卷编号
    state.list.splice(index, 1);
    localStorage.list = JSON.stringify(state.list);
  },
  [types.SAVE_QUESTIONNAIRE] (state, questionnaireId) {
    // 保存问卷 有问题，如果是修改过的呢 不应该是push 也不该深度复制是吧
    // 向问卷中push一个问卷必须是深度复制的
    for (var i = 0, len = state.list.length; i < len; i++) {
      if (state.list[i].questionnaireId === state.editing.questionnaireId) {
        state.list[i] = cloneObject(state.editing);
        break;
      }
    }
    if (i === len) {
      state.list.push(cloneObject(state.editing));
    }
    localStorage.list = JSON.stringify(state.list);
  },
  [types.RELEASE_QUESTIONNAIRE] (state) {
    // 发布问卷
    for (var i = 0, len = state.list.length; i < len; i++) {
      if (state.list[i].questionnaireId === state.editing.questionnaireId) {
        state.editing.status = '已发布';
        state.list[i] = cloneObject(state.editing);
        break;
      }
    }
    if (i === len) {
      state.editing.status = '已发布';
      state.list.push(cloneObject(state.editing));
    }
    localStorage.list = JSON.stringify(state.list);
  },
  [types.FILL_QUESTIONNAIRE] (state, questionnaireId) {
    // 填写问卷
    for (let i = 0, len = state.list.length; i < len; i++) {
      if (state.list[i].questionnaireId === questionnaireId) {
        state.editing = cloneObject(state.list[i]);
        state.editing.data = [];
        state.editing.questions.forEach((value, index) => {
          switch (value.type) {
            case 'radio': state.editing.data.push(-1); break;
            case 'checkbox': state.editing.data.push([]); break;
            case 'text': state.editing.data.push(''); break;
          }
        });
        break;
      }
    }
    state.status = cloneObject(status);
  },
  [types.STATISTICS_QUESTIONNAIRE] (state, questionnaireId) {
    // 统计问卷数据
    for (let i = 0, len = state.list.length; i < len; i++) {
      if (state.list[i].questionnaireId === questionnaireId) {
        state.editing = cloneObject(state.list[i]);
        break;
      }
    }
  },
  [types.SUBMIT_QUESTIONNAIRE] (state, questionnaireId) {
    // 提交问卷
    // 将数据提交到data，有一个问卷编号 应该是只有数据，不能加原来的 克隆数据
    for (let i = 0, len = state.list.length; i < len; i++) {
      if (state.list[i].questionnaireId === questionnaireId) {
        state.list[i].data.push(cloneObject(state.editing.data));
        break;
      }
    }
    localStorage.list = JSON.stringify(state.list);
  },
  [types.UPDATE_TITLE] (state, value) {
    // 修改问卷标题
    state.editing.title = value;
  },
  [types.ADD_QUESTION] (state) {
    // 添加问题
    // 向正在编辑的问卷中添加问题
    state.status.isChooseType = true;
  },
  [types.CHOOSE_TYPE] (state, type) {
    // 选择类型 type代表类型 对应某一类型创建数据
    // 根据不同类型添加问题
    console.log(type);
    let question;
    switch (type) {
      case 'radio':
        question = { type: 'radio', content: '单选题', options: ['选项1', '选项2'] }; break;
      case 'checkbox':
        question = { type: 'checkbox', content: '多选题', options: ['选项1', '选项2', '选项3', '选项4'] }; break;
      case 'text':
        question = { type: 'text', content: '文本题', isRequired: false };
        break;
    }
    state.status.isChooseType = false;
    state.editing.questions.push(question);
  },
  [types.DELETE_QUESTION] (state, index) {
    // 删除问题
    state.editing.questions.splice(index, 1);
  },
  [types.UP_QUESTION] (state, index) {
    // 上移
    state.editing.questions.splice(index - 1, 0, state.editing.questions[index]);
    state.editing.questions.splice(index + 1, 1);
  },
  [types.DOWN_QUESTION] (state, index) {
    // 下移
    state.editing.questions.splice(index + 2, 0, state.editing.questions[index]);
    state.editing.questions.splice(index, 1);
  },

  [types.COPY_QUESTION] (state, index) {
    // 复用问题
    // const copy = Object.assign({}, state.editing.questions[index]);
    const copy = cloneObject(state.editing.questions[index]);
    state.editing.questions.splice(index, 0, copy);
  },
  [types.UPDATE_QNTITLE] (state, {index, value}) {
    // 更改问题题目
    state.editing.questions[index].content = value;
  },
  [types.ADD_OPTION] (state, index) {
    // 添加选项
    state.editing.questions[index].options.push('选项' + (state.editing.questions[index].options.length + 1));
  },
  [types.DELETE_OPTION] (state, {index, oindex}) {
    // 移除选项
    state.editing.questions[index].options.splice(oindex, 1);
  },
  [types.UPDATE_OPTION] (state, {index, oindex, value}) {
    // 更改问题题目
    state.editing.questions[index].options[oindex] = value;
  },
  [types.FILL_TEXT] (state, {index, value}) {
    // 填写文本题
    state.editing.data[index] = value;
  },
  [types.SELECTED_ANSWER] (state, {type, index, oindex, value}) {
    // 选择答案
    if (type === 'checkbox') {
      if (value === '') {
        // 移除值为oindex的即可。
       // let arr = state.editing.data[index];
        state.editing.data[index].forEach((val, i) => {
          if (val === oindex) {
            state.editing.data[index].splice(i, 1);
          }
        });
        /* for (let i = 0, len = arr.length; i < len; i++) {
          if (arr[i] === oindex) {
            state.editing.data[index].splice(i, 1);
            break;
          }
        } */
      } else {
        state.editing.data[index].push(oindex);
      }
    } else {
      // 单选
      state.editing.data[index] = oindex;
    }
  },
  [types.UPDATE_ISREQUIRED] (state, index) {
    console.log('原值：' + state.editing.questions[index].isRequired);
    state.editing.questions[index].isRequired = !state.editing.questions[index].isRequired;
  },
  [types.VALIDATE_QUESTIONNAIRE] (state) {
    // 验证问卷
    state.status.isReasonableTime = state.editing.time !== 0;
    // state.status.isReasonableQn 验证问卷题目
    var len = state.editing.questions.length;
    if (len === 0) {
      state.status.isReasonableQn = false;
    } else {
      for (var i = 0; i < len; i++) {
        let content = state.editing.questions[i].content;
        // console.log(content);
        if (content === '单选题' || content === '多选题' || content === '文本题') {
          state.status.isReasonableQn = false;
          break;
        }
      }
      if (i === len) {
        state.status.isReasonableQn = true;
      }
    }
  },
  [types.SAVE_DATE] (state, date) {
    // 保存截止日期
    state.editing.time = date;
  },
  [types.VALIDATE_DATA] (state) {
    state.status.isReasonableData = true;
    state.editing.data.forEach((value, index) => {
      if ((value === -1 || value.length === 0) && (typeof value !== 'string')) {
        state.status.isReasonableData = false;
      } else if (value === '') {
        if (state.editing.questions[index].isRequired === true) {
          state.status.isReasonableData = false;
        }
      }
    });
  }
};
