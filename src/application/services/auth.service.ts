// src/application/services/auth.service.ts

export interface LoginResponse {
    id: string;
    username: string;
    email: string;
    role: string;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse | null> {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Login failed');
        }

        const data = await response.json();
        return data.user as LoginResponse;
    } catch (error) {
        console.error('Error during login:', error);
        return null;
    }
}
