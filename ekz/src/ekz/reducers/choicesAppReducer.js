import {requestGetterWithoutParam} from "~/common/request"
import {actionChoiceVisibleForm} from "~/reducers/choicesViewReducer"
import {HTTP_METHODS} from "~/common/const"
import ChoiceState from "~/models/choice/choiceState"

export const ACTION_CHOICE_LIST = "ACTION_CHOICE_LIST"
export const ACTION_CHOICE_DETAIL = "ACTION_CHOICE_DETAIL"
export const ACTION_CHOICE_UPDATED_EVALUTION = "ACTION_CHOICE_UPDATED_EVALUTION"
export const ACTION_CHOICE_CHANGED = "ACTION_CHOICE_CHANGED"

const URL_BASE = "choices/"
const REQUEST_GETTERS = {
  GET_ALL: requestGetterWithoutParam(URL_BASE + "show", HTTP_METHODS.GET),
  DETAIL: requestGetterWithoutParam(URL_BASE + "detail", HTTP_METHODS.GET),
  NEW: requestGetterWithoutParam(URL_BASE + "new", HTTP_METHODS.POST),
  DESTROY: requestGetterWithoutParam(URL_BASE + "destroy", HTTP_METHODS.DELETE),
  UPDATE: requestGetterWithoutParam(URL_BASE + "update", HTTP_METHODS.PATCH),
  UPDATE_EVALUATION: requestGetterWithoutParam(URL_BASE + "update_evaluation", HTTP_METHODS.PATCH),
}

export default function choicesAppReducer(state = new ChoiceState(), action){
  let updatedState = state
  switch (action.type) {
    case ACTION_CHOICE_LIST:
      updatedState = updatedState.setChoiceList(action.choiceList)
      updatedState = updatedState.setTheme(action.theme)
      return updatedState
    case ACTION_CHOICE_DETAIL:
      return updatedState.setChoiceDetail(action.choice)
    case ACTION_CHOICE_CHANGED:
      return state
    case ACTION_CHOICE_UPDATED_EVALUTION:
      return updatedState.updateChoiceEvaluation(action.choiceId, action.evaluation)
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

function actionChoiceDetail(choice){
  return  {
    type: ACTION_CHOICE_DETAIL,
    choice
  }
}

export function actionAsyncChoiceDetail(choiceId){
  return (dispatch) =>{
    return REQUEST_GETTERS.DETAIL({id: choiceId}).access((data) => {
      dispatch(actionChoiceDetail(data.choice))
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