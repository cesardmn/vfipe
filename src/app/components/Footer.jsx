const Footer = () => {
  return (
    <footer className="bg-bk-2 border-t border-bk-3 text-wt-2 text-sm px-4 py-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center">
        <p className="text-xs text-gr-2 flex gap-2 ">
          &copy; {new Date().getFullYear()}{' '}
          uma ferramenta {' '}
          <a
            href="https://autoflux.app.br/"
            className="flex items-center gap-2 hover:text-or-1 transition font-bold"
            aria-label="Ir para o site do AutoFlux"
          > autoflux.</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer