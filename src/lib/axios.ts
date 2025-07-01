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

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return null;

  try {
    const response = await refreshInstance.post("/api/v1/auth/refresh", {
      refreshToken,
    });

    if (response?.data?.success) {
      const {
        token: newToken,
        tokenExpiresAt,
        refreshTokenExpiresAt,
        encryptedRefreshToken: newRefreshToken,
      } = response.data.data;

      localStorage.setItem("token", newToken);
      localStorage.setItem("tokenExpiresAt", tokenExpiresAt);
      localStorage.setItem("refreshToken", newRefreshToken);
      localStorage.setItem("refreshTokenExpiresAt", refreshTokenExpiresAt);

      return newToken;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

instance.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const url = config.url ?? "";
    if (skipAuthUrls.some((skipUrl) => url.includes(skipUrl))) {
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
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken().finally(() => {
          isRefreshing = false;
        });
      }

      const newToken = await refreshPromise;
      if (!newToken) {
        logoutAndRedirect();
        return config;
      }

      config.headers.Authorization = `Bearer ${newToken}`;
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default instance;
