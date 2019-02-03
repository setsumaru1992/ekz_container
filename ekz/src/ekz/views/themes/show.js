import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ChoiceShow from '~/views/choices/show'
import ChoiceNew from '~/views/choices/new'

class ThemeShow extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const idParam = this.props.idParam
    return (
      <div className="container">
        <table className="table">
          <tbody>
          <tr>
            <td>
              今日食べたいもの
              <button>開く</button>
              {/*<ChoiceEkz />*/}
              <ChoiceShow />
              <ChoiceNew />
            </td>
          </tr>
          <tr>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default ThemeShow

ThemeShow.propTypes = {
  idParam: PropTypes.string
}