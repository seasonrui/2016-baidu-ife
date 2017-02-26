import * as types from './mutation-types';

function makeAction (type) {
  return ({ commit }, ...args) => commit(type, ...args);
};
export const addQuestionnaire = makeAction(types.ADD_QUESTIONNAIRE);
export const editQuestionnaire = makeAction(types.EDIT_QUESTIONNAIRE);
export const deleteQuestionnaire = makeAction(types.DELETE_QUESTIONNAIRE);
export const saveQuestionnaire = makeAction(types.SAVE_QUESTIONNAIRE);
export const releaseQuestionnaire = makeAction(types.RELEASE_QUESTIONNAIRE);
export const fillQuestionnaire = makeAction(types.FILL_QUESTIONNAIRE);
export const submitQuestionnaire = makeAction(types.SUBMIT_QUESTIONNAIRE);
export const updateTitle = makeAction(types.UPDATE_TITLE);
export const chooseType = makeAction(types.CHOOSE_TYPE);
export const addQuestion = makeAction(types.ADD_QUESTION);
export const deleteQuestion = makeAction(types.DELETE_QUESTION);
export const moveQuestion = makeAction(types.MOVE_QUESTION);
export const copyQuestion = makeAction(types.COPY_QUESTION);
export const upQuestion = makeAction(types.UP_QUESTION);
export const downQuestion = makeAction(types.DOWN_QUESTION);
export const updateQnTitle = makeAction(types.UPDATE_QNTITLE);
export const addOption = makeAction(types.ADD_OPTION);
export const updateOption = makeAction(types.UPDATE_OPTION);
export const deleteOption = makeAction(types.DELETE_OPTION);
export const updateIsrequired = makeAction(types.UPDATE_ISREQUIRED);
export const selectedAnswer = makeAction(types.SELECTED_ANSWER);
export const fillText = makeAction(types.FILL_TEXT);
export const statisticsQuestionnaire = makeAction(types.STATISTICS_QUESTIONNAIRE);
export const validateQuestionnaire = makeAction(types.VALIDATE_QUESTIONNAIRE);
export const saveDate = makeAction(types.SAVE_DATE);
export const validateData = makeAction(types.VALIDATE_DATA);
