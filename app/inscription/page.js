"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InscriptionPage() {
  const router = useRouter();

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInscription = (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!nom || !email || !motDePasse || !confirmerMotDePasse) {
      setMessage("Veuillez remplir tous les champs.");
      setMessageType("error");
      return;
    }

    if (motDePasse !== confirmerMotDePasse) {
      setMessage("Les mots de passe ne correspondent pas.");
      setMessageType("error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExiste = users.find((u) => u.email === email);

    if (userExiste) {
      setMessage("Cet email est déjà utilisé.");
      setMessageType("error");
      return;
    }

    const newUser = {
      nom,
      email,
      password: motDePasse,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setMessage("Inscription réussie ✅");
    setMessageType("success");

    setNom("");
    setEmail("");
    setMotDePasse("");
    setConfirmerMotDePasse("");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleInscription}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
          Inscription
        </h1>

        <input
          type="text"
          placeholder="Nom complet"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-400"
        />

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
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
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

        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
            value={confirmerMotDePasse}
            onChange={(e) => setConfirmerMotDePasse(e.target.value)}
            className="w-full p-3 pr-20 border rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-700 hover:underline"
          >
            {showConfirmPassword ? "Cacher" : "Afficher"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          S’inscrire
        </button>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              messageType === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </main>
  );
}