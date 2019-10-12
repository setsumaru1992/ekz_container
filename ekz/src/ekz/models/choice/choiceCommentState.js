import {Record} from "immutable"
import {updateStateField} from "~/reducers/utils/stateUtils"

const ChoiceCommentStateRecord = Record({
  commentMap: {},
  /*
  sample
  {
    <choiceId>: [<comment>, ..]
  }
   */
})

export default class ChoiceCommentState extends ChoiceCommentStateRecord {
  setComments(choiceId, comments) {
    let commentMap = this.getCommentMap()
    const newCommentKeyValue = {}
    newCommentKeyValue[choiceId] = comments
    commentMap = Object.assign({}, commentMap, newCommentKeyValue)
    return updateStateField(this, {
      commentMap: commentMap,
    })
  }

  addComment(choiceId, comment) {
    let commentMap = this.getCommentMap()
    let comments = commentMap[choiceId]
    if(!(comments instanceof Array)){
      comments = []
    }
    comments.push(comment)
    const newCommentKeyValue = {}
    newCommentKeyValue[choiceId] = comments
    commentMap = Object.assign({}, commentMap, newCommentKeyValue)
    return updateStateField(this, {
      commentMap: commentMap,
    })
  }

  getCommentMap() {
    return this.get("commentMap")
  }

  getComments(choiceId) {
    return this.getCommentMap()[choiceId]
  }
}