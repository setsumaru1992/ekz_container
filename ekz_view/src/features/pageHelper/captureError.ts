import { includeUnauthenticatedError } from '../auth/errors/authErrorJudgeMethods';
import { LOGIN_PAGE_URL } from './consts';

export default async (execFunc: () => any) => {
  return await execFunc().catch((e) => {
    if (includeUnauthenticatedError(e?.graphQLErrors)) {
      console.log('認証エラー');
      return {
        redirect: {
          destination: LOGIN_PAGE_URL,
          permanent: false,
          // statusCode: 401, # 型定義で許されていないので302で妥協
        },
      };
    }
    return { props: {} };
  });
};
