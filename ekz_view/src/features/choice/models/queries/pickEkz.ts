import { gql } from '@apollo/client';
import {
  usePickEkzQuery,
  usePickEkzLazyQuery,
  PickEkzDocument,
} from '../../../../graphql/generated/graphql';
import { Choice } from '../choice';

export const PICK_EKZ = gql`
  query pickEkz($themeId: Int!, $prePickedChoiceId: Int) {
    ekz(themeId: $themeId, prePickedChoiceId: $prePickedChoiceId) {
      ...Choice
    }
  }
`;

export { usePickEkzQuery, usePickEkzLazyQuery, PickEkzDocument };
// TODO: ここじゃない定義元からimportさせる
export type { Choice };
