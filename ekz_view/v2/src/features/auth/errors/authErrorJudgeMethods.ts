import { GraphQLError } from 'graphql';

const UNAUTHENTICATED_ERROR_CODE = 'UNAUTHENTICATED';

export const isUnauthenticatedError = (error) => {
  const graphqlError = error as GraphQLError;
  return graphqlError?.extensions?.code === UNAUTHENTICATED_ERROR_CODE;
};

export const includeUnauthenticatedError = (errors) => {
  return errors.some((error) => {
    return isUnauthenticatedError(error);
  });
};
