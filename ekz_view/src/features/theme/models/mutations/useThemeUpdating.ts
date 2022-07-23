import { useAddThemeMutation } from './addTheme';
import authCookieManager from '../../../auth/authCookieManager';

export default () => {
  const [addThemeMutation, { data, loading, error }] = useAddThemeMutation();
  /* {
    variables: {
      accessKey: authCookieManager.getAccessKey(),
      name: 'hoge',
    },
  }); */
  const addTheme = (
    { name, description },
    { onCompleted, refetchQueries = null },
  ) => {
    return addThemeMutation({
      variables: {
        accessKey: authCookieManager.getAccessKey(),
        name,
        description,
      },
      onCompleted,
      refetchQueries, // 現在実験中だから書いているだけで必須とは限らない
    });
  };

  return {
    addTheme,
    updateLoading: loading,
    updateError: error,
  };
};
