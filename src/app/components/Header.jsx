'use client'

import Image from 'next/image'
import LogoSvg from '@/public/img/logo.svg'
import { useLoading } from '@/app/providers/LoadingProvider'
import Skeleton from './Skeleton'
import { useFipe } from '../../store/fipeStore'


const Header = () => {

  const { referenceTableList } = useFipe()

  const { loading } = useLoading()
  const lastTable = referenceTableList[0]
  const description = lastTable?.description

  return (
    <header className="bg-bk-2 px-6 py-4 flex items-center justify-between flex-wrap gap-y-4 border-b border-bk-3 sticky top-0 z-50 shadow-md">
      {/* Logo e título - com hover effects */}
      <div className="flex items-center gap-0 group cursor-pointer">
        <div className="transition-transform duration-300 group-hover:scale-110">
          <Image
            alt="Logo da V FIPE"
            src={LogoSvg}
            priority
            className="drop-shadow-lg h-18 w-18 pb-3"
          />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-wt-1 tracking-tight bg-gradient-to-r from-or-1 to-or-2 bg-clip-text">
            FIPE
          </h1>
          <p className="text-xs text-gr-1 opacity-90">Consulta de veículos</p>
        </div>
      </div>

      {/* Data de atualização - com melhor feedback visual */}
      <div className="flex items-center gap-3 text-sm sm:text-base">
        <span className="text-gr-1 transition-opacity duration-200">
          Atualizado em:
        </span>

        <div className="min-w-[120px]">
          {loading ? (
            <span className="h-2 w-[100px] inline-block">
              <Skeleton rows={1} className="h-full" />
            </span>
          ) : (
            <time
              className="text-or-1 font-medium whitespace-nowrap px-2 py-1 bg-bk-3/20 rounded-md border-bk-4 inline-block"
              dateTime={description}
              title="Data da última atualização"
            >
              {description}
            </time>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header