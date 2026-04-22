"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");

    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("Veuillez remplir tous les champs ❌");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setMessage("Connexion réussie ✅");

      document.cookie = "isLoggedIn=true; path=/; max-age=86400";
      localStorage.setItem("currentUser", JSON.stringify(user));

      setShowSavePopup(true);
    } else {
      setMessage("Email ou mot de passe incorrect ❌");
    }
  };

  const handleSave = () => {
    localStorage.setItem("savedEmail", email);
    localStorage.setItem("savedPassword", password);
    setShowSavePopup(false);
    router.push("/projects");
  };

  const handleLater = () => {
    setShowSavePopup(false);
    router.push("/projects");
  };

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center px-4 relative">
      {showSavePopup && (
        <div className="fixed top-5 right-5 bg-white border shadow-xl rounded-xl p-4 w-80 z-50">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            Enregistrer le mot de passe ?
          </p>

          <p className="text-xs text-gray-500 mb-4">
            Vous pouvez enregistrer vos informations pour vous connecter plus rapidement.
          </p>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleLater}
              className="px-3 py-1 text-sm text-gray-600 hover:underline"
            >
              Plus tard
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-blue-900 text-white rounded hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
          Connexion
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-20 border rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-700 hover:underline"
          >
            {showPassword ? "Cacher" : "Afficher"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Se connecter
        </button>

        <p className="text-center text-sm text-blue-700 mt-3 hover:underline cursor-pointer">
          Mot de passe oublié ?
        </p>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}