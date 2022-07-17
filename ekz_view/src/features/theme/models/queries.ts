import { gql } from "@apollo/client";

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
