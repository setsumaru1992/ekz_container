import { useLoginMutation } from './login';

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

export default () => {
  const { login, loginLoading, loginError } = useLogin();

  return {
    login,
    commandLoading: loginLoading,
    commandError: loginError,
  };
};
