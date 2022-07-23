import { gql } from '@apollo/client';
import { useAddThemeMutation } from '../../../../graphql/generated/graphql';

export const ADD_THEME = gql`
  mutation addTheme($accessKey: String!, $name: String!) {
    addTheme(input: { accessKey: $accessKey, name: $name }) {
      id
    }
  }
`;

export { useAddThemeMutation };
