import axios from "./axios";

class AxiosMethods {
  setToken = (
    token: string,
    tokenExpiresAt?: string,
    refreshToken?: string,
    refreshTokenExpiresAt?: string
  ) => {
    localStorage.setItem("token", token);
  
    if (tokenExpiresAt) {
      localStorage.setItem("tokenExpiresAt", tokenExpiresAt);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    if (refreshTokenExpiresAt) {
      localStorage.setItem("refreshTokenExpiresAt", refreshTokenExpiresAt);
    }
  };

  getToken = () => {
    return localStorage.getItem("token");
  };

  removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiresAt");
    localStorage.removeItem("refreshTokenExpiresAt");
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

  postData = async (url: string, payload?: unknown) => {
    try {
      const response = await axios.post(url, payload);
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
