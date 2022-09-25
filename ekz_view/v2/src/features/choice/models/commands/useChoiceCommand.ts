import { useAddChoiceMutation, Choice } from './addChoice';
import { useUpdateChoiceMutation } from './updateChoice';
import { useRemoveChoiceMutation } from './removeChoice';

export type AddChoice = {
  name: string;
  url: string;
  description: string;
  evaluation: number;
  themeId: number;
};

export type UpdateChoice = {
  id: number;
  name: string;
  url: string;
  description: string;
  evaluation: number;
};

const useAddChoice = () => {
  const [addChoiceMutation, { loading: addLoading, error: addError }] =
    useAddChoiceMutation();
  const addChoice = async (input: AddChoice, { onCompleted }) => {
    return addChoiceMutation({
      variables: input,
      onCompleted: async (data) => {
        const createdChoice = data.addChoice.choice;
        await onCompleted(createdChoice);
      },
    });
  };
  return { addChoice, addLoading, addError };
};

const useUpdateChoice = () => {
  const [updateChoiceMutation, { loading: updateLoading, error: updateError }] =
    useUpdateChoiceMutation();

  const updateChoice = async (
    updateInput: Partial<UpdateChoice>,
    originalChoice: Choice,
    { onCompleted },
  ) => {
    const updateChoiceInput = { ...originalChoice, ...updateInput };
    return updateChoiceMutation({
      variables: updateChoiceInput,
      onCompleted: async (data) => {
        const updatedChoice = data.updateChoice.choice;
        await onCompleted(updatedChoice);
      },
    });
  };

  return { updateChoice, updateLoading, updateError };
};

const useRemoveChoice = () => {
  const [removeChoiceMutation, { loading: removeLoading, error: removeError }] =
    useRemoveChoiceMutation();
  const removeChoice = async (id, { onCompleted }) => {
    return removeChoiceMutation({
      variables: { id },
      onCompleted,
    });
  };
  return { removeChoice, removeLoading, removeError };
};

export default () => {
  const { addChoice, addLoading, addError } = useAddChoice();
  const { updateChoice, updateLoading, updateError } = useUpdateChoice();
  const { removeChoice, removeLoading, removeError } = useRemoveChoice();

  return {
    addChoice,
    updateChoice,
    removeChoice,
    commandLoading: addLoading || updateLoading || removeLoading,
    commandError: addError || updateError || removeError,
  };
};
