"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProjectDetails() {
  const { id } = useParams();
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

  const projects = {
    1: {
      title: "Portfolio Next.js",
      description:
        "Création d’un portfolio moderne avec Next.js pour présenter mes projets et compétences.",
      technologies: ["Next.js", "React", "Tailwind CSS"],
      role: "Développeur Front-end",
      challenges:
        "Créer une interface moderne, responsive et bien structurée.",
      solution:
        "Utilisation de Next.js et Tailwind pour un design rapide et propre.",
      code: "https://github.com/",
      demo: "https://mon-site.com",
    },
    2: {
      title: "Application To-Do",
      description:
        "Application permettant de gérer des tâches quotidiennes facilement.",
      technologies: ["React", "JavaScript", "CSS"],
      role: "Développeur Front-end",
      challenges:
        "Gérer les états et rendre l’application simple à utiliser.",
      solution:
        "Utilisation de useState pour manipuler dynamiquement les tâches.",
      code: "https://github.com/",
      demo: "https://mon-site.com",
    },
    3: {
      title: "Site E-commerce",
      description:
        "Site de vente en ligne avec panier et navigation entre pages.",
      technologies: ["Next.js", "React", "Tailwind CSS"],
      role: "Développeur Web",
      challenges:
        "Organiser les produits et gérer le panier efficacement.",
      solution:
        "Création de composants réutilisables et navigation fluide.",
      code: "https://github.com/",
      demo: "https://mon-site.com",
    },
  };

  if (!authorized) {
    return null;
  }

  const project = projects[id];

  if (!project) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl text-red-600 mb-4">Projet introuvable</h1>
        <Link href="/projects">
          <button className="bg-blue-900 text-white px-4 py-2 rounded">
            Retour
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="w-full h-64 bg-gradient-to-r from-blue-500 to-blue-900 rounded-xl mb-6 flex items-center justify-center">
          <span className="text-white text-3xl font-bold text-center">
            {project.title}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          {project.title}
        </h1>

        <p className="text-gray-700 mb-6 leading-7">{project.description}</p>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">Technologies</h2>
          <div className="flex gap-2 flex-wrap">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <p className="mb-3"><b>Rôle :</b> {project.role}</p>
        <p className="mb-3"><b>Défis :</b> {project.challenges}</p>
        <p className="mb-6"><b>Solution :</b> {project.solution}</p>

        <div className="flex gap-4 mb-6">
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Voir le code
          </a>

          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Voir le site
          </a>
        </div>

        <Link href="/projects">
          <button className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-blue-700">
            Retour aux projets
          </button>
        </Link>
      </div>
    </main>
  );
}