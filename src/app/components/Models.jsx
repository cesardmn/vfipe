import { useState, useRef, useEffect } from 'react'
import Skeleton from './Skeleton'
import { useFipe } from '@/store/fipeStore'
import { fetchAndCacheData } from '../../services/FetchData'

const Models = () => {
  const {
    modelList,
    refId,
    typeId,
    brandId,
    setModelId,
    setModelYearsList,
    setResultShow,
    setIsLoading,
  } = useFipe()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredModels, setFilteredModels] = useState([])
  const searchInputRef = useRef(null)

  useEffect(() => {
    setSearchTerm('')
    searchInputRef.current?.focus()
  }, [modelList])

  useEffect(() => {
    if (!modelList) return

    const searchWords = searchTerm.toLowerCase().trim().split(/\s+/)
    const filtered = modelList.filter(
      (model) =>
        model?.description &&
        searchWords.every((word) =>
          model.description.toLowerCase().includes(word)
        )
    )
    setFilteredModels(filtered)
  }, [searchTerm, modelList])

  const handleClick = async (model) => {
    setIsLoading('result', true)
    const url = `/api/anomodelo/${refId}/${typeId}/${brandId}/${model.id}`
    const response = await fetchAndCacheData(url, 'get model year')
    const { ok, data, status, statusText } = response

    if (ok) {
      const formatedModelYears = data.map((modelYear) => {
        const id = modelYear.Value
        const description = modelYear.Label
        const rawLabel = String(modelYear.Label)
        const yearPart = rawLabel.split(' ')
        const year =
          String(yearPart[0]).trim() === '32000' ? '0Km' : yearPart[0]
        console.log(year)
        const fuel = yearPart.slice(1).join(' ')
        return {
          id,
          description,
          year,
          fuel,
        }
      })

      setModelYearsList(formatedModelYears)
      setModelId(model.id)
      setResultShow('vehicles')
      setIsLoading('result', false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <input
        type="search"
        ref={searchInputRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar modelos..."
        className="w-full px-4 py-3 rounded-lg bg-bk-1 text-sm text-wt-1 placeholder-gr-1 shadow-md focus:outline-none focus:ring-2 focus:ring-or-2 border border-bk-3 transition-colors"
      />

      {!modelList ? (
        <Skeleton rows={5} />
      ) : (
        <ul
          className="w-full max-h-80 overflow-y-auto bg-bk-1 rounded-lg shadow-md border border-bk-3 divide-y divide-bk-3 scrollbar-thin scrollbar-thumb-bk-3 scrollbar-track-bk-2"
          role="listbox"
        >
          {filteredModels.length > 0 ? (
            filteredModels.map((model) => (
              <li
                key={model.id}
                className="cursor-pointer px-4 py-3 text-sm text-wt-1 hover:bg-or-2/20 transition-colors group"
                role="option"
                onClick={() => handleClick(model)}
              >
                <span className="group-hover:text-or-1 transition-colors">
                  {model.description}
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

export default Models
