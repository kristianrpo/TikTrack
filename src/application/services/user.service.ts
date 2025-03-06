import UserRepository from "@/infrastructure/repositories/user.repository";

const userRepository = new UserRepository();

export const userService = {
  findByEmail: async (email: string) => {
    return await userRepository.findByEmail(email);
  },

  createUser: async (userData: {
    username: string;
    email: string;
    password: string;
    role: string; // Se agrega el rol como parámetro obligatorio
  }) => {
    return await userRepository.createUser(userData);
  },
};
