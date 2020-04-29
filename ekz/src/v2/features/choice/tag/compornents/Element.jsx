import React from "react"
import PropTypes from "prop-types"
import {gql} from 'apollo-boost';
import {Mutation} from 'react-apollo';
import tagQuery from '../models/appModels/tagQuery';

const newTagMutation = gql`
mutation ($id: Int!){
  deleteTag(input:{id: $id}) {
    id
  }
}
`

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
          mutation={newTagMutation}
          variables={{id: id}}
          refetchQueries={[{query: tagQuery, variables: {choiceId: choiceId}}]}
        >
        {(hogehogeFunction) =>
          (<React.Fragment>
            <span onClick={hogehogeFunction}>×(GraphQL化中)</span>&nbsp;
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
        {tag.name} <DeleteIcon id={tag.id} choiceId={tag.choiceId}/>
      </React.Fragment>
    )
  }
}