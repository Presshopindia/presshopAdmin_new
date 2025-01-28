import axios from "./index";

const BASE_URL = process.env.REACT_APP_BASE_URL
let base = "users";

class AuthApi {
  static Login = (data) => {
    return axios.post(`${BASE_URL}auth/admin/login`, data);
  };
  static Register = (data) => {
    return axios.post(`${base}/register`, data);
  };

  static Logout = (data) => {
    return axios.post(`${base}/logout`, data, { headers: { Authorization: `${data.token}` } });
  };
}


export default AuthApi;
