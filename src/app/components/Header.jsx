import Image from 'next/image'
import LogoSvg from '@/public/img/logo.svg'

const Header = () => {
  const date = new Date()
    .toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    })
    .replace(' de ', '/')

  return (
    <header className="bg-bk-2 px-6 py-4 flex items-center justify-between flex-wrap gap-y-4 border-b border-bk-3">
      <div className="flex items-center gap-4">
        <Image
          alt="Logo da V FIPE"
          src={LogoSvg}
          width={50}
          height={50}
          priority
        />
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-wt-1">FIPE</h1>
          <p className="text-xs text-gr-1">Consulta de veículos</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm sm:text-base text-wt-1 bg-bk-3 px-3 py-2 rounded-lg">
        <span className="opacity-75">Atualizado em:</span>
        <time
          className="text-or-1 font-medium"
          dateTime={new Date().toISOString()}
        >
          {date}
        </time>
      </div>
    </header>
  )
}

export default Header
