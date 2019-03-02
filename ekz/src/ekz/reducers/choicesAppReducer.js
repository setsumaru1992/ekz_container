import {requestGetterWithoutParam} from "~/common/request"
import {patch, updateObject} from "~/reducers/utils/stateUtils"
import {actionChoiceVisibleForm} from "~/reducers/choicesViewReducer"
import {HTTP_METHODS} from '~/common/const'

export const ACTION_CHOICE_LIST = "ACTION_CHOICE_LIST"
export const ACTION_EKZ_LIST = "ACTION_EKZ_LIST"
export const ACTION_EKZ_REFLESH_LIST = "ACTION_EKZ_REFLESH_LIST"
export const ACTION_CHOICE_UPDATED_EVALUTION = "ACTION_CHOICE_UPDATED_EVALUTION"
export const ACTION_CHOICE_CHANGED = "ACTION_CHOICE_CHANGED"

const URL_BASE = "choices/"
const REQUEST_GETTERS = {
  GET_ALL: requestGetterWithoutParam(URL_BASE + "show", HTTP_METHODS.GET),
  GET_BY_IDS: requestGetterWithoutParam(URL_BASE + "show_by_ids", HTTP_METHODS.GET),
  GET_EKZ: requestGetterWithoutParam(URL_BASE + "ekz", HTTP_METHODS.GET),
  NEW: requestGetterWithoutParam(URL_BASE + "new", HTTP_METHODS.POST),
  DESTROY: requestGetterWithoutParam(URL_BASE + "destroy", HTTP_METHODS.DELETE),
  UPDATE: requestGetterWithoutParam(URL_BASE + "update", HTTP_METHODS.PATCH),
  UPDATE_EVALUATION: requestGetterWithoutParam(URL_BASE + "update_evaluation", HTTP_METHODS.PATCH),
}

const initialState = {
  choiceListMap: {},
  /* sample
  {
    [themeId]: {
      themeInfo: [theme],
      choiceList: [choiceList]
    }
  }
  */
  ekzListMap: {},
  /* sample
  {
    [themeId]: {
      themeInfo: [theme],
      ekzList: [ekzList]
    }
  }
  */
  ekzIdList: [],
  choiceEvaluationMap: {},
  /* sample
  {
    [choiceId]: [evaluation],
  }
  */
}

export default function choicesAppReducer(state = initialState, action){
  switch (action.type) {
    case ACTION_CHOICE_LIST:
      let choiceEvaluationMap = {}
      action.choiceList.forEach((choice) => {
        choiceEvaluationMap[choice.id] = choice.evaluation
      })
      return patch(state, {
        choiceListMap: updateObject(
          state.choiceListMap, action.theme.id, {
            themeInfo: action.theme,
            choiceList: action.choiceList
          }
        ),
        choiceEvaluationMap: choiceEvaluationMap
      })
    case ACTION_EKZ_LIST:
      return patch(state, {
        ekzListMap: updateObject(
          state.ekzListMap, action.theme.id, {
            themeInfo: action.theme,
            ekzList: action.ekzList
          }
        ),
        ekzIdList: action.ekzList.map((ekzChoice) => {
          return ekzChoice.id
        }),
      })
    case ACTION_EKZ_REFLESH_LIST:
      return patch(state, {
        ekzListMap: updateObject(
          state.ekzListMap, action.themeId, {
            themeInfo: state.ekzListMap[action.themeId].themeInfo,
            ekzList: action.ekzList
          }
        ),
        ekzIdList: action.ekzList.map((ekzChoice) => {
          return ekzChoice.id
        })
      })
    case ACTION_CHOICE_CHANGED:
      return state
    case ACTION_CHOICE_UPDATED_EVALUTION:
      return patch(state, {
        choiceEvaluationMap: updateObject(
          state.choiceEvaluationMap, action.choiceId, action.evaluation
        )
      })
    default:
      return state
  }
}

function actionChoiceList(theme, choiceList){
  return  {
    type: ACTION_CHOICE_LIST,
    theme,
    choiceList,
  }
}

export function actionAsyncChoiceList(themeId){
  return (dispatch) =>{
    return REQUEST_GETTERS.GET_ALL({theme_id: themeId}).access((data) => {
      dispatch(actionChoiceList(data.theme, data.choice_list))
    })
  }
}

function actionEkzList(theme, ekzList){
  return  {
    type: ACTION_EKZ_LIST,
    theme,
    ekzList,
  }
}

export function actionAsyncEkzList(themeId){
  return (dispatch) =>{
    return REQUEST_GETTERS.GET_EKZ({theme_id: themeId}).access((data) => {
      dispatch(actionEkzList(data.theme, data.ekz_list))
    })
  }
}

function actionRefleshEkzList(themeId, ekzList){
  return  {
    type: ACTION_EKZ_REFLESH_LIST,
    themeId,
    ekzList,
  }
}

export function actionAsyncRefleshEkzList(themeId, choiceIdList){
  return (dispatch) => {
    return REQUEST_GETTERS.GET_BY_IDS({ids: choiceIdList}).access((data) => {
      dispatch(actionRefleshEkzList(themeId, data.ekz_list))
    })
  }
}

export function actionChoiceChanged(){
  return {
    type: ACTION_CHOICE_CHANGED,
  }
}

export function actionAsyncChoiceNew(choice){
  return (dispatch) =>{
    return REQUEST_GETTERS.NEW(choice).access((data) => {
      dispatch(actionChoiceChanged())
      dispatch(actionChoiceVisibleForm(choice.theme_id))
      dispatch(actionAsyncChoiceList(choice.theme_id))
    })
  }
}

export function actionAsyncChoiceUpdate(choice){
  return (dispatch) =>{
    return REQUEST_GETTERS.UPDATE(choice).access((data) => {
      dispatch(actionChoiceChanged())
      dispatch(actionChoiceVisibleForm(choice.theme_id, choice.id))
      dispatch(actionAsyncChoiceList(choice.theme_id))
    })
  }
}

export function actionAsyncChoiceDestroy(choiceId, themeId){
  return (dispatch) =>{
    return REQUEST_GETTERS.DESTROY({id: choiceId}).access((data) => {
      dispatch(actionChoiceChanged())
      dispatch(actionAsyncChoiceList(themeId))
    })
  }
}

export function actionChoiceUpdateEvaluation(choiceId, evaluation){
  return  {
    type: ACTION_CHOICE_UPDATED_EVALUTION,
    choiceId,
    evaluation,
  }
}

export function actionAsyncChoiceUpdateEvaluation(choiceId, evaluation, themeId){
  return (dispatch) =>{
    return REQUEST_GETTERS.UPDATE_EVALUATION({id:choiceId, evaluation: evaluation}).access((data) => {
      dispatch(actionChoiceUpdateEvaluation(choiceId, evaluation))
      dispatch(actionChoiceChanged())
    })
  }
}