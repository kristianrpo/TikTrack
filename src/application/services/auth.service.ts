export interface LoginResponse {
    id: string;
    username: string;
    email: string;
    role: string;
    token: string; // Agregar el token
}

export async function loginUser(email: string, password: string): Promise<LoginResponse | null> {
    try {
        // Realiza la solicitud POST a la API de login
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Login failed');
        }

        // Extrae los datos de la respuesta
        const data = await response.json();
        const { user, token } = data;

        // Verifica si el token y el usuario están disponibles
        if (!user || !token) {
            throw new Error('Datos de usuario o token faltantes');
        }

        // Retorna los datos del usuario y el token
        return { ...user, token } as LoginResponse;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error durante el login:', error.message);
        } else {
            console.error('Error durante el login:', error);
        }
        return null;
    }
}
