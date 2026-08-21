'use client';

export default function DashboardPage() {
  return (
    <div className="p-8 font-sans max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Dashboard (Mock)</h1>
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Generateur de vidéo */}
        <div className="border p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Generate Video</h2>
          <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert("Appel vers /api/videos/generate simulé !"); }}>
            <textarea 
              className="border p-3 rounded-lg w-full"
              rows={4}
              placeholder="Describe your video..."
            />
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              Generate (1 Credit)
            </button>
          </form>
        </div>

        {/* Portefeuille et Crédits */}
        <div className="border p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Your Wallet</h2>
          <p className="text-3xl font-bold mb-4">10 <span className="text-lg text-gray-500 font-normal">Credits</span></p>
          
          <h3 className="font-medium mb-2">Buy more credits</h3>
          <div className="flex flex-col gap-2">
            <button className="border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition" onClick={() => alert("Appel vers /api/credits/purchase simulé ! (Pack 10)")}>
              10 Credits - 1000 XOF
            </button>
            <button className="border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition" onClick={() => alert("Appel vers /api/credits/purchase simulé ! (Pack 50)")}>
              50 Credits - 4500 XOF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
