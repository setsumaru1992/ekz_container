import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncChoiceDestroy} from '~/reducers/choicesAppReducer';

class ChoiceShowElem extends Component {
  render() {
    const {choice, actionAsyncChoiceDestroy, themeId} = this.props
    let nameTag = null
    if(choice.url){
      nameTag = (<a href={choice.url}>{choice.name}</a>)
    } else {
      nameTag = (<span>{choice.name}</span>)
    }
    return (
      <tr>
        <td style={{
          display: "flex",
        }}>
          <div style={{
            marginRight: "auto"
          }}>
            {nameTag}
          </div>
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
          }}>
            <span>Good</span>&emsp;
            <span>Bad</span>&emsp;
            <button>編集</button>&emsp;
            <button onClick={() => {
              const deleteOk = window.confirm("本当に削除してもよろしいですか？")
              if (!deleteOk) return
              actionAsyncChoiceDestroy(choice.id, themeId)
            }}
            >削除</button>
          </div>
        </td>
      </tr>
    )
  }
}

ChoiceShowElem.propTypes = {
  choice: PropTypes.object,
  themeId: PropTypes.number
}

export default connectViewToStateAndActionCreaters(ChoiceShowElem,
  (state) => {
    return {}
  }, {actionAsyncChoiceDestroy}
)