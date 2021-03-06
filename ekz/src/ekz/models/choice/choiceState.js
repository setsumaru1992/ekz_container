import {Record} from "immutable"
import {updateStateField} from "~/reducers/utils/stateUtils"

const ChoiceStateRecord = Record({
  theme: {
    id: null,
    name: "",
  },
  choiceList: [],
  choiceDetail: {},
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

  setChoiceDetail(choiceDetail){
    return updateStateField(this, {
      choiceDetail: choiceDetail
    })
  }

  getChoiceDetail(){
    return this.get("choiceDetail")
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
}