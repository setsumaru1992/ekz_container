import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ChoiceShowElem from "~/views/choices/_showElem";

class ChoiceShow extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <table className="table table-hover table-striped">
          <tbody>
            {this.props.choiceList.map((choice) =>
              <ChoiceShowElem choice={choice} key={choice.id} />
            )}
            {/*<ChoiceShowElem />*/}
          <tr>
            <td>洋食&emsp;&emsp;
              <span>Good</span>&emsp;
              <span>Bad</span>&emsp;
              <button>編集</button>&emsp;
              <button>削除</button></td>
          </tr>
          <tr>
            <td>中華&emsp;&emsp;
              <span>Good</span>&emsp;
              <span>Bad</span>&emsp;
              <button>編集</button>&emsp;
              <button>削除</button></td>
          </tr>
          </tbody>
        </table>
        <button>選び直す</button>
        <button>追加</button>
        <br/>&emsp;
      </div>
    )
  }
}

export default ChoiceShow

ChoiceShow.propTypes = {
  themeId: PropTypes.number,
  choiceList: PropTypes.array
}