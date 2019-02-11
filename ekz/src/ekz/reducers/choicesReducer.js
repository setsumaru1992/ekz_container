import {req} from "~/common/axios"
import {patch} from "~/reducers/_utils/stateUtils"

export const ACTION_CHOICE_LIST = "ACTION_CHOICE_LIST"
const URLS = {
  GET_ALL: "choices/show"
}

const initialState = {
  choiceList: []
}

function actionChoiceList(choiceList){
  return  {
    type: ACTION_CHOICE_LIST,
    choiceList
  }
}

export function actionAsyncChoiceList(){
  return (dispatch) =>{
    return req(URLS.GET_ALL, {}, (data) => {
      dispatch(actionChoiceList(data.choiceList))
    })
  }
}

export default function choicesReducer(state = initialState, action){
  switch (action.type) {
    case ACTION_CHOICE_LIST:
      return patch(state, {
        choiceList: action.choiceList
      })
    default:
      return state
  }
}