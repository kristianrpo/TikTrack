import { userService } from "@/application/services/user.service"; 
import { generateToken } from "@/shared/utils/jwtUtils";
import { comparePasswords, hashPassword } from "@/shared/utils/passwordUtils";

export const login = async (body: { email: string; password: string }) => {
  const { email, password } = body;

  const user = await userService.findByEmail(email);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const isValid = await comparePasswords(password, user.password);
  if (!isValid) {
    throw new Error("Contraseña incorrecta");
  }

  const token = generateToken({ id: user.id.toString(), email: user.email, role: user.role });

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

export const register = async (body: {
  username: string;
  email: string;
  password: string;
  role?: string; // Se permite que el rol sea opcional
}) => {
  const hashedPassword = await hashPassword(body.password); // Se encripta la contraseña

  const newUser = await userService.createUser({
    username: body.username,
    email: body.email,
    password: hashedPassword,
    role: body.role ?? "user", // Si no se proporciona un rol, se asigna "user"
  });

  return {
    message: "Usuario registrado correctamente",
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role, // Se incluye el rol en la respuesta
    },
  };
};
