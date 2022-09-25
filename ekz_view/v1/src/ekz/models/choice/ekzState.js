import {Record} from "immutable"
import {updateStateField} from "~/reducers/utils/stateUtils"

const EkzStateRecord = Record({
  theme: {
    id: null,
    name: "",
  },
  ekzList: [],
})

export default class EkzState extends EkzStateRecord {
  setTheme(theme){
    return updateStateField(this, {
      theme: theme,
    })
  }

  getTheme(){
    return this.get("theme")
  }

  setEkzList(ekzList){
    return updateStateField(this, {
      ekzList: ekzList
    })
  }

  getEkzList(){
    return this.get("ekzList")
  }

  getEkzBy(choiceId){
    return this.getEkzList().filter(choice => {
      return choice.id === choiceId
    })[0]
  }

  setEkzToEkzList(choice){
    let ekzList = this.getEkzList().map(choiceElem => {
      if(choiceElem.id === choice.id){
        return choice
      } else {
        return choiceElem
      }
    })
    return updateStateField(this, {
      ekzList: ekzList
    })
  }

  setEkzList(ekzList){
    return updateStateField(this, {
      ekzList: ekzList
    })
  }

  getEkzList(){
    return this.get("ekzList")
  }

  updateEkzEvaluation(choiceId, evaluation){
    let choiceForUpdate = this.getEkzBy(choiceId)
    choiceForUpdate.evaluation = evaluation
    return this.setEkzToEkzList(choiceForUpdate)
  }
}