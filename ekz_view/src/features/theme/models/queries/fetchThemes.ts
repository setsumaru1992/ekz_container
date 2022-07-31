import { gql } from '@apollo/client';
import {
  useThemesQuery,
  useThemesLazyQuery,
  ThemesDocument,
  Theme,
} from '../../../../graphql/generated/graphql';

// profileは複数のクエリをさばく練習として使用
export const THEMES_QUERY = gql`
  query themes {
    themes {
      id
      name
      description
    }

    profile {
      dispName
      email
    }
  }
`;

export { useThemesQuery, useThemesLazyQuery, ThemesDocument };
export type { Theme };
