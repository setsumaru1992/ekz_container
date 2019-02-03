import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ChoiceShowElem extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const choice = this.props.choice
    return (
      <tr>
        <td>{choice.name}&emsp;&emsp;
          <span>Good</span>&emsp;
          <span>Bad</span>&emsp;
          <button>編集</button>&emsp;
          <button>削除</button>
        </td>
      </tr>
    )
  }
}

export default ChoiceShowElem

ChoiceShowElem.propTypes = {
  choice: PropTypes.object
}