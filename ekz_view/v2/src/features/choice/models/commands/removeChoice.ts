import { gql } from '@apollo/client';
import { useRemoveChoiceMutation } from '../../../../graphql/generated/graphql';

export const REMOVE_CHOICE = gql`
  mutation removeChoice($id: Int!) {
    removeChoice(input: { id: $id }) {
      id
    }
  }
`;

export { useRemoveChoiceMutation };
