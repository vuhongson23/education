import axios from "axios";
import { URL_REFRESH_TOKEN } from "~/api/end-point";

interface IRequestParams {
  url: string;
  params?: any;
}

interface IOptions {
  timeout?: number;
  headers?: Record<string, string>;
}

const getAuthData = () => {
  const data =
    localStorage.getItem("user_infor") ||
    sessionStorage.getItem(import.meta.env.VITE_KEY_SESSION_STORAGE_AUTH);
  return typeof data === "string" ? JSON.parse(data) : data;
};

const getHeader = (isFile = false, customHeaders = {}) => {
  const headers: Record<string, string> = {
    "Content-Type": isFile
      ? "multipart/form-data"
      : "application/json,charset=UTF-8",
  };
  const authData = getAuthData();
  if (authData?.accessToken) {
    headers["Authorization"] = `Bearer ${authData.accessToken}`;
  }
  return { ...headers, ...customHeaders };
};

//===========================Axios Instance===================================
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: Number(import.meta.env.VITE_DEFAULT_TIME_OUT),
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor request
axiosInstance.interceptors.request.use(
  (config) => {
    const tokenapp = getAuthData();
    console.log("🚀 ~ tokenapp:", tokenapp);

    // Gắn token vào header
    if (tokenapp?.token?.accessToken) {
      config.headers["Authorization"] = `Bearer ${tokenapp.token.accessToken}`;
    }

    // Set header type theo FormData
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const user = getAuthData();
    const originRequest = error.config;
    if (error.response.status === 401 && !originRequest._retry) {
      originRequest._retry = true;
      try {
        const response = await axiosInstance.post(URL_REFRESH_TOKEN, {
          refToken: user?.refreshToken,
        });

        const newAccessToken = response?.data?.accessToken;

        const userData = {
          ...user,
          accessToken: newAccessToken,
        };

        // Lưu lại accessToken mới vào local storage & session storage
        localStorage.setItem(
          import.meta.env.VITE_KEY_LOCAL_STORAGE_AUTH,
          JSON.stringify(userData)
        );
        sessionStorage.setItem(
          import.meta.env.VITE_KEY_SESSION_STORAGE_AUTH,
          JSON.stringify(userData)
        );

        originRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originRequest);
      } catch (refreshError) {
        localStorage.removeItem(import.meta.env.VITE_KEY_LOCAL_STORAGE_AUTH);
        sessionStorage.removeItem(
          import.meta.env.VITE_KEY_SESSION_STORAGE_AUTH
        );
        console.log("Refresh token failed", refreshError);
        return refreshError;
      }
    }
    return Promise.reject(error);
  }
);

//======================================API method===========================================
export const get = async (
  requestParams: IRequestParams,
  options?: IOptions
) => {
  if (!window.navigator.onLine) return handleOffline();
  try {
    const response = await axiosInstance.get(requestParams.url, {
      params: requestParams.params,
      timeout:
        options?.timeout || Number(import.meta.env.VITE_DEFAULT_TIME_OUT),
      headers: getHeader(false, options?.headers),
      ...options,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getNoAuth = async (
  requestParams: IRequestParams,
  options: IOptions
) => {
  if (!window.navigator.onLine) return handleOffline();
  const response = await axiosInstance.get(requestParams.url, {
    params: requestParams.params,
    timeout: options?.timeout || Number(import.meta.env.VITE_DEFAULT_TIME_OUT),
    ...options,
  });

  return response;
};

export const post = async (
  requestParams: IRequestParams,
  options: IOptions
) => {
  if (!window.navigator.onLine) return handleOffline();
  const response = await axiosInstance.post(
    requestParams.url,
    requestParams.params,
    {
      timeout: options.timeout || Number(import.meta.env.VITE_DEFAULT_TIME_OUT),
      headers: getHeader(false, options.headers),
      ...options,
    }
  );

  return response;
};

export const postNoAuth = async (
  requestParams: IRequestParams,
  options: IOptions
) => {
  if (!window.navigator.onLine) return handleOffline();
  const response = await axiosInstance.post(
    requestParams.url,
    requestParams.params,
    {
      timeout: options.timeout || Number(import.meta.env.VITE_DEFAULT_TIME_OUT),
      ...options,
    }
  );

  return response;
};

export const put = async (requestParams: IRequestParams, options: IOptions) => {
  if (!window.navigator.onLine) return handleOffline();
  const response = await axiosInstance.put(
    requestParams.url,
    requestParams.params,
    {
      timeout: options.timeout || Number(import.meta.env.VITE_DEFAULT_TIME_OUT),
      headers: getHeader(false, options.headers),
      ...options,
    }
  );

  return response;
};

export const putNoAuth = async (
  requestParams: IRequestParams,
  options: IOptions
) => {
  if (!window.navigator.onLine) return handleOffline();
  const response = await axiosInstance.put(
    requestParams.url,
    requestParams.params,
    {
      timeout: options.timeout || Number(import.meta.env.VITE_DEFAULT_TIME_OUT),
      ...options,
    }
  );

  return response;
};

export const deleteData = async (
  requestParams: IRequestParams,
  options: IOptions
) => {
  if (!window.navigator.onLine) return handleOffline();
  const response = await axiosInstance.delete(requestParams.url, {
    params: requestParams.params,
    timeout: options.timeout || Number(import.meta.env.VITE_DEFAULT_TIME_OUT),
    ...options,
  });

  return response;
};

const handleOffline = () => {
  return {
    data: null,
    status: 0, // hoặc 503 cho service unavailable
    statusText: "Network Error",
    headers: {},
    config: {} as any,
    code: -1,
    message: "Mất kết nối Internet, vui lòng kiểm tra đường truyền",
  };
};
