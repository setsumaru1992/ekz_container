import {combineReducers} from "redux"
import {reducer as reduxFormReducer} from 'redux-form';
import choicesReducer from "~/reducers/choicesReducer"
import themesReducer from "~/reducers/themesReducer"
/*
conbineReducerを使った場合はstate取得時にネストを考慮。mapStateToPropsにrootでネストしたreducerからstateの値を取得
https://qiita.com/usagi-f/items/ae568fb64c2eac882d05
 */
const rootReducer = combineReducers({
  choicesReducer,
  themesReducer,
  form: reduxFormReducer
})

export default rootReducer