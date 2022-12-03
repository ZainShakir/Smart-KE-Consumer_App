import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  isprimary: false,
  setprimary: (val) => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [isprimary, setpr] = useState(false);
  function authenticate(token) {
    setAuthToken(token);
    SecureStore.setItemAsync("token", token);
  }
  function logout() {
    setAuthToken(null);
    setpr(false);
    SecureStore.deleteItemAsync("token");
  }

  function setprimary(val) {
    setpr(val);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    isprimary: isprimary,
    setprimary: setprimary,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
