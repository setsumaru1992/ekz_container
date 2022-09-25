import React from 'react';
import PropTypes from 'prop-types';
import {gql} from 'apollo-boost';
import {Mutation} from 'react-apollo';
import Wrapper from './Wrapper';
import { TAG_QUERY } from '../models/queries';
import { DELETE_TAG_MUTAION } from '../models/mutations';

class DeleteIcon extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    choiceId: PropTypes.number,
  }

  render(){
    const {id, choiceId} = this.props
    return (
      <React.Fragment>
        <Mutation
          mutation={DELETE_TAG_MUTAION}
          variables={{id: id}}
          refetchQueries={[{query: TAG_QUERY, variables: {choiceId: choiceId}}]}
        >
        {(execDelete) =>
          (<React.Fragment>
            <span onClick={execDelete}>×</span>&nbsp;
          </React.Fragment>)
        }
        </Mutation>
      </React.Fragment>
    )
  }
}

export default class Element extends React.Component {
  static propTypes = {
    tag: PropTypes.object,
  }

  render() {
    const {tag} = this.props
    return (
      <React.Fragment>
        <Wrapper>
          {tag.name} <DeleteIcon id={tag.id} choiceId={tag.choiceId}/>
        </Wrapper>
      </React.Fragment>
    )
  }
}