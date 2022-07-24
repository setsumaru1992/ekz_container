import { gql } from '@apollo/client';
import {
  useAddThemeMutation,
  useUpdateThemeMutation,
} from '../../../../graphql/generated/graphql';

export const ADD_THEME = gql`
  mutation addTheme($accessKey: String!, $name: String!, $description: String) {
    addTheme(
      input: { accessKey: $accessKey, name: $name, description: $description }
    ) {
      id
    }
  }
`;

export { useAddThemeMutation };

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
