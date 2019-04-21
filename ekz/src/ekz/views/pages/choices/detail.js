import React, { Component } from "react";
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"

class ChoiceDetail extends Component {
  componentWillMount() {

  }

  render(){
    return (
      <div>
        <h1>チョイス名</h1>
        説明<br/>
        評価<br/>
        コメント<br/>
      </div>
    )
  }
}

export default connectViewToStateAndActionCreaters(ChoiceDetail,
  (state) => {
    return {
    }
  }, {}
)