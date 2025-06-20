import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");
    const refreshTokenExpiresAt = localStorage.getItem("refreshTokenExpiresAt");

    const now = new Date();

    const logoutAndRedirect = () => {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("tokenExpiresAt");
      localStorage.removeItem("refreshTokenExpiresAt");
      window.location.href = "/sign-in";
    };

    if (!refreshTokenExpiresAt) {
      logoutAndRedirect();
      return config;
    }

    const refreshExpiryDate = new Date(refreshTokenExpiresAt);
    if (now > refreshExpiryDate) {
      logoutAndRedirect();
      return config;
    }

    if (!token || !tokenExpiresAt) {
      logoutAndRedirect();
      return config;
    }

    const tokenExpiryDate = new Date(tokenExpiresAt);
    if (now > tokenExpiryDate) {
      try {
        const refreshResponse = await axios.post("/api/v1/auth/refresh", undefined, {
          withCredentials: true,
        });

        if (refreshResponse?.data?.success) {
          const {
            token: newToken,
            tokenExpiresAt: newTokenExpiresAt,
            refreshTokenExpiresAt: newRefreshTokenExpiresAt,
          } = refreshResponse.data.data;

          localStorage.setItem("token", newToken);
          sessionStorage.setItem("token", newToken);
          localStorage.setItem("tokenExpiresAt", newTokenExpiresAt);
          localStorage.setItem("refreshTokenExpiresAt", newRefreshTokenExpiresAt);

          config.headers.Authorization = `Bearer ${newToken}`;
        } else {
          logoutAndRedirect();
          return config;
        }
      } catch {
        logoutAndRedirect();
        return config;
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});





export default instance;
