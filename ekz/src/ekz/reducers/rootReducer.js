import {combineReducers} from "redux"
import {reducer as reduxFormReducer} from "redux-form";
import choicesAppReducer from "~/reducers/choicesAppReducer"
import choiceCommentsAppReducer from "~/reducers/choiceCommentsAppReducer"
import ekzAppReducer from "~/reducers/ekzAppReducer"
import choicesViewReducer from "~/reducers/choicesViewReducer"
import themesAppReducer from "~/reducers/themesAppReducer"
import themesViewReducer from "~/reducers/themesViewReducer"
import authAppReducer from "~/reducers/authAppReducer"
import signupAppReducer from "~/reducers/signupAppReducer"
import profileAppReducer from "~/reducers/profileAppReducer"
import messageViewReducer from "~/reducers/messageViewReducer"
import devReducer from "~/reducers/devReducer"
import choiceTagAppReducer from "~/features/choiceTag/models/appModels/choiceTagAppReducer"
import choiceTagViewReducer from "~/features/choiceTag/models/viewModels/choiceTagViewReducer"
/*
conbineReducerを使った場合はstate取得時にネストを考慮。mapStateToPropsにrootでネストしたreducerからstateの値を取得
https://qiita.com/usagi-f/items/ae568fb64c2eac882d05
 */
const rootReducer = combineReducers({
  choicesAppReducer,
  choiceCommentsAppReducer,
  choicesViewReducer,
  ekzAppReducer,
  themesAppReducer,
  themesViewReducer,
  profileAppReducer,
  signupAppReducer,
  messageViewReducer,
  authManager: authAppReducer,
  devReducer,
  form: reduxFormReducer,
  choiceTagAppReducer,
  choiceTagViewReducer
})

export default rootReducer