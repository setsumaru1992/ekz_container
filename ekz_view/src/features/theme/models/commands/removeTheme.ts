import { gql } from '@apollo/client';
import { useRemoveThemeMutation } from '../../../../graphql/generated/graphql';

export const REMOVE_THEME = gql`
  mutation removeTheme($accessKey: String!, $id: Int!) {
    removeTheme(input: { accessKey: $accessKey, id: $id }) {
      id
    }
  }
`;

export { useRemoveThemeMutation };
