import {
  createContext,
  ReactNode,
  useCallback,
  useState,
  useEffect,
} from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";

export const initialState: AuthState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  surname: null,
  email: null,
};

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthState {
  uid: string | null;
  checking: boolean;
  logged: boolean;
  name: string | null;
  surname: string | null;
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
        surname: data.surname,
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
        surname: data.surname,
      });
    }

    return response.ok!;
  };

  const verifyToken = useCallback(async () => {
    console.log("Verificando token...");

    const token = localStorage.getItem("token") || "";
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
        surname: null,
      });

      console.log("No se encontró el token. Redirigiendo al login.");
      return false;
    }

    try {
      const response = await fetchConToken("/auth/renew");

      if (response.ok) {
        localStorage.setItem("token", response.token);
        const { user:data } = response;
        setAuth({
          uid: data.id,
          checking: false,
          logged: true,
          name: data.name,
          email: data.email,
          surname: data.surname,
        });
        console.log("Token verificado exitosamente.");
        return true;
      } else {
        setAuth({
          uid: null,
          checking: false,
          logged: false,
          name: null,
          email: null,
          surname: null,
        });
        console.log("Error al renovar el token. Redirigiendo al login.");
        return false;
      }
    } catch (error) {
      console.log("Error en la verificación del token:", error);
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
        surname: null,
      });
      return false;
    }
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
      surname: null,
    });
  };

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <AuthContext.Provider
      value={{ auth, login, register, verifyToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
