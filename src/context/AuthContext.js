import React, { useState, useEffect, createContext } from "react";
import { setToken, getToken, removeToken } from "../api/token";
import { useUser } from "../hooks/useUser";

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
  navRefresh: () => null,
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);
  const { getMe } = useUser();
  const [refresh, setRefresh] = useState(false);

  const navRefresh = () => setRefresh((prev) => !prev);
  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        const me = await getMe(token);
        if (me.messages) {
          removeToken();
          setAuth(null);
        } else setAuth({ token, me });
      } else {
        setAuth(null);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const login = async (token) => {
    setToken(token);
    const me = await getMe(token);
    setAuth({ token, me });
  };

  const logout = async () => {
    if (auth) {
      removeToken();
      setAuth(null);
    }
  };

  const valueContext = {
    auth: auth,
    login,
    logout,
    navRefresh,
  };

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};
