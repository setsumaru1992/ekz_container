import { gql } from '@apollo/client';
// import { useRemoveThemeMutation } from '../../../../graphql/generated/graphql';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!, $autoLogin: Boolean!) {
    login(
      input: { email: $email, password: $password, autoLogin: $autoLogin }
    ) {
      accessKey
      remindToken
    }
  }
`;
