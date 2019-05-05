import {Record} from "immutable"
import {updateStateField} from "~/reducers/utils/stateUtils"

const ChoiceStateRecord = Record({
  theme: {
    id: null,
    name: "",
  },
  choiceList: [],
  ekzList: [],
  /*
  choiceMapと同じ構造
   */
})

export default class ChoiceState extends ChoiceStateRecord {
  setTheme(theme){
    return updateStateField(this, {
      theme: theme,
    })
  }

  getTheme(){
    return this.get("theme")
  }

  setChoiceList(choiceList){
    return updateStateField(this, {
      choiceList: choiceList
    })
  }

  getChoiceList(){
    return this.get("choiceList")
  }

  getChoiceBy(choiceId){
    return this.getChoiceList().filter(choice => {
      return choice.id === choiceId
    })[0]
  }

  setChoiceToChoiceList(choice){
    let choiceList = this.getChoiceList().map(choiceElem => {
      if(choiceElem.id === choice.id){
        return choice
      } else {
        return choiceElem
      }
    })
    return updateStateField(this, {
      choiceList: choiceList
    })
  }

  updateChoiceEvaluation(choiceId, evaluation){
    let choiceForUpdate = this.getChoiceBy(choiceId)
    choiceForUpdate.evaluation = evaluation
    return this.setChoiceToChoiceList(choiceForUpdate)
  }

  setEkzList(ekzList){
    return updateStateField(this, {
      ekzList: ekzList
    })
  }

  getEkzList(){
    return this.get("ekzList")
  }
}