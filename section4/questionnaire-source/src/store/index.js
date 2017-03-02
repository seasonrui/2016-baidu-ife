import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import * as actions from './actions.js';
import * as getters from './getters.js';
import { cloneObject } from './util.js';

Vue.use(Vuex);
const mockdata = [
  {
    'questionnaireId': 'c68ebba5-b176-49e0-b91d-07ff389d226a',
    'title': '教学满意度调查',
    'status': '已发布',
    'time': '2017年5月31日',
    'questions': [
      {
        'type': 'radio',
        'content': '性别',
        'options': ['男', '女']
      },
      {
        'type': 'radio',
        'content': '对教材的满意程度',
        'options': ['一般满意', '较为满意', '很满意', '特别满意']},
      {
        'type': 'checkbox',
        'content': '该老师课堂教学以什么方式为主',
        'options': ['教授知识点', '大量的练习', '知识点与练习相结合']
      },
      {
        'type': 'text',
        'content': '你认为教学课堂有哪些还需要改进的',
        'isRequired': true
      }
    ],
    'data': [
      [0, 0, [1, 0], '风趣幽默'],
      [1, 1, [1, 2], '增加互动练习'],
      [1, 2, [0], '提高各方面的能力'],
      [1, 3, [1, 0], '教学能力增强'],
      [1, 1, [1, 2], '思考和解决问题的能力']
    ]
  },
  {
    'questionnaireId': '2cc7b14b-a166-443e-a022-222052053905',
    'title': '求职意向调查',
    'status': '未发布',
    'time': '2017年4月29日',
    'questions': [
      {
        'type': 'radio',
        'content': '性别',
        'options': ['男', '女']
      },
      {
        'type': 'checkbox',
        'content': '求职过程中会考虑哪些方面',
        'options': ['地域', '薪资与福利', '个人发展机会', '单位性质', '家庭期望']
      },
      { 'type': 'text',
        'content': '你的专业是',
        'isRequired': false
      }
    ],
    'data': []
  }
];
if (!localStorage.list) {
  localStorage.setItem('list', JSON.stringify(mockdata));
}
const list = JSON.parse(localStorage.list);
// 正在编辑的问卷
export const initEditing = {
  questionnaireId: -1,
  title: '这里是标题',
  status: '未发布',
  time: 0,
  questions: [],
  data: []
};
export const status = {
  isChooseType: false,
  isReasonableData: true,
  isReasonableTime: false,
  isReasonableQn: false
};
const state = {
  list,
  editing: cloneObject(initEditing),
  status: cloneObject(status)
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
