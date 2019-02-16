import {requestGetterWithoutParam} from "~/common/request"
import {patch, updateObject, toggleObjValue} from "~/reducers/utils/stateUtils"
import {HTTP_METHODS} from '~/common/const'

export const ACTION_CHOICE_LIST = "ACTION_CHOICE_LIST"
export const ACTION_CHOICE_CHANGED = "ACTION_CHOICE_CHANGED"

const URL_BASE = "choices/"
const REQUEST_GETTERS = {
  GET_ALL: requestGetterWithoutParam(URL_BASE + "show", HTTP_METHODS.GET),
  NEW: requestGetterWithoutParam(URL_BASE + "new", HTTP_METHODS.POST),
  DESTROY: requestGetterWithoutParam(URL_BASE + "destroy", HTTP_METHODS.DELETE),
}

const initialState = {
  choiceListMap: {},
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
    return REQUEST_GETTERS.GET_ALL({themeId: themeId}).access((data) => {
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
    return REQUEST_GETTERS.NEW(choice).access((data) => {
      dispatch(actionChoiceChanged())
      dispatch(actionAsyncChoiceList(choice.themeId))
    }, HTTP_METHODS.POST)
  }
}

export function actionAsyncChoiceDestroy(choiceId, themeId){
  return (dispatch) =>{
    return REQUEST_GETTERS.DESTROY({id: choiceId}).access((data) => {
      dispatch(actionChoiceChanged())
      dispatch(actionAsyncChoiceList(themeId))
    }, HTTP_METHODS.DELETE)
  }
}

export default function choicesViewReducer(state = initialState, action){
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