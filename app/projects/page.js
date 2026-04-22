"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProjectsPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

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
    localStorage.removeItem("savedEmail");
    localStorage.removeItem("savedPassword");
    router.push("/login");
  };

  const projects = [
    {
      id: 1,
      title: "Portfolio Next.js",
      description: "Création d’un portfolio avec Next.js et Tailwind CSS.",
    },
    {
      id: 2,
      title: "Application To-Do",
      description: "Application de gestion de tâches avec React.",
    },
    {
      id: 3,
      title: "Site E-commerce",
      description: "Site de vente en ligne avec panier et navigation.",
    },
  ];

  if (!authorized) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Mes Projets</h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Déconnexion
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              {project.title}
            </h2>

            <p className="text-gray-600 mb-4">{project.description}</p>

            <Link href={`/projects/${project.id}`}>
              <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700">
                Voir détails
              </button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}