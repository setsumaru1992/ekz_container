import React from 'react';
import PropTypes from 'prop-types';

export default class Wrapper extends React.Component {
  static propTypes = {
    choiceId: PropTypes.number,
  }

  render() {
    const {choiceId} = this.props
    return (
      <React.Fragment>
        新規タグフォーム。GraphQL化中

      </React.Fragment>
    )
  }
}