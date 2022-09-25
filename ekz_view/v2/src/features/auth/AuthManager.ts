import authCookieManager from './authCookieManager';

export default class AuthManager {
  getAccessKey() {
    return authCookieManager.getAccessKey();
  }
}
