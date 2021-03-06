import React, { Component } from "react";
import PropTypes from "prop-types"
import {Navbar, Nav, } from "react-bootstrap"
import {LinkContainer}  from "react-router-bootstrap"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import MessageField from "~/views/components/common/messageField"
import {isSmartPhone} from "~/common/userAgentChecker"

class Layout extends Component {
  render() {
    const {
      needLogin,
    } = this.props
    const LoginedNavi = () => (
      <Nav className="mr-auto">
        <LinkContainer to={"/mypage/theme"}>
          <Nav.Link>テーマ</Nav.Link>
        </LinkContainer>
        <LinkContainer to={"/mypage/profile"}>
          <Nav.Link>プロフィール</Nav.Link>
        </LinkContainer>
        <LinkContainer to={"/logout"}>
          <Nav.Link>ログアウト</Nav.Link>
        </LinkContainer>
      </Nav>
    )
    const NotLoginNavi = () => (
      <Nav className="mr-auto">
        {/* <LinkContainer to={"/signup"}>
          <Nav.Link>新規登録</Nav.Link>
        </LinkContainer> */}
        <LinkContainer to={"#"}>
          <Nav.Link>新規登録(準備中)</Nav.Link>
        </LinkContainer>
        <LinkContainer to={"/login"}>
          <Nav.Link>ログイン</Nav.Link>
        </LinkContainer>
      </Nav>
    )

    let containerStyle = {
      backgroundColor: "rgba(255,255,255,0.9)",
      borderRadius: "20px",
    }
    if(isSmartPhone()){
      containerStyle["padding"] = "20px 5px"
      containerStyle["margin"] = "10px -10px"
    } else {
      containerStyle["padding"] = "20px 20px"
      containerStyle["margin"] = "10px 0px"
    }

    return (
        <div>
          <MessageField />
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">ekz</Navbar.Brand>
            {needLogin
              ? <NotLoginNavi/>
              : <LoginedNavi/>}
          </Navbar>
          <div className="container-fluid">
            <div style={containerStyle}>
            {this.props.children}
            </div>
          </div>
        </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any
}

export default connectViewToStateAndActionCreaters(Layout,
  (state) => {
    return {
      needLogin: state.authManager.get("needLogin")
    }
  }, {}
)

