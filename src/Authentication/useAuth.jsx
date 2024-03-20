import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const validateToken = () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      if (Date.now() < decoded.exp * 1000) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const getUser = () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      return null;
    }
  };
  return { validateToken, getUser };
};
export default useAuth;
