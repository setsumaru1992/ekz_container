import { gql } from '@apollo/client';
import { useLogoutMutation } from '../../../../graphql/generated/graphql';

export const LOGOUT = gql`
  mutation logout($accessKey: String!) {
    logout(input: { accessKey: $accessKey }) {
      accessKey
    }
  }
`;

export { useLogoutMutation };
