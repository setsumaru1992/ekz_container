import { gql } from '@apollo/client';

export const ADD_THEME = gql`
  mutation addTheme($accessKey: String!, $name: String!) {
    addTheme(input: { accessKey: $accessKey, name: $name }) {
      id
    }
  }
`;
