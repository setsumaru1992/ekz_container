import { useFetchChoicesQuery, useFetchChoicesLazyQuery } from './fetchChoices';
import buildApolloClient from '../../../../graphql/buildApolloClient';

export default (themeId, requireFetchedData = true) => {
  const choicesQuery = (() => {
    const variables = { themeId };
    if (requireFetchedData) {
      return useFetchChoicesQuery({ variables });
    }
    const choicesLazyQuery = useFetchChoicesLazyQuery({ variables });
    // eslint-disable-next-line prefer-destructuring
    return choicesLazyQuery[1];
  })();

  return {
    choices: choicesQuery.data?.choices,
    fetchLoading: choicesQuery.loading,
    fetchError: choicesQuery.error,
    refetch: choicesQuery.refetch,
  };
};

// export const prefetchChoicesByServerside = async (nextJsContext) => {
//   const apolloClient = buildApolloClient(nextJsContext);
//   return apolloClient.query({
//     query: ChoicesDocument,
//     variables: {},
//   });
// };
