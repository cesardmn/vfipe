import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bk-2 text-wt-1 flex flex-col items-center justify-start px-4 text-center pt-16">
      <h1 className="text-4xl font-bold mb-4 text-or-3">
        404 - Página não encontrada
      </h1>
      <p className="text-lg mb-8 text-wt-3">
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="px-6 py-2 rounded-md bg-or-1 text-bk-1 hover:bg-or-2 transition-colors font-medium"
      >
        Voltar para o início
      </Link>
    </div>
  )
}
