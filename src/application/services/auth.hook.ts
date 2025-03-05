// src/application/services/auth.hook.ts

'use client';

import { useState, useEffect } from 'react';
import { loginUser, LoginResponse } from './auth.service';

// Interfaz para el usuario en sesión
interface AuthState {
    user: LoginResponse | null;
    error: string | null;
    loading: boolean;
}

export function useAuth() {
    const [state, setState] = useState<AuthState>({
        user: null,
        error: null,
        loading: false
    });

    // Cargar el usuario desde localStorage si existe
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setState((prev) => ({ ...prev, user: JSON.parse(storedUser) }));
        }
    }, []);

    // Login
    const login = async (email: string, password: string) => {
        setState({ user: null, error: null, loading: true });
        try {
            const user = await loginUser(email, password);
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                setState({ user, error: null, loading: false });
            } else {
                setState({ user: null, error: 'Credenciales incorrectas', loading: false });
            }
        } catch (err) {
            console.error(err);
            setState({ user: null, error: 'Error al iniciar sesión', loading: false });
        }
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('user');
        setState({ user: null, error: null, loading: false });
    };

    return {
        user: state.user,
        error: state.error,
        loading: state.loading,
        login,
        logout
    };
}
