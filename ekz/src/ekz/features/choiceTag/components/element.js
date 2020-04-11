import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"

import {removeTag} from "~/features/choiceTag/models/appModels/choiceTagAppReducer"

class ChoiceTagElement extends Component {
  render() {
    const {
      tag,
      removeTag
    } = this.props
    return (<Fragment>
      {tag.name} <span onClick={() => {removeTag(tag.choice_id, tag.id)}}>×</span>&nbsp;
    </Fragment>)
  }
}

ChoiceTagElement.propTypes = {
  tag: PropTypes.object,
}

export default connectViewToStateAndActionCreaters(ChoiceTagElement,
  (state) => {return {}}, {removeTag}
)