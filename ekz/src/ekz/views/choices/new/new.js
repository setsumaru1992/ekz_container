import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ChoiceNew extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <form action="">
          名前&emsp;<input type="text" name="" id=""/><br/>
          リンク<input type="text" name="" id=""/><br/>
          <button>追加</button>
        </form>
      </div>
    )
  }
}

export default ChoiceNew