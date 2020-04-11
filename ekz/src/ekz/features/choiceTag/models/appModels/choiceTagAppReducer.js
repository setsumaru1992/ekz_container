import {
  Request,
  HTTP_METHODS,
  Url,
} from "~/lib/apiServerAccess"
import {toggleFormVisible} from "~/features/choiceTag/models/viewModels/choiceTagViewReducer"

const choiceTagUrlCreator = (argPath, methodStr = HTTP_METHODS.GET) => {
  return (choiceId, tagId = null) => {
    let path = `choices/${choiceId}/tags`
    if(tagId !== null){
      path = `${path}/${tagId}`
    }
    return new Url(`${path}/${argPath}`, methodStr)
  }
}
const URLS = {
  tags: choiceTagUrlCreator(""),
  new: choiceTagUrlCreator("", HTTP_METHODS.POST),
  delete: choiceTagUrlCreator("", HTTP_METHODS.DELETE),
}


export function choiceTags(choiceId){
  return (dispatch) => {
    return new Request().access(URLS.tags(choiceId), {}, data => {
      dispatch(actionChoiceTags(data.tags))
    })
  }
}

function actionChoiceTags(list){
  return {
    type: ACTION_CHOICE_TAGS,
    list: list
  }
}
const ACTION_CHOICE_TAGS = "ACTION_CHOICE_TAGS"

export function createTag(formdata){
  const choiceId = formdata.choice_id
  return (dispatch) => {
    console.log(formdata)
    return new Request().access(URLS.new(choiceId), formdata, data => {
      dispatch(choiceTags(choiceId))
      dispatch(toggleFormVisible(choiceId))
    })
  }
}

export function removeTag(choiceId, tagId){
  return (dispatch) => {
    return new Request().access(URLS.delete(choiceId, tagId), {}, data => {
      dispatch(choiceTags(choiceId))
    })
  }
}

let sampleState = {
  list: []
}

export default function choiceTagAppReducer(state = sampleState, action){
  switch (action.type) {
    case ACTION_CHOICE_TAGS:
      return {list: action.list}
    default:
      return state
  }
}