import UserRepository from "@/infrastructure/repositories/user.repository";

const userRepository = new UserRepository();

export const userService = {
  findByEmail: async (email: string) => {
    console.log("🔍 Buscando usuario por email:", email); // Log para depuración
    return await userRepository.findByEmail(email);
  },

  createUser: async (userData: {
    username: string;
    email: string;
    password: string;
    role: string;
  }) => {
    console.log("📝 Creando usuario con contraseña hasheada..."); // Log para depuración
    return await userRepository.createUser(userData); // Pasa la contraseña hasheada directamente
  },
};