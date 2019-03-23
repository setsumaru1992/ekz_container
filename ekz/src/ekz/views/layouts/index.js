import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Navbar, Nav, } from "react-bootstrap"
import {LinkContainer}  from "react-router-bootstrap"
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'

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
        <LinkContainer to={"/signup"}>
          <Nav.Link>新規登録</Nav.Link>
        </LinkContainer>
        <LinkContainer to={"/login"}>
          <Nav.Link>ログイン</Nav.Link>
        </LinkContainer>
      </Nav>
    )
    return (
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">ekz</Navbar.Brand>
            {needLogin
              ? <NotLoginNavi/>
              : <LoginedNavi/>}
          </Navbar>
          <div className="container">
            {this.props.children}
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