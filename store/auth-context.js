import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  isprimary: false,
  setprimary: (val) => {},
  primary_account: "",
  set_account: (account) => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [isprimary, setpr] = useState(false);
  const [primary_account, setPrimaryAccount] = useState();

  function authenticate(token) {
    setAuthToken(token);
    SecureStore.setItemAsync("token", token);
  }
  function logout() {
    setAuthToken(null);
    setpr(false);
    setPrimaryAccount(null);
    SecureStore.deleteItemAsync("token");
  }

  function setprimary(val) {
    setpr(val);
  }

  function set_account(account) {
    setPrimaryAccount(account);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    isprimary: isprimary,
    setprimary: setprimary,
    primary_account: primary_account,
    set_account: set_account,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
