import { gql } from '@apollo/client';
import {
  usePickEkzQuery,
  usePickEkzLazyQuery,
  PickEkzDocument,
  Choice,
} from '../../../../graphql/generated/graphql';

export const PICK_EKZ = gql`
  query pickEkz($themeId: Int!, $prePickedChoiceId: Int) {
    ekz(themeId: $themeId, prePickedChoiceId: $prePickedChoiceId) {
      id
      name
      url
      description
    }
  }
`;

export { usePickEkzQuery, usePickEkzLazyQuery, PickEkzDocument };
export type { Choice };
