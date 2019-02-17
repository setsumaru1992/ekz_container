import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Navbar, Nav, } from "react-bootstrap"
import {NavLink} from "react-router-dom"
import {LinkContainer}  from "react-router-bootstrap"
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'


class Layout extends Component {
  render() {
    return (
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">ekz</Navbar.Brand>
            <Nav className="mr-auto">
              <LinkContainer to={"/mypage/theme"}>
                <NavLink href=>テーマ</NavLink>
              </LinkContainer>
              <LinkContainer to={"/mypage/profile"}>
                <NavLink href=>プロフィール</NavLink>
              </LinkContainer>
              <LinkContainer to={"/signup"}>
                <NavLink href=>新規登録</NavLink>
              </LinkContainer>
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