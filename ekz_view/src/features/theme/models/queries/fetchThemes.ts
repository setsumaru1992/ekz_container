import { gql } from '@apollo/client';
import {
  useThemesQuery,
  ThemesDocument,
  Theme,
} from '../../../../graphql/generated/graphql';

// profileは複数のクエリをさばく練習として使用
export const THEMES_QUERY = gql`
  query themes($accessKey: String!) {
    themes(accessKey: $accessKey) {
      id
      name
      description
    }

    profile(accessKey: $accessKey) {
      dispName
      email
    }
  }
`;

export { useThemesQuery, ThemesDocument };
export type { Theme };
