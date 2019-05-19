import {requestGetterWithoutParam} from "~/common/request"
import {actionChoiceVisibleForm} from "~/reducers/choicesViewReducer"
import {HTTP_METHODS} from "~/common/const"
import EkzState from "~/models/choice/ekzState"
import {ACTION_CHOICE_CHANGED} from "./choicesAppReducer";

export const ACTION_EKZ_LIST = "ACTION_EKZ_LIST"
export const ACTION_EKZ_REFLESH_LIST = "ACTION_EKZ_REFLESH_LIST"
export const ACTION_EKZ_UPDATED_EVALUTION = "ACTION_EKZ_UPDATED_EVALUTION"
export const ACTION_EKZ_CHANGED = "ACTION_EKZ_CHANGED"

const URL_BASE = "choices/"
const REQUEST_GETTERS = {
  GET_BY_IDS: requestGetterWithoutParam(URL_BASE + "show_by_ids", HTTP_METHODS.GET),
  GET_EKZ: requestGetterWithoutParam(URL_BASE + "ekz", HTTP_METHODS.GET),
  NEW: requestGetterWithoutParam(URL_BASE + "new", HTTP_METHODS.POST),
  DESTROY: requestGetterWithoutParam(URL_BASE + "destroy", HTTP_METHODS.DELETE),
  UPDATE: requestGetterWithoutParam(URL_BASE + "update", HTTP_METHODS.PATCH),
  UPDATE_EVALUATION: requestGetterWithoutParam(URL_BASE + "update_evaluation", HTTP_METHODS.PATCH),
}

export default function ekzAppReducer(state = new EkzState(), action){
  let updatedState = state
  switch (action.type) {
    case ACTION_EKZ_LIST:
      updatedState = updatedState.setEkzList(action.ekzList)
      updatedState = updatedState.setTheme(action.theme)
      return updatedState
    case ACTION_EKZ_REFLESH_LIST:
      return state
    case ACTION_EKZ_CHANGED:
      return state
    case ACTION_EKZ_UPDATED_EVALUTION:
      return updatedState.updateEkzEvaluation(action.choiceId, action.evaluation)
    default:
      return state
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
    type: ACTION_EKZ_CHANGED,
  }
}

export function actionAsyncChoiceNew(choice){
  return (dispatch) =>{
    return REQUEST_GETTERS.NEW(choice).access((data) => {
      dispatch(actionChoiceChanged())
      dispatch(actionChoiceVisibleForm(choice.theme_id))
    })
  }
}

export function actionAsyncChoiceUpdate(choice){
  return (dispatch) =>{
    return REQUEST_GETTERS.UPDATE(choice).access((data) => {
      dispatch(actionChoiceChanged())
      dispatch(actionChoiceVisibleForm(choice.theme_id, choice.id))
    })
  }
}

export function actionAsyncChoiceDestroy(choiceId, themeId){
  return (dispatch) =>{
    return REQUEST_GETTERS.DESTROY({id: choiceId}).access((data) => {
      dispatch(actionChoiceChanged())
    })
  }
}

export function actionChoiceUpdateEvaluation(choiceId, evaluation){
  return  {
    type: ACTION_EKZ_UPDATED_EVALUTION,
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