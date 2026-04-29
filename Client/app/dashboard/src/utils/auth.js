import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};
export const getUser = () => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const user = JSON.parse(storedUser);

    return {
      ...user,
      rol: user.rol?.nombre || user.rol,
    };
  }

  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
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
  localStorage.removeItem("user");
  window.location.href = "/login";
};