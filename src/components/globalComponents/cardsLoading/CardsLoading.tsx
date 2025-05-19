'use client'

export function CardsLoading() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-200 h-[180px] w-full animate-pulse">

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
