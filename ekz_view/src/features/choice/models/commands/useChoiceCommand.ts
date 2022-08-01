import { useAddChoiceMutation } from './addChoice';

export type AddChoice = {
  name: string;
  url: string;
  description: string;
  evaluation: number;
  themeId: number;
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

export default () => {
  const { addChoice, addLoading, addError } = useAddChoice();

  return {
    addChoice,
    commandLoading: addLoading,
    commandError: addError,
  };
};
