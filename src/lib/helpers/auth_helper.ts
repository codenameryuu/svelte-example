export default class AuthHelper {
  /**
   ** Save session
   *
   * @param user
   * @param token
   * @param expiredAt
   * @return void
   */
  public static saveSession(user: any, token: string, expiredAt: string) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("expired_at", expiredAt);
  }

  /**
   ** Get session
   *
   * @return object
   */
  public static getSession() {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    let expiredAt = localStorage.getItem("expired_at");

    return {
      user: user ? JSON.parse(user) : null,
      token: token ? token : null,
      expiredAt: expiredAt ? expiredAt : null
    };
  }

  /**
   ** Clear session
   *
   * @return void
   */
  public static clearSession() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expired_at");
  }
}
