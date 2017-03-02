import Vue from 'vue';
import Router from 'vue-router';
import myQuestionnaire from 'components/myQuestionnaire';
import editQuestionnaire from 'components/editQuestionnaire';
import fillQuestionnaire from 'components/fillQuestionnaire';
import calendar from 'components/calendar';
import dataShow from 'components/dataShow';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: myQuestionnaire
    },
    {
      path: '/myQuestionnaire',
      name: '',
      component: myQuestionnaire
    },
    {
      path: '/calendar',
      name: '',
      component: calendar
    },
    {
      path: '/editQuestionnaire',
      name: '',
      component: editQuestionnaire
    },
    {
      path: '/editQuestionnaire/:id',
      name: 'id',
      component: editQuestionnaire
    },
    {
      path: '/fillQuestionnaire/:id',
      name: 'fill',
      component: fillQuestionnaire
    },
    {
      path: '/dataShow/:id',
      name: 'data',
      component: dataShow
    }
  ]
});
