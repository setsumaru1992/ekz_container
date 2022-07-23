import { gql } from '@apollo/client';
import { useAddThemeMutation } from '../../../../graphql/generated/graphql';

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
