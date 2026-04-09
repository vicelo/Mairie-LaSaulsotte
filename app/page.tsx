export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary">Mairie de La Saulsotte</h1>
        <p className="mb-8 text-lg text-gray-600">Site officiel de la commune — en construction</p>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm text-primary">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          Refonte en cours
        </div>
      </div>
    </main>
  );
}
