import { gql } from '@apollo/client';
import { useRemoveThemeMutation } from '../../../../graphql/generated/graphql';

export const REMOVE_THEME = gql`
  mutation removeTheme($id: Int!) {
    removeTheme(input: { id: $id }) {
      id
    }
  }
`;

export { useRemoveThemeMutation };
