import { useAddThemeMutation, useUpdateThemeMutation } from './addTheme';
import authCookieManager from '../../../auth/authCookieManager';

export type AddTheme = {
  name: string;
  description: string;
};
const useAddTheme = () => {
  const [addThemeMutation, { loading: addLoading, error: addError }] =
    useAddThemeMutation();
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

  return { addTheme, addLoading, addError };
};

export type UpdateTheme = {
  id: number;
  name: string;
  description: string;
};
const useUpdateTheme = () => {
  const [updateThemeMutation, { loading: updateLoading, error: updateError }] =
    useUpdateThemeMutation();

  const updateTheme = ({ id, name, description }, { onCompleted }) => {
    return updateThemeMutation({
      variables: {
        accessKey: authCookieManager.getAccessKey(),
        id,
        name,
        description,
      },
      onCompleted,
    });
  };

  return { updateTheme, updateLoading, updateError };
};

export default () => {
  const { addTheme, addLoading, addError } = useAddTheme();
  const { updateTheme, updateLoading, updateError } = useUpdateTheme();

  return {
    addTheme,
    updateTheme,
    updateLoading: addLoading || updateLoading,
    updateError: addError || updateError,
  };
};
