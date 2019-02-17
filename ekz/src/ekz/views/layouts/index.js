import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Navbar, Nav, } from "react-bootstrap"
import {LinkContainer}  from "react-router-bootstrap"
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'


class Layout extends Component {
  render() {
    return (
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">ekz</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/mypage/theme">テーマ</Nav.Link>
              <Nav.Link href="/mypage/profile">プロフィール</Nav.Link>
              <Nav.Link href="/signup">新規登録</Nav.Link>
            </Nav>
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
    return {}
  }, {}
)