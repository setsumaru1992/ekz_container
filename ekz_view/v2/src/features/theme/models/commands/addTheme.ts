import { gql } from '@apollo/client';
import { useAddThemeMutation } from '../../../../graphql/generated/graphql';

export const ADD_THEME = gql`
  mutation addTheme($name: String!, $description: String) {
    addTheme(input: { name: $name, description: $description }) {
      id
    }
  }
`;

export { useAddThemeMutation };
