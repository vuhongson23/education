export const useAuthData = () => {
  const localKey = process.env.KEY_LOCAL_STORAGE_AUTH;
  const sessionKey = process.env.KEY_SESSION_STORAGE_AUTH;
  try {
    let authData: string | null = null;
    if (localKey) {
      authData = localStorage.getItem(localKey);
    } else if (!authData && sessionKey) {
      authData = sessionStorage.getItem(sessionKey);
    }
    if (authData) {
      return typeof authData === "string" ? JSON.parse(authData) : authData;
    }
    return null;
  } catch (error) {
    console.error("Error parsing auth data:", error);
    return null;
  }
};
