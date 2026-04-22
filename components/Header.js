"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mon Portfolio</h1>

        <nav className="flex gap-6">
          <Link href="/">Accueil</Link>
          <Link href="/projects">Projets</Link>
          <Link href="/temoignages">Témoignages</Link>
          <Link href="/login">Login</Link>
          <Link href="/inscription">Inscription</Link>
        </nav>
      </div>
    </header>
  );
}