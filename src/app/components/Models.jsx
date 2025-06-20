import { useEffect, useState, useRef } from 'react'
import { useStep } from '@/app/providers/StepProvider'
import { fetchData } from '@/services/FetchData'
import Skeleton from '@/app/components/Skeleton'
import { useBreadcrumbs } from '@/app/providers/BreadcrumbsProvider'

const Models = () => {
  const { step, setStep } = useStep()
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef(null)
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs()

  const handleModels = async () => {
    setLoading(true)
    const { refId, typeId, brandId } = step
    const data = await fetchData(`/api/modelos/${refId}/${typeId}/${brandId}`)
    setModels(data)
    setLoading(false)
  }

  useEffect(() => {
    handleModels()
    setSearchTerm('')
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [step])

  useEffect(() => {
    const searchWords = searchTerm.toLowerCase().trim().split(/\s+/)
    const filtered = models.filter((item) =>
      searchWords.every((word) => item.model.toLowerCase().includes(word))
    )
    setResult(filtered)
  }, [searchTerm, models])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleVehicle = (e) => {
    const newStep = { ...step }
    newStep.modelId = e.target.value
    setStep(newStep)
    const newCrumbs = [...breadcrumbs.slice(0, 3), e.target.innerText]
    setBreadcrumbs(newCrumbs)
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <input
        type="search"
        ref={searchInputRef}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Pesquisar modelos..."
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
                onClick={(e) => handleVehicle(e)}
                className="cursor-pointer px-4 py-3 text-sm text-wt-1 hover:bg-or-2/20 transition-colors group"
                role="option"
              >
                <span className="group-hover:text-or-1 transition-colors">
                  {item.model}
                </span>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-sm text-gr-1 italic">
              Nenhum modelo encontrado
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export default Models