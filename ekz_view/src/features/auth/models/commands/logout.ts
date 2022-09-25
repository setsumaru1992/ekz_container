import { gql } from '@apollo/client';
import { useLoginMutation } from '../../../../graphql/generated/graphql';

export const LOGOUT = gql`
  mutation logout($accessKey: String!) {
    logout(input: { accessKey: $accessKey }) {
      accessKey
    }
  }
`;

// export { useLoginMutation };
