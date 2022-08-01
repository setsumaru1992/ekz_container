import { useThemeQuery } from './fetchTheme';

export default (themeId) => {
  const { data, loading, error } = useThemeQuery({
    variables: { themeId },
  });

  return {
    theme: data?.theme,
    fetchLoading: loading,
    fetchError: error,
  };
};
