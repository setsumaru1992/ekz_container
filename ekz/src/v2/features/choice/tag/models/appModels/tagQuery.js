import {gql} from 'apollo-boost';

export default gql`
  query ($choiceId: Int!) {
    tags(choiceId: $choiceId) {
      id
      name
      choiceId
    }
  }
`