import { gql } from '@apollo/client';
import { useUpdateThemeMutation } from '../../../../graphql/generated/graphql';

export const UPDATE_THEME = gql`
  mutation updateTheme(
    $accessKey: String!
    $id: Int!
    $name: String!
    $description: String
  ) {
    updateTheme(
      input: {
        accessKey: $accessKey
        id: $id
        name: $name
        description: $description
      }
    ) {
      id
    }
  }
`;

export { useUpdateThemeMutation };
