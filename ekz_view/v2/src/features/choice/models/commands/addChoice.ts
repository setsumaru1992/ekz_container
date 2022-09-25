import { gql } from '@apollo/client';
import {
  useAddChoiceMutation,
  Choice,
} from '../../../../graphql/generated/graphql';

export const ADD_CHOICE = gql`
  mutation addChoice(
    $name: String!
    $url: String
    $description: String
    $evaluation: Int
    $themeId: Int!
  ) {
    addChoice(
      input: {
        name: $name
        url: $url
        description: $description
        evaluation: $evaluation
        themeId: $themeId
      }
    ) {
      choice {
        ...Choice
      }
    }
  }
`;

export { useAddChoiceMutation };
export type { Choice };
