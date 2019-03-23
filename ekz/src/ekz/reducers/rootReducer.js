import {combineReducers} from "redux"
import {reducer as reduxFormReducer} from 'redux-form';
import choicesAppReducer from "~/reducers/choicesAppReducer"
import choicesViewReducer from "~/reducers/choicesViewReducer"
import themesAppReducer from "~/reducers/themesAppReducer"
import themesViewReducer from "~/reducers/themesViewReducer"
import authAppReducer from "~/reducers/authAppReducer"
import devReducer from "~/reducers/devReducer"
/*
conbineReducerを使った場合はstate取得時にネストを考慮。mapStateToPropsにrootでネストしたreducerからstateの値を取得
https://qiita.com/usagi-f/items/ae568fb64c2eac882d05
 */
const rootReducer = combineReducers({
  choicesAppReducer,
  choicesViewReducer,
  themesAppReducer,
  themesViewReducer,
  authManager: authAppReducer,
  devReducer,
  form: reduxFormReducer
})

export default rootReducer