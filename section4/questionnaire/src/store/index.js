import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import * as actions from './actions.js';
import * as getters from './getters.js';
import { cloneObject } from './util.js';

Vue.use(Vuex);
const list = localStorage.list ? JSON.parse(localStorage.list) : [];
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
