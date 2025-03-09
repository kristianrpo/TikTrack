"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/application/services/auth.hook";
import { useRouter, Link } from "~/i18n/routing";
import { useTranslations } from "next-intl";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading, user } = useAuth();
  const router = useRouter();
  const t = useTranslations("SignInPage"); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple">
          {t("title")} 
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("emailLabel")} 
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
              {t("passwordLabel")} 
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
              className="w-full bg-purple text-white py-2 rounded hover:bg-darkPurple transition-colors"
              disabled={loading}
            >
              {loading ? t("loading") : t("signInButton")} 
            </button>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">
              {t("noAccount")}{" "} 
              <Link
                href="/sign-up" 
                className="text-purple hover:underline"
              >
                {t("registerLink")} 
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}