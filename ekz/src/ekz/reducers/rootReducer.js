import {combineReducers} from "redux"
import {reducer as reduxFormReducer} from 'redux-form';
import choicesAppReducer from "~/reducers/choicesAppReducer"
import choicesViewReducer from "~/reducers/choicesViewReducer"
import themesAppReducer from "~/reducers/themesAppReducer"
import themesViewReducer from "~/reducers/themesViewReducer"
import sessionsAppReducer from "~/reducers/sessionsAppReducer"
/*
conbineReducerを使った場合はstate取得時にネストを考慮。mapStateToPropsにrootでネストしたreducerからstateの値を取得
https://qiita.com/usagi-f/items/ae568fb64c2eac882d05
 */
const rootReducer = combineReducers({
  choicesAppReducer,
  choicesViewReducer,
  themesAppReducer,
  themesViewReducer,
  sessionsAppReducer,
  form: reduxFormReducer
})

export default rootReducer