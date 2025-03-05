import { userService } from '@/application/services/user.service'; // Importamos el userService
import { generateToken } from '@/shared/utils/jwtUtils';
import { comparePasswords } from '@/shared/utils/passwordUtils';

export const login = async (body: { email: string; password: string }) => {
    const { email, password } = body;

    const user = await userService.findByEmail(email); // Usamos el servicio aquí
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
        throw new Error('Contraseña incorrecta');
    }

    const token = generateToken(user);

    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
        token,
    };
};

export const register = async (body: { username: string; email: string; password: string }) => {
    const newUser = await userService.createUser(body); // Usamos el servicio aquí
    return {
        message: 'Usuario registrado correctamente',
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        },
    };
};
