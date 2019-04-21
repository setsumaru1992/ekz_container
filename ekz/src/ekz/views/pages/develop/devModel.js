import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {actionDev} from "~/reducers/devReducer"


class DevModel {
  constructor(){
    this.props.execDev("クラスからのstore変更")
  }
}

// const mapStateToProps = (state) => {
//   return {state}
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     execDev: () => dispatch(actionDev("クラスからのstore変更"))
//   }
// }
// connect(mapStateToProps, mapDispatchToProps)(DevClass)

export default connectViewToStateAndActionCreaters(DevModel,
  (state) => {
    return {
      devValue: state.devReducer.devValue
    }
  }, {actionDev}
)