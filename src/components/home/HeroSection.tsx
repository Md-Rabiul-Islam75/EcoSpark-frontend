export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 opacity-10 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600 opacity-10 rounded-full -ml-48 -mb-48"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-6 inline-block">
          <span className="bg-white/20 text-white px-6 py-2 rounded-full text-sm font-semibold backdrop-blur">
            ✨ Welcome to EcoSpark Hub
          </span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          Share Your <span className="text-green-200">Sustainability</span> Ideas
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 text-green-50 max-w-3xl mx-auto leading-relaxed">
          Help build a better, greener future for everyone. Share innovative ideas, collaborate with community members, and make a real impact on sustainability.
        </p>
        
        <div className="flex gap-6 justify-center flex-wrap">
          <a
            href="/ideas"
            className="bg-white text-green-700 px-8 py-4 rounded-lg font-bold hover:bg-green-50 transition duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            🚀 Explore Ideas
          </a>
          <a
            href="/register"
            className="bg-green-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-900 transition duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform border-2 border-white/30"
          >
            ✍️ Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
