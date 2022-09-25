import { gql } from '@apollo/client';
import {
  useFetchChoicesQuery,
  useFetchChoicesLazyQuery,
} from '../../../../graphql/generated/graphql';

// TODO: ページング用意
export const FETCH_CHOICES = gql`
  query fetchChoices($themeId: Int!) {
    choices(themeId: $themeId) {
      ...Choice
    }
  }
`;

export { useFetchChoicesQuery, useFetchChoicesLazyQuery };
