import React, {Component} from "react"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {MESSAGE_TYPE_NORMAL, MESSAGE_TYPE_ERROR} from "~/reducers/messageViewReducer"

class MessageField extends Component{
  render() {
    const {
      visible,
      message,
      messageType,
    } = this.props
    return (
      <div
        style={messageWrapperStyle(messageType, visible)}
      >
        <div
          style={{
            lineHeight: "60px",
            padding: "0px 20px",
            fontSize: "30px",
            boxShadow: "0 2px 10px 0 #9E9E9E",
          }}
        >
          {message}
        </div>
      </div>
    )
  }
}

function messageWrapperStyle(messageType, visible){
  let style = {
    width: "100%",
    position: "fixed",
    zIndex: 100,
  }
  switch (messageType) {
    case MESSAGE_TYPE_NORMAL:
      style.backgroundColor = "#2C7CFF"
      style.color = "white"
      break;
    case MESSAGE_TYPE_ERROR:
      style.backgroundColor = "red"
      break;
  }
  if(visible) {
    style.display = "block"
  } else{
    style.display = "none"
  }
  return style
}

export default connectViewToStateAndActionCreaters(MessageField,
  (state) => {
    return {
      visible: state.messageViewReducer.visible,
      message: state.messageViewReducer.message,
      messageType: state.messageViewReducer.messageType
    }
  }, {}
)