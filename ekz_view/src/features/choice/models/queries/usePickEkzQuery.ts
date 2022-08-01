import { usePickEkzQuery } from './pickEkz';

export default (themeId: number) => {
  const { data, loading, error, refetch } = usePickEkzQuery({
    variables: { themeId },
  });
  return {
    choice: data?.ekz,
    loading,
    error,
    repick: refetch,
  };
};
