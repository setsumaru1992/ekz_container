import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"

import {createTag} from "~/features/choice/tag/models/appModels/choiceTagAppReducer"
import {toggleFormVisible} from "~/features/choice/tag/models/viewModels/choiceTagViewReducer"
import formCreator from "~/features/choice/tag/components/form"

class NewTag extends Component {
  render() {
    const {
      createTag,
      choiceId,
      toggleFormVisible,
      visibleFormMap,
    } = this.props
    const visibleMapkey = `${choiceId}_`
    if(visibleFormMap[visibleMapkey]){
      const Form = formCreator(choiceId)
      return (<Fragment>
        <Form
          onSubmit={createTag}
          initialValues={{
            name: "",
            choice_id: choiceId
          }}
        />
        <span onClick={()=>toggleFormVisible(choiceId)}>×</span>
      </Fragment>)
    } else {
      return (<Fragment>
        <span onClick={()=>toggleFormVisible(choiceId)}>+</span>
      </Fragment>)
    }


  }
}

NewTag.propTypes = {
  choiceId: PropTypes.number,
}

export default connectViewToStateAndActionCreaters(NewTag,
  (state) => {return {
    visibleFormMap: state.choiceTagViewReducer.visibleFormMap,
  }}, {createTag, toggleFormVisible}
)
