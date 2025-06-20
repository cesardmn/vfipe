import React, { useEffect, useState } from 'react'
import { useStep } from '@/app/providers/StepProvider'
import { useBreadcrumbs } from '@/app/providers/BreadcrumbsProvider'
import { referenceUpdate } from '@/services/FetchData'
import Skeleton from './Skeleton'

const ReferenceDrop = () => {
  const { step, setStep } = useStep()
  const { setBreadcrumbs } = useBreadcrumbs()
  const [referenceList, setReferenceList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReferences = async () => {
      setBreadcrumbs(['Tabela Referência'])

      try {
        const data = await referenceUpdate()
        setReferenceList(data || [])
        if (data?.length > 0) {
          setStep((prev) => ({ ...prev, refId: data[0].id }))
        }
      } catch (err) {
        console.error('Erro ao buscar referências:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReferences()
  }, [])

  const handleChange = (e) => {
    const selectedRefId = e.target.value
    setStep((prev) => ({
      ...prev,
      refId: selectedRefId,
      typeId: '',
      brandId: '',
    }))
    setBreadcrumbs(['Tabela Referência'])
  }

  if (loading) {
    return (
      <div className="w-full">
        <Skeleton />
      </div>
    )
  }

  return (
    <div className="w-full">
      <label
        htmlFor="referenceSelect"
        className="block mb-2 text-xs font-medium text-gr-1 uppercase"
      >
        tabela de referência
      </label>
      <select
        id="referenceSelect"
        onChange={handleChange}
        disabled={loading}
        className="w-full h-12 px-4 py-2 rounded-lg bg-bk-1 text-wt-1 border border-bk-3 shadow-md focus:outline-none focus:ring-2 focus:ring-or-2 transition-colors"
      >
        {referenceList.map((ref) => (
          <option key={ref.id} value={ref.id} className="bg-bk-1 text-wt-1">
            {ref.description}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ReferenceDrop
