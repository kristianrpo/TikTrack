"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/application/services/auth.hook";
import { useRouter } from "~/i18n/routing";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading, user, initialized } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    if (!initialized) return; // ⬅️ Esperamos a que `useAuth` termine de cargar la sesión

    if (user) {
      router.push("/influencers"); // ⬅️ Redirige solo si el usuario está autenticado
    }
  }, [initialized, user, router]);

  // 🔹 Si `initialized` es `false`, mostramos un loading para evitar parpadeos
  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
