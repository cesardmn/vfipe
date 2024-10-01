import { useEffect, useState, useRef } from 'react'
import { useStep } from '@/app/providers/StepProvider'
import { fetchData } from '@/services/FetchData'
import Skeleton from '@/app/components/Skeleton'
import { useBreadcrumbs } from '@/app/providers/BreadcrumbsProvider'
import styles from './styles.module.css'

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
    <div className={styles.container}>
      <input
        type="search"
        ref={searchInputRef}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Pesquisar modelos..."
        className={styles.search}
      />
      {loading ? (
        <Skeleton />
      ) : (
        <ul className={styles.ul}>
          {result.map((item) => (
            <li key={item.id} value={item.id} onClick={(e) => handleVehicle(e)}>
              {item.model}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Models
