import nookies from 'nookies';
import cookieManager from '../cookie/cookieManager';

const COOKIE_ACCESS_KEY_NAME = 'ak';
const COOKIE_REMIND_TOKEN_NAME = 'rt';
const minute = 60;
const hour = 60 * minute;
const day = 24 * hour;
// const month = 31 * day
const year = 365 * day;

class AuthCookieManager {
  getAccessKey(nextJsContext = null) {
    const cookies = nookies.get(nextJsContext);
    // TODO: ログインページを作っていないためアクセスキーは非Docker起動アプリからCookieの値をコピーし、開発者ツールで直書き
    return cookies[COOKIE_ACCESS_KEY_NAME];
  }

  setAccessKey(accessKey, nextJsContext = null) {
    if (accessKey === null || accessKey === undefined) return;

    const secure = process.env.NODE_ENV !== 'development';
    // console.log('secure', secure);
    const cookieOption = {
      maxAge: 60 * day,
      secure: secure, // まだsecure属性付与は成功していない。自己証明書だからかもしれない。
    };
    nookies.set(
      nextJsContext,
      COOKIE_ACCESS_KEY_NAME,
      accessKey,
      cookieOption,
    );
  }

  deleteAccessKey(nextJsContext = null) {
    nookies.set(nextJsContext, COOKIE_ACCESS_KEY_NAME, '', { maxAge: 0 });
  }

  getRemindToken() {
    return cookieManager.get(COOKIE_REMIND_TOKEN_NAME);
  }

  setRemindToken(remindToken) {
    if (remindToken === null || remindToken === undefined) return;
    if (remindToken === false) {
      this.deleteRemindToken();
      return;
    }
    
    const cookieOption = {
      maxAge: 20 * year,
    };
    cookieManager.set(
      COOKIE_REMIND_TOKEN_NAME,
      remindToken,
      cookieOption,
    );
  }

  deleteRemindToken() {
    cookieManager.delete(COOKIE_REMIND_TOKEN_NAME);
  }
}
const authCookieManager = new AuthCookieManager(); // シングルトン化
export default authCookieManager;
