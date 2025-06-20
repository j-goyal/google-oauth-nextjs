import axios from "./axios";

class AxiosMethods {
  setToken = (
    token: string,
    tokenExpiresAt?: string,
    refreshTokenExpiresAt?: string,
    remember: boolean = true
  ) => {
    if (remember) {
      localStorage.setItem("token", token);
    }
    sessionStorage.setItem("token", token);

    if (tokenExpiresAt) {
      localStorage.setItem("tokenExpiresAt", tokenExpiresAt);
    }

    if (refreshTokenExpiresAt) {
      localStorage.setItem("refreshTokenExpiresAt", refreshTokenExpiresAt);
    }
  };

  getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  removeToken = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  getData = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response?.data;
    } catch (error) {
      throw error;
    }
  };

  postData = async (url: string, payload?: unknown, config?: object) => {
    try {
      const response = await axios.post(url, payload, config);
      return response?.data;
    } catch (error) {
      throw error;
    }
  };

  putData = async (url: string, payload?: unknown) => {
    try {
      const response = await axios.put(url, payload);
      return response?.data;
    } catch (error) {
      throw error;
    }
  };

  patchData = async (url: string, payload?: unknown) => {
    try {
      const response = await axios.patch(url, payload);
      return response?.data;
    } catch (error) {
      throw error;
    }
  };

  deleteData = async (url: string) => {
    try {
      const response = await axios.delete(url);
      return response?.data;
    } catch (error) {
      throw error;
    }
  };

  postFormData = async (url: string, formData: FormData) => {
    const response = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response?.data;
  };
}

export default new AxiosMethods();
