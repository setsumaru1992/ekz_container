import { useEffect, useState } from 'react';

export enum ChangeType {
  Prev,
  Next,
}

const idxExceedsArrayLength = (arr, idx) => {
  return arr.length - 1 < idx;
};

const useChoiceAdding = (
  fetchedChoices,
  setFetchedChoices,
  setSelectedChoiceIdx,
) => {
  const addChoice = async (choice) => {
    if (!choice) return;

    await setFetchedChoices((currentChoices) => [...currentChoices, choice]);
  };

  const addNewChoiceAndTransitionToNewChoice = async (choice) => {
    await addChoice(choice);
    const expectedLastIndexOfChoices = fetchedChoices.length - 1 + 1; // 本来上述処理で更新されたstateのリストの長さを取得したいが、それができないため、計算上の値を使用
    setSelectedChoiceIdx(expectedLastIndexOfChoices);
  };

  return { addChoice, addNewChoiceAndTransitionToNewChoice };
};

const useChoiceRemoving = (
  fetchedChoices,
  setFetchedChoices,
  selectedChoiceIdx,
  setSelectedChoiceIdx,
  repick,
) => {
  const removeSelectedChoice = () => {
    fetchedChoices.splice(selectedChoiceIdx, 1);
    setFetchedChoices(fetchedChoices);
  };

  const removeSelectedChoiceAndTransition = () => {
    removeSelectedChoice();

    if (selectedChoiceIdx !== 0) {
      setSelectedChoiceIdx(selectedChoiceIdx - 1);
    } else if (fetchedChoices.length !== 0) {
      setSelectedChoiceIdx(selectedChoiceIdx + 1);
    } else {
      repick(null);
    }
  };

  return { removeSelectedChoiceAndTransition };
};

const useChoiceChoosing = (
  fetchedChoices,
  selectedChoiceIdx,
  setSelectedChoiceIdx,
  repick,
) => {
  const selectedChoice = (() => {
    if (!idxExceedsArrayLength(fetchedChoices, selectedChoiceIdx)) {
      return fetchedChoices[selectedChoiceIdx];
    }
    if (fetchedChoices.length > 0) {
      return fetchedChoices[fetchedChoices.length - 1];
    }
    return null;
  })();

  const changePage = async (changeType: ChangeType) => {
    if (changeType === ChangeType.Prev) {
      if (selectedChoiceIdx === 0) {
        return;
      }
      setSelectedChoiceIdx(selectedChoiceIdx - 1);
    }

    if (changeType === ChangeType.Next) {
      if (idxExceedsArrayLength(fetchedChoices, selectedChoiceIdx + 1)) {
        await repick(selectedChoice.id);
      }
      setSelectedChoiceIdx(selectedChoiceIdx + 1);
    }
  };

  return { selectedChoice, changePage };
};

export default (pickedChoice, repick) => {
  const [fetchedChoices, setFetchedChoices] = useState([]);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState(0);

  const { addChoice, addNewChoiceAndTransitionToNewChoice } = useChoiceAdding(
    fetchedChoices,
    setFetchedChoices,
    setSelectedChoiceIdx,
  );

  useEffect(() => {
    addChoice(pickedChoice);
  }, [pickedChoice]);

  const { removeSelectedChoiceAndTransition } = useChoiceRemoving(
    fetchedChoices,
    setFetchedChoices,
    selectedChoiceIdx,
    setSelectedChoiceIdx,
    repick,
  );

  const { selectedChoice, changePage } = useChoiceChoosing(
    fetchedChoices,
    selectedChoiceIdx,
    setSelectedChoiceIdx,
    repick,
  );

  return {
    selectedChoice,
    changePage,
    addNewChoiceAndTransitionToNewChoice,
    removeSelectedChoiceAndTransition,
  };
};
