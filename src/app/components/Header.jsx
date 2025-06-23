'use client'

import Image from 'next/image'
import LogoSvg from '@/public/img/logo.svg'
import Skeleton from './Skeleton'
import { useFipe } from '../../store/fipeStore'
import { useEffect, useState } from 'react'
import { fetchAndCacheData } from '@/services/FetchData'

const Header = () => {
  const { setReferenceTableList, setRefId } = useFipe()
  const [isLoading, setIsLoading] = useState(true)
  const [date, setDate] = useState(null)

  useEffect(() => {
    const getReference = async () => {
      setIsLoading(true)

      const { ok, data, statusText } = await fetchAndCacheData('api/referencia')


      if (ok && Array.isArray(data)) {
        const lastRef = data[0]
        const refId = lastRef.Codigo
        const desription = String(lastRef.Mes).trim()
        setDate(desription)
        setRefId(refId)
        const formatedData = data.map(item => ({
          id: item.Codigo,
          description: item.Mes.trim()
        }));
        setReferenceTableList(formatedData)
      } else {
        console.error('Erro ao buscar referência FIPE:', statusText)
      }
      setIsLoading(false)
    }

    getReference()
  }, [setReferenceTableList])


  return (
    <header className="bg-bk-2 px-6 py-4 flex items-center justify-between flex-wrap gap-y-4 border-b border-bk-3 sticky top-0 z-50 shadow-md">
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

      <div className="flex items-center gap-3 text-sm sm:text-base">
        <span className="text-gr-1 transition-opacity duration-200">
          Atualizado em:
        </span>

        <div className="min-w-[120px]">
          {isLoading ? (
            <span className="h-[1rem] w-[8rem] inline-block">
              <Skeleton rows={1} className="h-full" />
            </span>
          ) : (
            <time
              className="text-or-1 font-medium whitespace-nowrap px-2 py-1 bg-bk-3/20 rounded-md border-bk-4 inline-block"
              dateTime={date}
              title="Data da última atualização"
            >
              {date}
            </time>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header


