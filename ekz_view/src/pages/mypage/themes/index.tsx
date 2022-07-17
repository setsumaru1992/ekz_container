import React from 'react';
import { ThemeListArea } from '../../../features/theme';
import { Theme } from '../../../features/theme/models/graphql';
import { THEMES_QUERY } from '../../../features/theme/models/queries';
import { GetServerSideProps } from "next";
import { withApollo } from "../../../lib/apollo";
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../../../../apolloClient'
import authCookieManager from "../../../features/auth/authCookieManager";

type Props = {
  themes: Theme[];
}

const dummyThemes = [{
  id: "1",
  name: "ダミーテーマデータ",
  description: "descriptiondescription"
}]

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data, error } = await apolloClient.query({
    query: THEMES_QUERY,
    variables: {
      // TODO: ログインページを作っていないためアクセスキーは非Docker起動アプリからCookieの値をコピーし、開発者ツールで直書き
      accessKey: authCookieManager.getAccessKey(context),
    },
  })

  return { props: { themes: data.themes }}
}

const Themes : React.FC<Props> = (props) => {
  const { themes } = props;
  return(
    <ApolloProvider client={ apolloClient }>
      <ThemeListArea themes={themes} />
    </ApolloProvider>
  )
}

export default withApollo()(Themes)