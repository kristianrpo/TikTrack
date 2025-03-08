import { userService } from "@/application/services/user.service";
import { generateToken } from "@/shared/utils/jwtUtils";
import { comparePasswords, hashPassword } from "@/shared/utils/passwordUtils";

export const login = async (body: { email: string; password: string }) => {
  const { email, password } = body;

  console.log("🔍 Buscando usuario por email:", email); // Log para depuración

  const user = await userService.findByEmail(email);
  if (!user) {
    console.log("❌ Usuario no encontrado"); // Log para depuración
    throw new Error("Usuario no encontrado");
  }

  console.log("🔐 Comparando contraseñas..."); // Log para depuración
  console.log("Contraseña proporcionada:", password); // Log para depuración
  console.log("Contraseña almacenada (hash):", user.password); // Log para depuración

  const isValid = await comparePasswords(password, user.password);
  if (!isValid) {
    console.log("❌ Contraseña incorrecta"); // Log para depuración
    throw new Error("Contraseña incorrecta");
  }

  console.log("✅ Contraseña válida"); // Log para depuración

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
  role?: string;
}) => {
  const { username, email, password, role } = body;

  console.log("🔐 Hasheando contraseña..."); // Log para depuración
  const hashedPassword = await hashPassword(password); // Hashea la contraseña
  console.log("Contraseña hasheada:", hashedPassword); // Log para depuración

  console.log("📝 Creando usuario con contraseña hasheada..."); // Log para depuración
  const newUser = await userService.createUser({
    username,
    email,
    password: hashedPassword,
    role: role ?? "user",
  });

  console.log("✅ Usuario creado:", newUser); // Log para depuración

  return {
    message: "Usuario registrado correctamente",
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
  };
};