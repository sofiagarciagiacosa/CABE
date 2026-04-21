import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};
export const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};
export const isAuthenticated = () => {
  const token = getToken();

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    // verificar expiración
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch {
    return false;
  }
};
export const logoutAndRedirect = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};