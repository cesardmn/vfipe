import { useStep } from '@/app/providers/StepProvider'
import { fetchData } from '@/services/FetchData'
import { useEffect, useState, useRef } from 'react'
import Skeleton from './Skeleton'
import { useBreadcrumbs } from '@/app/providers/BreadcrumbsProvider'

const Brands = () => {
  const { step, setStep } = useStep()
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef(null)
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs()

  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    try {
      const data = await fetchData(url)

      if (data?.error) {
        throw new Error(data.error)
      }

      if (!Array.isArray(data)) {
        throw new Error('Resposta inválida da API')
      }

      return data
    } catch (err) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay))
        return fetchWithRetry(url, retries - 1, delay * 1.5) // Backoff exponencial
      }
      throw err
    }
  }

  const handleBrands = async () => {
    setLoading(true)
    setError(null)

    try {
      if (step.typeId !== '') {
        const data = await fetchWithRetry(
          `/api/marcas/${step.refId}/${step.typeId}`
        )
        setBrands(data)
      }
    } catch (err) {
      console.error('Erro ao carregar marcas:', err)
      setError(err.message)
      setBrands([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleBrands()
    setSearchTerm('')
    searchInputRef.current?.focus()
  }, [step])

  useEffect(() => {
    if (!brands) return

    const searchWords = searchTerm.toLowerCase().trim().split(/\s+/)
    const filtered = brands.filter(
      (brand) =>
        brand?.brand &&
        searchWords.every((word) => brand.brand.toLowerCase().includes(word))
    )
    setResult(filtered)
  }, [searchTerm, brands])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleModel = (e) => {
    const newStep = { ...step }
    newStep.brandId = e.target.value
    setStep(newStep)
    const newCrumbs = [...breadcrumbs.slice(0, 2), e.target.innerText]
    setBreadcrumbs(newCrumbs)
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center gap-4 p-4 bg-bk-1 rounded-lg border border-bk-3">
        <p className="text-gr-1">{error}</p>
        <button
          onClick={handleBrands}
          className="px-4 py-2 bg-or-2 text-wt-1 rounded-lg hover:bg-or-1 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <input
        type="search"
        ref={searchInputRef}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Pesquisar marcas..."
        className="w-full px-4 py-3 rounded-lg bg-bk-1 text-sm text-wt-1 placeholder-gr-1 shadow-md focus:outline-none focus:ring-2 focus:ring-or-2 border border-bk-3 transition-colors"
      />

      {loading ? (
        <Skeleton />
      ) : (
        <ul
          className="w-full max-h-80 overflow-y-auto bg-bk-1 rounded-lg shadow-md border border-bk-3 divide-y divide-bk-3 scrollbar-thin scrollbar-thumb-bk-3 scrollbar-track-bk-2"
          role="listbox"
        >
          {result.length > 0 ? (
            result.map((item) => (
              <li
                key={item.id}
                value={item.id}
                onClick={handleModel}
                className="cursor-pointer px-4 py-3 text-sm text-wt-1 hover:bg-or-2/20 transition-colors group"
                role="option"
              >
                <span className="group-hover:text-or-1 transition-colors">
                  {item.brand}
                </span>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-sm text-gr-1 italic">
              {searchTerm
                ? 'Nenhuma marca encontrada'
                : 'Nenhuma marca disponível'}
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export default Brands
