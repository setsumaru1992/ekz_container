import nookies from 'nookies';
import cookieManager from '../cookie/cookieManager';

const COOKIE_ACCESS_KEY_NAME = 'ak';
const COOKIE_REMIND_TOKEN_NAME = 'rt';
const minute = 60;
const hour = 60 * minute;
const day = 24 * hour;
// const month = 31 * day
const year = 365 * day;
const COOKIE_ACCESS_KEY_ATTR = {
  maxAge: 1 * hour,
};
const COOKIE_REMIND_TOKEN_ATTR = {
  maxAge: 20 * year,
};

class AuthCookieManager {
  getAccessKey(nextJsContext = null) {
    const cookies = nookies.get(nextJsContext);
    // TODO: ログインページを作っていないためアクセスキーは非Docker起動アプリからCookieの値をコピーし、開発者ツールで直書き
    return cookies[COOKIE_ACCESS_KEY_NAME];
  }

  setAccessKey(accessKey, nextJsContext = null) {
    if (accessKey === null || accessKey === undefined) return;
    nookies.set(
      nextJsContext,
      COOKIE_ACCESS_KEY_NAME,
      accessKey,
      COOKIE_ACCESS_KEY_ATTR,
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
    cookieManager.set(
      COOKIE_REMIND_TOKEN_NAME,
      remindToken,
      COOKIE_REMIND_TOKEN_ATTR,
    );
  }

  deleteRemindToken() {
    cookieManager.delete(COOKIE_REMIND_TOKEN_NAME);
  }
}
const authCookieManager = new AuthCookieManager(); // シングルトン化
export default authCookieManager;
