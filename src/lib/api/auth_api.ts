import axios from "axios";

let API_URL = import.meta.env.VITE_API_URL;

const login = async (email: string, password: string) => {
  try {
    let response = await axios.post(`${API_URL}/api/auth/login`, {
      email: email,
      password: password,
    });

    let result = response.data;

    return result;
  } catch (error: any) {
    let result = error.response.data;

    return result;
  }
};

export { login };