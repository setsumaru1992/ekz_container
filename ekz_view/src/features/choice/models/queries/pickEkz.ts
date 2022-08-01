import { gql } from '@apollo/client';
import {
  usePickEkzQuery,
  usePickEkzLazyQuery,
  PickEkzDocument,
  Choice,
} from '../../../../graphql/generated/graphql';

export const PICK_EKZ = gql`
  query pickEkz($themeId: Int!) {
    ekz(themeId: $themeId) {
      id
      name
      url
      description
    }
  }
`;

export { usePickEkzQuery, usePickEkzLazyQuery, PickEkzDocument };
export type { Choice };
