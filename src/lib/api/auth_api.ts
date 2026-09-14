import axios from "axios";

import AuthHelper from "$lib/helpers/auth_helper";

let API_URL = import.meta.env.VITE_API_URL;

export default class AuthApi {
  /**
   ** Register
   *
   * @param request
   * @return object
   */
  public static async register(request: any) {
    let url = `${API_URL}/api/auth/register`;

    let formData = new FormData();

    formData.append('email', request.email);
    formData.append('password', request.password);
    formData.append('name', request.name);
    formData.append('profile_file', request.profileFile);

    return await axios.post(url, formData).
      then(res => {
        return res.data;
      }).catch(err => {
        return err.response.data;
      });
  }

  /**
   ** Login
   *
   * @param request
   * @return object
   */
  public static async login(request: any) {
    let url = `${API_URL}/api/auth/login`;

    let formData = new FormData();

    formData.append('email', request.email);
    formData.append('password', request.password);

    return await axios.post(url, formData)
      .then(res => {
        return res.data;
      }).catch(err => {
        return err.response.data;
      });
  }

  /**
   ** Logout
   *
   * @return object
   */
  public static async logout() {
    let url = `${API_URL}/api/auth/logout`;

    let session = AuthHelper.getSession();
    let token = session.token;

    return await axios.post(url, null, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => {
        return res.data;
      }).catch(err => {
        return err.response.data;
      });
  }
}
