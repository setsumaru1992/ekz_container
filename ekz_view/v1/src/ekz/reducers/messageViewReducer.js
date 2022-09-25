import {patch} from "~/reducers/utils/stateUtils"

export const ACTION_SHOW_MESSAGE = "ACTION_SHOW_MESSAGE"
export const ACTION_HIDE_MESSAGE = "ACTION_HIDE_MESSAGE"

export const MESSAGE_TYPE_NORMAL = "MESSAGE_TYPE_NORMAL"
export const MESSAGE_TYPE_ERROR = "MESSAGE_TYPE_ERROR"

export const DEFAULT_VISIBLE_SECOND = 3
export const ERROR_VISIBLE_SECOND = 10

const initialState = {
  visible: false,
  message: "",
  messageType: MESSAGE_TYPE_NORMAL,
}
// 実質stateの値だが、1秒ごとに変更するごとに再renderさせたくないためstateから除きグローバル変数化
let remainVisibleSecond = DEFAULT_VISIBLE_SECOND
let remainSecondCounter = null

export default function messageViewReducer(state=initialState, action){
  switch (action.type) {
    case ACTION_SHOW_MESSAGE:
      return patch(state, {
        visible: true,
        message: action.message,
        messageType: action.messageType,
      })
    case ACTION_HIDE_MESSAGE:
      return patch(state, {
        visible: false
      })
    default:
      return state
  }
}

export function actionShowMessage(message, messageType = MESSAGE_TYPE_NORMAL){
  if(message == ""){
    message = "done!"
  }
  return (dispatch) => {
    dispatch({
      type: ACTION_SHOW_MESSAGE,
      message,
      messageType,
    })
    dispatch(actionCountVisibleTime(messageType))
  }
}

function actionCountVisibleTime(messageType){
  return (dispatch) => {
    switch (messageType) {
      case MESSAGE_TYPE_NORMAL:
        remainVisibleSecond = DEFAULT_VISIBLE_SECOND
        break;
      case MESSAGE_TYPE_ERROR:
        remainVisibleSecond = ERROR_VISIBLE_SECOND
        break;
    }

    clearInterval(remainSecondCounter)
    remainSecondCounter = setInterval(()=>{
      remainVisibleSecond--
      if(remainVisibleSecond <= 0){
        clearInterval(remainSecondCounter)
        dispatch(actionHideMessage())
      }
    }, 1000)
  }
}

export function actionHideMessage(){
  return {
    type: ACTION_SHOW_MESSAGE,
  }
}