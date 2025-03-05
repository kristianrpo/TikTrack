'use client';

import { useState, useEffect } from 'react';
import { loginUser, LoginResponse } from './auth.service';

interface AuthState {
    user: LoginResponse | null;
    error: string | null;
    loading: boolean;
}

export function useAuth() {
    const [state, setState] = useState<AuthState>({ user: null, error: null, loading: false });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setState({ user: JSON.parse(storedUser), error: null, loading: false });
        }
    }, []);

    const login = async (email: string, password: string) => {
        setState({ user: null, error: null, loading: true });

        try {
            const user = await loginUser(email, password);
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', user.token);  // Guardamos el token
                setState({ user, error: null, loading: false });
            } else {
                setState({ user: null, error: 'Credenciales incorrectas', loading: false });
            }
        } catch (err) {
            console.error(err);
            setState({ user: null, error: 'Error al iniciar sesión', loading: false });
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setState({ user: null, error: null, loading: false });
    };

    return { ...state, login, logout };
}
