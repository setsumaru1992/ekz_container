import React from 'react';
import Link from 'next/link';
import { withApollo } from '../../../lib/apollo';
// import { useThemesQuery } from '../models/graphql';
import authCookieManager from '../../../features/auth/authCookieManager';

type Props = {};

const Themes : React.FC<Props> = (props: {}) => {
  // const { themes } = props;
  return <div>themes</div>
  // const { data, loading, error } = useThemesQuery({
  //     variables: {
  //       // TODO: ログインページを作っていないためアクセスキーは非Docker起動アプリからCookieの値をコピーし、開発者ツールで直書き
  //       accessKey: authCookieManager.getAccessKey(),
  //     },
  //   });
  // if (error) return <h1>Error</h1>;
  // if (loading) return <div>Loading...</div>;
  // return(
  //   <div>
  //   {/* profileは複数のクエリをさばく練習として使用 */}
  //   ユーザ名：{data.profile && data.profile.email}
  //     {data.themes && data.themes.map((theme) => {return (
  //       <div key={theme.id}>
  //         <Link
  //           href="/mypage/themes/[themeName]"
  //           as={`/mypage/themes/${theme.name}`}
  //         >
  //           <a>{theme.name}</a>
  //         </Link>
  //       </div>
  //     )})}
  //   </div>
  // )
}

export default withApollo()(Themes)
