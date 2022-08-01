import { useEffect, useState } from 'react';

export enum ChangeType {
  Prev,
  Next,
}

export default (pickedChoice, repick) => {
  const [fetchedChoices, setFetchedChoices] = useState([]);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState(0);

  const addEkz = async (choice) => {
    if (!choice) return;

    await setFetchedChoices((currentChoices) => [...currentChoices, choice]);
  };

  useEffect(() => {
    addEkz(pickedChoice);
  }, [pickedChoice]);

  const idxExceedsArrayLength = (arr, idx) => {
    return arr.length - 1 < idx;
  };

  let selectedChoice;
  if (!idxExceedsArrayLength(fetchedChoices, selectedChoiceIdx)) {
    selectedChoice = fetchedChoices[selectedChoiceIdx];
  } else if (fetchedChoices.length > 0) {
    selectedChoice = fetchedChoices[fetchedChoices.length - 1];
  }

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

  const addNewChoiceAndTransitionToNewChoice = async (choice) => {
    await addEkz(choice);
    const expectedLastIndexOfChoices = fetchedChoices.length - 1 + 1; // 本来上述処理で更新されたstateのリストの長さを取得したいが、それができないため、計算上の値を使用
    setSelectedChoiceIdx(expectedLastIndexOfChoices);
  };

  return {
    selectedChoice,
    changePage,
    addNewChoiceAndTransitionToNewChoice,
  };
};
