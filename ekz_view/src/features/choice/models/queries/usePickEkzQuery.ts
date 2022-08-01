import { usePickEkzQuery } from './pickEkz';

export default (themeId: number) => {
  const { data, loading, error, refetch } = usePickEkzQuery({
    variables: { themeId, prePickedChoiceId: null },
  });

  const repick = async (prePickedChoiceId: number) => {
    await refetch({
      themeId,
      prePickedChoiceId,
    });
  };
  return {
    choice: data?.ekz,
    loading,
    error,
    repick,
  };
};
