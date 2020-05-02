import React from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import Element from './Element';
import New from './New';
import { TAG_QUERY } from '../models/queries';

class Area extends React.Component {
  static propTypes = {
    choiceId: PropTypes.number,
  }

  render() {
    const {choiceId} = this.props
    let raisedError = null
    return (<React.Fragment>
      <Query
        query={TAG_QUERY}
        variables={{choiceId: choiceId}}
      >
        {({data, loading, error}) => {
          // TODO こんな面倒な処理を毎回書いてられないからQueryタグの引数を全て持ったラッパーを定義。dataオブジェクトを引数とした関数をchildrenでかけるようにする
          if(error){
            console.error(error)
            return null
          }
          if(loading){
            return null
          }

          const { tags } = data
          return (
            <React.Fragment>
              {tags.map(
                (tag) => <Element key={tag.id} tag={tag} />
              )}
            </React.Fragment>
          )
        }}
      </Query>
      <New choiceId={choiceId}/>
    </React.Fragment>)
  }
}

export default Area