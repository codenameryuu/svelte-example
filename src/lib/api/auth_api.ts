import axios from "axios";

let API_URL = import.meta.env.VITE_API_URL;

async function register(request: any) {
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
};

async function login(request: any) {
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
};

async function logout() {
  let url = `${API_URL}/api/auth/logout`;
  let token = localStorage.getItem("token");

  return await axios.post(url, null, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })
    .then(res => {
      return res.data;
    }).catch(err => {
      return err.response?.data ?? { status: false, message: "Logout gagal" };
    });
};

export { register, login, logout };