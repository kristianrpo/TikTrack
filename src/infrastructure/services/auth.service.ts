import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  generateToken(userId: string, role: string): string {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "1h" }); // Token válido por 1 hora
  }

  verifyToken(token: string): { userId: string; role: string } | null {
    try {
      return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    } catch (error) {
      console.error("Token inválido:", error);
      return null;
    }
  }
}
