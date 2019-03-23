import React, { Component } from 'react';
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import DevModel from "~/views/pages/develop/devModel"

class Dev extends Component {
  componentWillMount() {
  }

  render(){
    const {
      devValue
    } = this.props
    //new DevModel()
    return (
      <div>
        development <br/>
        {devValue !== null
          ? devValue
          : ""}
      </div>
    )
  }
}

export default connectViewToStateAndActionCreaters(Dev,
  (state) => {
    return {
      devValue: state.devReducer.devValue
    }
  }, {}
)