import React from "react"

export default class Wrapper extends React.Component {
  render() {
    return (<div style={{
      backgroundColor: "#EEEEEE",
      padding: "1px 5px",
      display: "inline-block",
      margin: "0px 5px",
    }}>
      {this.props.children}
    </div>)
  }
}