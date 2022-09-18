import { gql } from '@apollo/client';
import { useAddChoiceMutation } from '../../../../graphql/generated/graphql';

export const UPDATE_CHOICE = gql`
  mutation updateChoice(
    $id: Int!
    $name: String!
    $url: String
    $description: String
    $evaluation: Int
  ) {
    updateChoice(
      input: {
        id: $id
        name: $name
        url: $url
        description: $description
        evaluation: $evaluation
      }
    ) {
      choice {
        ...Choice
      }
    }
  }
`;

export { useAddChoiceMutation };
