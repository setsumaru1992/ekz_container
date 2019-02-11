import React, {Component} from 'react';
import PropTypes from 'prop-types'
import ChoiceShow from '~/views/components/choices/show/show'

class ThemeShowElem extends Component {
  render() {
    const theme = this.props.theme
    return (
      <tr>
        <td>
          {theme.name}
          <button>開く</button>
          {/*<ChoiceEkz />*/}
          <ChoiceShow themeId={theme.id}/>
        </td>
      </tr>
    )
  }
}

ThemeShowElem.propTypes = {
  theme: PropTypes.object
}

export default ThemeShowElem