import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const skipAuthUrls = [
  "/api/v1/auth/google",
  "/api/v1/auth/refresh",
  "/api/v1/auth/google/confirm-restore",
];

instance.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const url = config.url ?? "";
    if (skipAuthUrls.some(skipUrl => url.includes(skipUrl))) {
      return config;
    }
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");
    const refreshTokenExpiresAt = localStorage.getItem("refreshTokenExpiresAt");

    const now = new Date();

    const logoutAndRedirect = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiresAt");
      localStorage.removeItem("refreshTokenExpiresAt");
      window.location.href = "/sign-in";
    };

    if (!refreshToken || !refreshTokenExpiresAt) {
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
        const refreshResponse = await refreshInstance.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/refresh`, {refreshToken: refreshToken});

        if (refreshResponse?.data?.success) {
          const {
            token: newToken,
            tokenExpiresAt: newTokenExpiresAt,
            refreshTokenExpiresAt: newRefreshTokenExpiresAt,
            encryptedRefreshToken: newRefreshToken,
          } = refreshResponse.data.data;

          localStorage.setItem("token", newToken);
          localStorage.setItem("tokenExpiresAt", newTokenExpiresAt);
          localStorage.setItem("refreshToken", newRefreshToken);
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
