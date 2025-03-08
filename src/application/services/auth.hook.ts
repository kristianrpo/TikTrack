"use client";

import { useState, useEffect } from "react";
import { loginUser, LoginResponse } from "./auth.service";

interface AuthState {
  user: LoginResponse | null;
  error: string | null;
  loading: boolean;
  initialized: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    error: null,
    loading: false,
    initialized: false,
  });

  // 🔹 Solo inicializa el estado, pero no recupera credenciales automáticamente
  useEffect(() => {
    setState((prevState) => ({ ...prevState, initialized: true }));
  }, []);

  const login = async (email: string, password: string) => {
    setState({ user: null, error: null, loading: true, initialized: true });

    try {
      const user = await loginUser(email, password);
      if (user) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("user", JSON.stringify(user)); // Almacena credenciales solo después de un inicio de sesión exitoso
          sessionStorage.setItem("token", user.token);
        }
        setState({ user, error: null, loading: false, initialized: true });
      } else {
        setState({
          user: null,
          error: "Credenciales incorrectas",
          loading: false,
          initialized: true,
        });
      }
    } catch (err) {
      console.error(err);
      setState({
        user: null,
        error: "Error al iniciar sesión",
        loading: false,
        initialized: true,
      });
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("user"); 
      sessionStorage.removeItem("token");
    }
    setState({ user: null, error: null, loading: false, initialized: true });
  };

  return { ...state, login, logout };
}