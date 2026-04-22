export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen flex flex-col items-center p-10">

      {/* Photo */}
      <img
        src="/photo.jpg"
        alt="profile"
        className="rounded-full w-36 h-36 mb-4 border-4 border-blue-900 shadow-lg"
      />

      {/* Nom */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Bonjour, je suis Yanis Messaoudene
      </h1>

      {/* Description */}
      <p className="text-gray-700 text-center max-w-xl mb-6 font-bold text-[14px]">
        Étudiant en programmation informatique. Passionné par le développement web
        et les nouvelles technologies.
      </p>

      {/* Compétences */}
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Mes compétences
        </h2>

        <div className="space-y-3">
          <div className="bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            HTML / CSS
          </div>
          <div className="bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            JavaScript
          </div>
          <div className="bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            React
          </div>
          <div className="bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            Next.js
          </div>
          <div className="bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            Redux
          </div>
          <div className="bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            API REST
          </div>
        </div>
      </div>

    </main>
  );
}