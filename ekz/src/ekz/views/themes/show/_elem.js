import React, {Component} from 'react';
import PropTypes from 'prop-types'
import ChoiceShow from '~/views/choices/show/show'
import ChoiceNew from '~/views/choices/new/new'

class ThemeShowElem extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const theme = this.props.theme
    return (
      <tr>
        <td>
          {theme.name}
          <button>開く</button>
          {/*<ChoiceEkz />*/}
          <ChoiceShow themeId={theme.id}/>
          <ChoiceNew/>
        </td>
      </tr>
    )
  }
}

ThemeShowElem.propTypes = {
  theme: PropTypes.object
}

export default ThemeShowElem