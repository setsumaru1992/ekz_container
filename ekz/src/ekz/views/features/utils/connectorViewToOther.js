import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom"

export function connectViewToStateAndActionCreaters(
  viewClass, mapStateToProps = (state) => {return {}}, actionCreateModules = {}) {
  const mapDispatchToProps = (dispatch
  ) => {
    // 例 return bindActionCreators({actionAsyncChoiceList}, dispatch)
    return bindActionCreators(actionCreateModules, dispatch)
  }
  /*
  先祖階層のProviderのReduxプロパティを定義（state, propsを定義）
  this.propsの定義 stateはthis.props.stateに定義される
   */
  return withRouter(
    /*
    withRouterをかますことでpropsにmatch, location, histrory追加される
    https://reacttraining.com/react-router/web/api/withRouter
    match = {params, isExact, path, url}
      paramsでRESTパラメータを取得
    location = {pathname, search, hash}
     */
    connect(mapStateToProps, mapDispatchToProps)(viewClass)
  )
}