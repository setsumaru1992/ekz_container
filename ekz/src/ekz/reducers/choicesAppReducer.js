import {requestGetterWithoutParam} from "~/common/request"
import {HTTP_METHODS} from "~/common/const"
import {
  Request,
  Url,
} from "~/lib/apiServerAccess"
import * as ExistUtil from "~/lib/existUtil";
import {actionChoiceVisibleForm, actionChoiceVisibleFileForm} from "~/reducers/choicesViewReducer"
import ChoiceState from "~/models/choice/choiceState"
import {actionShowMessage, MESSAGE_TYPE_ERROR} from "~/reducers/messageViewReducer"

export const ACTION_CHOICE_LIST = "ACTION_CHOICE_LIST"
export const ACTION_CHOICE_DETAIL = "ACTION_CHOICE_DETAIL"
export const ACTION_CHOICE_UPDATED_EVALUTION = "ACTION_CHOICE_UPDATED_EVALUTION"
export const ACTION_CHOICE_CHANGED = "ACTION_CHOICE_CHANGED"

const URL_BASE = "choices/"
const choiceUrlCreator = (argPath, methodStr = HTTP_METHODS.GET) => {
  return new Url(`choices/${argPath}`, methodStr)
}
const REQUEST_GETTERS = {
  SEARCH: requestGetterWithoutParam(URL_BASE + "show", HTTP_METHODS.GET),
  DETAIL: requestGetterWithoutParam(URL_BASE + "detail", HTTP_METHODS.GET),
  DESTROY: requestGetterWithoutParam(URL_BASE + "destroy", HTTP_METHODS.DELETE),
  UPDATE: requestGetterWithoutParam(URL_BASE + "update", HTTP_METHODS.PATCH),
  UPDATE_EVALUATION: requestGetterWithoutParam(URL_BASE + "update_evaluation", HTTP_METHODS.PATCH),
}

const URLS = {
  new: choiceUrlCreator("new", HTTP_METHODS.POST),
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

export function actionAsyncChoiceList(themeId, searchWord = ""){
  return (dispatch) =>{
    return REQUEST_GETTERS.SEARCH({theme_id: themeId, search_word: searchWord}).access((data) => {
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

export function actionChoiceChanged(message = ""){
  return (dispatch) => {
    dispatch(actionShowMessage(message))
  }
}

export function actionAsyncChoiceNew(choice){
  return registOrUpdateChoice(choice)
}

function registOrUpdateChoice(choice){
  return (dispatch) =>{
    let sendData = null
    if(choice.image !== null){
      sendData = new FormData()
      if(ExistUtil.exist(choice.theme_id)) sendData.append("theme_id", choice.theme_id)
      if(ExistUtil.exist(choice.id)) sendData.append("id", choice.id)
      if(ExistUtil.exist(choice.name)) sendData.append("name", choice.name)
      if(ExistUtil.exist(choice.url)) sendData.append("url", choice.url)
      if(ExistUtil.exist(choice.description)) sendData.append("description", choice.description)
      if(ExistUtil.exist(choice.evaluation)) sendData.append("evaluation", choice.evaluation)
      if(ExistUtil.exist(choice.image)) sendData.append("image", choice.image)
    } else {
      sendData = choice
    }
    return new Request().access(URLS.new, sendData, (data) => {
      dispatch(actionChoiceChanged())
      dispatch(actionChoiceVisibleForm(choice.theme_id))
      dispatch(actionAsyncChoiceList(choice.theme_id))
    }, (e, status, message) => {
      dispatch(actionShowMessage(`Error: ${status} ${message}`, MESSAGE_TYPE_ERROR))
    })
  }
}

export function actionAsyncChoiceUpdate(choice){
  return registOrUpdateChoice(choice)
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