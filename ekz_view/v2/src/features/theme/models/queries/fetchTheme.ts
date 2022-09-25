import { gql } from '@apollo/client';
import { useThemeQuery, Theme } from '../../../../graphql/generated/graphql';

export const THEME_QUERY = gql`
  query theme($themeId: Int!) {
    theme(themeId: $themeId) {
      id
      name
      description
    }
  }
`;

export { useThemeQuery };
export type { Theme };
