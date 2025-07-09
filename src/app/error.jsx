'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Erro capturado:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-bk-2 text-wt-1 flex flex-col items-center justify-start px-4 text-center pt-16">
      <h1 className="text-4xl font-bold mb-4 text-or-3">Ocorreu um erro</h1>
      <p className="text-lg mb-8 text-wt-3">
        Algo deu errado em nossa aplicação. Tente novamente ou volte mais tarde.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 rounded-md bg-or-3 text-bk-1 hover:bg-or-3 transition-colors font-medium"
      >
        Tentar novamente
      </button>
    </div>
  )
}
