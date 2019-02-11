import {bindActionCreators} from "redux";
import {connect} from "react-redux";

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
  return connect(mapStateToProps, mapDispatchToProps)(viewClass)
}