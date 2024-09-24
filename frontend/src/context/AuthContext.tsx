import { createContext, ReactNode, useCallback, useState } from "react";
import { fetchSinToken } from "../helpers/fetch";

export const initialState: AuthState = {
  uid: null as string | null,
  checking: true,
  logged: false,
  name: null as string | null,
  email: null as string | null,
};

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthState {
  uid: string | null;
  checking: boolean;
  logged: boolean;
  name: string | null;
  email: string | null;
}

export interface ResponseLogin {
  ok: boolean;
  msg: string;
  data: User;
  token: string;
}

export interface User {
  name: string;
  surname: string;
  email: string;
  online: boolean;
  id: string;
}

interface AuthContextProps {
  auth: AuthState;
  login: (password: string, email: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    surname: string,
    password: string
  ) => Promise<boolean>;
  verifyToken: () => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState(initialState);

  const login = async (password: string, email: string) => {
    console.log("login");

    const response = (await fetchSinToken(
      "/auth/login",
      { email, password },
      "POST"
    )) as ResponseLogin;

    if (response.ok) {
      localStorage.setItem("token", response.token);
      const { data } = response;
      setAuth({
        uid: data.id,
        checking: false,
        logged: true,
        name: data.name,
        email: data.email,
      });
    }

    return response.ok!;
  };

  const register = async (
    name: string,
    email: string,
    surname: string,
    password: string
  ): Promise<boolean> => {
    console.log("register");

    const response = (await fetchSinToken(
      "/auth/register",
      { name, email, surname, password },
      "POST"
    )) as ResponseLogin;

    if (response.ok) {
      localStorage.setItem("token", response.token);
      const { data } = response;
      setAuth({
        uid: data.id,
        checking: false,
        logged: true,
        name: data.name,
        email: data.email,
      });
    }

    return response.ok!;
  };

  const verifyToken = useCallback(() => {
    console.log("verifyToken");
  }, []);

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    setAuth({
      uid: null,
      checking: false,
      logged: false,
      name: null,
      email: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, register, verifyToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
