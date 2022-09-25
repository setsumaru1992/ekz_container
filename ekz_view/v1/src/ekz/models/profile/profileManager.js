import {Record} from "immutable"
import {updateStateField} from "~/reducers/utils/stateUtils"

const ProfileManagerRecord = Record({
  dispName: null,
  email: null,
})

export default class ProfileManager extends ProfileManagerRecord {
  setDispNameAndEmail(dispName, email){
    return updateStateField(this, {
      dispName: dispName,
      email: email,
    })
  }
}