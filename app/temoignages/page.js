"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TemoignagesPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const [temoignages, setTemoignages] = useState([
    {
      id: 1,
      nom: "Ahmed",
      message:
        "Excellent développeur, très professionnel et rapide dans son travail.",
    },
    {
      id: 2,
      nom: "Sarah",
      message:
        "Travail de qualité, je recommande fortement pour les projets web.",
    },
    {
      id: 3,
      nom: "Yanis",
      message: "Très bonne expérience, design moderne et code propre.",
    },
  ]);

  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const isLoggedIn = document.cookie.includes("isLoggedIn=true");

    if (isLoggedIn) {
      setAuthorized(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    document.cookie = "isLoggedIn=; path=/; max-age=0";
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  const handleAjouterOuModifier = (e) => {
    e.preventDefault();

    if (!nom || !message) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (editId !== null) {
      const updatedTemoignages = temoignages.map((t) =>
        t.id === editId ? { ...t, nom, message } : t
      );
      setTemoignages(updatedTemoignages);
      setEditId(null);
    } else {
      const nouveauTemoignage = {
        id: Date.now(),
        nom,
        message,
      };
      setTemoignages([...temoignages, nouveauTemoignage]);
    }

    setNom("");
    setMessage("");
  };

  const handleModifier = (temoignage) => {
    setNom(temoignage.nom);
    setMessage(temoignage.message);
    setEditId(temoignage.id);
  };

  if (!authorized) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Témoignages</h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Déconnexion
        </button>
      </div>

      <form
        onSubmit={handleAjouterOuModifier}
        className="bg-white p-6 rounded-xl shadow-md mb-8 max-w-2xl"
      >
        <div className="mb-4">
          <label className="block text-black font-medium mb-2">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full p-3 border rounded-lg text-black"
            placeholder="Entrez le nom"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-medium mb-2">
            Témoignage
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border rounded-lg text-black"
            placeholder="Entrez le témoignage"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          {editId !== null ? "Modifier" : "Ajouter"}
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-6">
        {temoignages.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              {t.nom}
            </h2>

            <p className="text-gray-600 italic mb-4">"{t.message}"</p>

            <button
              onClick={() => handleModifier(t)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Modifier
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}