import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret";

interface User {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (user: User): string => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, {
    expiresIn: "1d",
  });
};
