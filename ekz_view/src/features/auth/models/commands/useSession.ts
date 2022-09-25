import { useLoginMutation } from './login';
import { useLogoutMutation } from './logout';
import buildApolloClient from '../../../../graphql/buildApolloClient';
import { LogoutDocument } from '../../../../graphql/generated/graphql';
import authCookieManager from '../../authCookieManager';

export interface LoginInput {
  email: string;
  password: string;
  autoLogin: boolean;
}

const useLogin = () => {
  const [loginMutation, { loading: loginLoading, error: loginError }] =
    useLoginMutation();
  const login = (input: LoginInput, { onCompleted }) => {
    return loginMutation({
      variables: input,
      onCompleted,
    });
  };

  return { login, loginLoading, loginError };
};

export interface LogoutInput {
  accessKey: string;
}

const useLogout = () => {
  const [logoutMutation, { loading: logoutLoading, error: logoutError }] =
    useLogoutMutation();
  const logout = (input: LogoutInput, { onCompleted }) => {
    return logoutMutation({
      variables: input,
      onCompleted,
    });
  };

  return { logout, logoutLoading, logoutError };
};

export default () => {
  const { login, loginLoading, loginError } = useLogin();
  const { logout, logoutLoading, logoutError } = useLogout();

  return {
    login,
    logout,
    commandLoading: loginLoading || logoutLoading,
    commandError: loginError || logoutError,
  };
};

export const logout = async (nextJsContext) => {
  const apolloClient = buildApolloClient(nextJsContext);
  const accessKey = authCookieManager.getAccessKey(nextJsContext);
  await apolloClient.mutate({
    mutation: LogoutDocument,
    variables: { accessKey },
  });
  authCookieManager.deleteAccessKey(nextJsContext);
};
