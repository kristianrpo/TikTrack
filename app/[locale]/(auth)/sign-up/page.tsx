"use client";

import { useState } from "react";
import { useRouter, Link } from "~/i18n/routing"; // Importa Link de next-intl
import { useTranslations } from "next-intl"; // Importa useTranslations para traducciones

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("SignUpPage"); // Usa useTranslations para traducciones

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role: "user" }), // Siempre enviamos "user" como rol
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al registrarse");
      }

      router.push("/sign-in");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple">
          {t("title")} {/* Usa la traducción para el título */}
        </h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Campo de nombre de usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("usernameLabel")} {/* Usa la traducción para la etiqueta de nombre de usuario */}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Campo de correo electrónico */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("emailLabel")} {/* Usa la traducción para la etiqueta de correo */}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Campo de contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("passwordLabel")} {/* Usa la traducción para la etiqueta de contraseña */}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Mensaje de error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full bg-purple text-white py-2 rounded hover:bg-darkPurple transition-colors"
            disabled={loading}
          >
            {loading ? t("loading") : t("signUpButton")} {/* Usa la traducción para el botón */}
          </button>

          {/* Enlace para iniciar sesión */}
          <div className="text-center">
            <span className="text-sm text-gray-600">
              {t("haveAccount")}{" "} {/* Usa la traducción para el texto */}
              <Link
                href="/sign-in" // Redirige a /sign-in (internacionalizado)
                className="text-purple hover:underline"
              >
                {t("signInLink")} {/* Usa la traducción para el enlace */}
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}