'use client'

export default function CardsLoading() {
  return (
    <div className="relative overflow-hidden rounded-xl shadow bg-gray-100 h-[280px] w-full max-w-[240px] animate-pulse">
      {/* Bloco da imagem */}
      <div className="h-[140px] w-full bg-gray-200 mb-4"></div>

      {/* Blocos de texto */}
      <div className="px-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Efeito de linha brilhante */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer pointer-events-none" />

      {/* Estilo da animação embutido no componente */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
          background-size: 200% 100%;
        }
      `}</style>
    </div>
  )
}
