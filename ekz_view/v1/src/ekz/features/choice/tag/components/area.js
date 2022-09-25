import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"

import {refleshChoiceTags} from "~/features/choice/tag/models/appModels/choiceTagAppReducer"
import NewTag from "~/features/choice/tag/components/newTag"
import TagElement from "~/features/choice/tag/components/element"
import TagWrapper from "~/features/choice/tag/components/tagWrapper"

class ChoiceTagArea extends Component {
  componentWillMount() {
    const {
      refleshChoiceTags,
      choiceId
    } = this.props
    refleshChoiceTags(choiceId)
  }

  render() {
    const {
      choiceTags,
      choiceId
    } = this.props
    const tags = choiceTags[choiceId]
    return (<div>
      {tags ? tags.map(tag => <TagWrapper key={tag.id}><TagElement tag={tag}/></TagWrapper>): null}
      <TagWrapper><NewTag choiceId={choiceId} /></TagWrapper>
    </div>)
  }
}

ChoiceTagArea.propTypes = {
  choiceId: PropTypes.number,
}

export default connectViewToStateAndActionCreaters(ChoiceTagArea,
  (state) => {
  return {
    choiceTags: state.choiceTagAppReducer.choiceTags
  }}, {refleshChoiceTags}
)