import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"

import {choiceTags} from "~/features/choiceTag/models/appModels/choiceTagAppReducer"
import NewTag from "~/features/choiceTag/components/newTag"
import ChoiceTagElement from "~/features/choiceTag/components/element"

class ChoiceTagArea extends Component {
  componentWillMount() {
    const {
      choiceTags,
      choiceId
    } = this.props
    choiceTags(choiceId)
  }

  render() {
    const {
      tags,
      choiceId
    } = this.props
    return (<div>
      {tags ? tags.map(tag => <ChoiceTagElement tag={tag} key={tag.id}/>): null}
      <NewTag choiceId={choiceId} />
    </div>)
  }
}

ChoiceTagArea.propTypes = {
  choiceId: PropTypes.number,
}

export default connectViewToStateAndActionCreaters(ChoiceTagArea,
  (state) => {
  return {
    tags: state.choiceTagAppReducer.list
  }}, {choiceTags}
)