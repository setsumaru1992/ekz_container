import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"

class HogeHogeElement extends Component {
  render() {
    return (<Fragment>
      hoge
    </Fragment>)
  }
}

HogeHogeElement.propTypes = {
  hogeId: PropTypes.number,
  hoge: PropTypes.object,
}

export default connectViewToStateAndActionCreaters(HogeHogeElement,
  (state) => {return {}}, {}
)
