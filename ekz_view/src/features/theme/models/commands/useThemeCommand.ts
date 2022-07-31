import { useAddThemeMutation } from './addTheme';
import { useUpdateThemeMutation } from './updateTheme';
import { useRemoveThemeMutation } from './removeTheme';
import authCookieManager from '../../../auth/authCookieManager';

export type AddTheme = {
  name: string;
  description: string;
};
const useAddTheme = () => {
  const [addThemeMutation, { loading: addLoading, error: addError }] =
    useAddThemeMutation();
  const addTheme = ({ name, description }, { onCompleted }) => {
    return addThemeMutation({
      variables: {
        name,
        description,
      },
      onCompleted,
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
        id,
        name,
        description,
      },
      onCompleted,
    });
  };

  return { updateTheme, updateLoading, updateError };
};

const useRemoveTheme = () => {
  const [removeThemeMutation, { loading: removeLoading, error: removeError }] =
    useRemoveThemeMutation();
  const removeTheme = ({ id }, { onCompleted }) => {
    return removeThemeMutation({
      variables: {
        id,
      },
      onCompleted,
    });
  };
  return { removeTheme, removeLoading, removeError };
};

export default () => {
  const { addTheme, addLoading, addError } = useAddTheme();
  const { updateTheme, updateLoading, updateError } = useUpdateTheme();
  const { removeTheme, removeLoading, removeError } = useRemoveTheme();

  return {
    addTheme,
    updateTheme,
    removeTheme,
    commandLoading: addLoading || updateLoading || removeLoading,
    commandError: addError || updateError || removeError,
  };
};
