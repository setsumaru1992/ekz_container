import React from 'react';
import gql from 'graphql-tag';
import { Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../../lib/apollo';
import { 
  ThemeListArea, 
  ThemesListAreaType, 
  ThemeType,
} from '../../../features/theme';
import authCookieManager from '../../../features/auth/authCookieManager';

const GET_THEMES = gql`
query ($accessKey: String!){
  
  themes(accessKey: $accessKey){
    id
    name
    description
  }

  profile(accessKey: $accessKey){
    dispName
    email
  }
}
`;

type Props = ThemesListAreaType

const Themes : React.FC<Props> = ({themes}) => {
  // TODO: ログインページを作っていないためアクセスキーは非Docker起動アプリからCookieの値をコピーし、開発者ツールで直書き
  const accessKey = authCookieManager.getAccessKey();
  const { loading, data, error } = useQuery(GET_THEMES, {
    variables: {accessKey},
  });
  if (error) return <h1>Error</h1>;
  if (loading) return <Text>Loading...</Text>;
  const themeInformations: ThemeType[] = data.themes;
  return(
    <React.Fragment>
      {/* profileは複数のクエリをさばく練習として使用 */}
      <Text>ユーザ名：{data.profile && data.profile.email}</Text>
      <ThemeListArea themes={themeInformations} />
    </React.Fragment>
  )
}

// 20200525 最新（ローカルのままかも）の以下に思考のスナップショットが記載されている
// https://github.com/setsumaru1992/todo_list_with_modern_environment/tree/master/tasklog/next
export const getServerSideProps = async (context) => {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()

  const data: Props = {
    themes: [{
      id: 1,
      name: "ダミーテーマデータ",
      description: "descriptiondescription"
    }]
  }
  return {props: data}
}

export default withApollo()(Themes)