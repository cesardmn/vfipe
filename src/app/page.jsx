'use client' 
import Hero from './components/Hero'
import Content from './components/Content'
import { useEffect } from 'react'
import { useFipe } from '../store/fipeStore'
import { fetchAndCacheData } from '../services/FetchData'

const App = () => {
  const { setIsLoading, setRefId, setReferenceTableList, referenceTableList } = useFipe()

  useEffect(() => {
    // Não fazer nova requisição se já temos os dados
    if (referenceTableList.length > 0) return

    const getReference = async () => {
      setIsLoading('reference', true)
      
      try {
        const { ok, data, statusText } = await fetchAndCacheData('api/referencia', 'get reference')

        if (ok && Array.isArray(data)) {
          const lastRef = data[0]
          const refId = lastRef.Codigo
          setRefId(refId)
          const formatedData = data.map(item => ({
            id: item.Codigo,
            description: item.Mes.trim()
          }))
          setReferenceTableList(formatedData)
        } else {
          console.error('Erro ao buscar referência FIPE:', statusText)
        }
      } finally {
        setIsLoading('reference', false)
      }
    }

    getReference()
  }, [setReferenceTableList, setIsLoading, setRefId, referenceTableList.length])

  return (
    <main className="container mx-auto px-4 py-4 flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
      <Hero />
      <Content />
    </main>
  )
}

export default App