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
      ...Choice
    }
  }
`;

// TODO: choice一覧のところで定義
export const CHOICE_FRAGMENT = gql`
  fragment Choice on Choice {
    id
    name
    url
    description
  }
`;

export { usePickEkzQuery, usePickEkzLazyQuery, PickEkzDocument };
export type { Choice };
