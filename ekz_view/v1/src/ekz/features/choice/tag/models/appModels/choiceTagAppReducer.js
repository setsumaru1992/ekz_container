import {
  Request,
  HTTP_METHODS,
  Url,
} from "~/lib/apiServerAccess"
import {toggleFormVisible} from "~/features/choice/tag/models/viewModels/choiceTagViewReducer"

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


export function refleshChoiceTags(choiceId){
  return (dispatch) => {
    return new Request().access(URLS.tags(choiceId), {}, data => {
      dispatch(actionChoiceTags(data.tags, choiceId))
    })
  }
}

function actionChoiceTags(list, choiceId){
  return {
    type: ACTION_CHOICE_TAGS,
    list,
    choiceId
  }
}
const ACTION_CHOICE_TAGS = "ACTION_CHOICE_TAGS"

export function createTag(formdata){
  const choiceId = formdata.choice_id
  return (dispatch) => {
    return new Request().access(URLS.new(choiceId), formdata, data => {
      dispatch(refleshChoiceTags(choiceId))
      dispatch(toggleFormVisible(choiceId))
    })
  }
}

export function removeTag(choiceId, tagId){
  return (dispatch) => {
    return new Request().access(URLS.delete(choiceId, tagId), {}, data => {
      dispatch(refleshChoiceTags(choiceId))
    })
  }
}

let sampleState = {
  choiceTags: {}
}

export default function choiceTagAppReducer(state = sampleState, action){
  switch (action.type) {
    case ACTION_CHOICE_TAGS:
      let newChoiceTags = Object.assign({}, state.choiceTags)
      newChoiceTags[action.choiceId] = action.list
      return {choiceTags: newChoiceTags}
    default:
      return state
  }
}