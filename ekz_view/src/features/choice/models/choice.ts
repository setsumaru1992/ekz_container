import { gql } from '@apollo/client';
import { Choice } from '../../../graphql/generated/graphql';

// TODO: choice一覧のところで定義
export const CHOICE_FRAGMENT = gql`
  fragment Choice on Choice {
    id
    name
    url
    description
    evaluation
    themeId
    imageFilename
    webpageCaptureUrl
  }
`;

export type { Choice };
