import {req} from "~/common/axios"
import {patch} from "~/reducers/_utils/stateUtils"
import {HTTP_METHODS} from '~/common/const'

export const ACTION_CHOICE_LIST = "ACTION_CHOICE_LIST"
export const ACTION_CHOICE_CHANGED = "ACTION_CHOICE_CHANGED"

const URL_BASE = "choices/"
const URLS = {
  GET_ALL: URL_BASE + "show",
  NEW: URL_BASE + "new",
  DESTROY: URL_BASE + "destroy",
}

const initialState = {
  choiceListMap: {}
}

function actionChoiceList(themeId, choiceList){
  return  {
    type: ACTION_CHOICE_LIST,
    themeId,
    choiceList,
  }
}

export function actionAsyncChoiceList(themeId){
  return (dispatch) =>{
    return req(URLS.GET_ALL, {themeId: themeId}, (data) => {
      dispatch(actionChoiceList(themeId, data.choiceList))
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
    return req(URLS.NEW, choice, (data) => {
      dispatch(actionChoiceChanged())
      dispatch(actionAsyncChoiceList(choice.themeId))
    }, HTTP_METHODS.POST)
  }
}

export function actionAsyncChoiceDestroy(choiceId, themeId){
  return (dispatch) =>{
    return req(URLS.DESTROY, {id: choiceId}, (data) => {
      dispatch(actionChoiceChanged())
      dispatch(actionAsyncChoiceList(themeId))
    }, HTTP_METHODS.DELETE)
  }
}

export default function choicesReducer(state = initialState, action){
  switch (action.type) {
    case ACTION_CHOICE_LIST:
      let newChoiceListObj = {}
      newChoiceListObj[action.themeId] = action.choiceList
      return patch(state, {
        choiceListMap: patch(state.choiceListMap, newChoiceListObj)
      })
    case ACTION_CHOICE_CHANGED:
      return state
    default:
      return state
  }
}