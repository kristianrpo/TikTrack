// src/application/services/user.service.ts
import UserRepository from '@/infrastructure/repositories/user.repository'; // Importación correcta

// Crear una instancia de UserRepository
const userRepository = new UserRepository();

export const userService = {
    // Método para buscar un usuario por su correo electrónico
    findByEmail: async (email: string) => {
        return await userRepository.findByEmail(email); // Llamada a la instancia del repositorio
    },

    // Método para crear un nuevo usuario
    createUser: async (userData: { username: string; email: string; password: string }) => {
        const { username, email, password } = userData;
        // Llamada a la instancia del repositorio para crear un usuario
        return await userRepository.createUser({ username, email, password });
    },
};
