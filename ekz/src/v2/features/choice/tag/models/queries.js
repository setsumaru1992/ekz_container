import {gql} from 'apollo-boost';

export const TAG_QUERY = gql`
  query ($choiceId: Int!) {
    tags(choiceId: $choiceId) {
      id
      name
      choiceId
    }
  }
`