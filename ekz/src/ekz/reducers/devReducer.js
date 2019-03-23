import {patch} from "~/reducers/utils/stateUtils"

export const ACTION_DEV = "ACTION_DEV"

const initialState = {
  devValue: null
}

export default function devReducer(state=initialState, action){
  switch (action.type){
    case ACTION_DEV:
      return patch(state, {
        devValue: action.devValue,
      })
    default:
      return state

  }
}

export function actionDev(devValue){
  return {
    type: ACTION_DEV,
    devValue
  }
}