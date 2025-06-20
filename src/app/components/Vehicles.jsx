import { useStep } from '@/app/providers/StepProvider'
import { fetchData } from '@/services/FetchData'
import { useEffect, useState } from 'react'
import Skeleton from './Skeleton'

const Vehicles = () => {
  const { step } = useStep()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(false)
  const [years, setYears] = useState([])

  const fetchAllVehicles = async (fetchedYears) => {
    const { refId, typeId, brandId, modelId } = step
    setLoading(true)

    try {
      const vehiclesData = await Promise.all(
        fetchedYears.map(async (year) => {
          const url = `/api/vehicle/${refId}/${typeId}/${brandId}/${modelId}/${year.id}`
          try {
            return await fetchData(url)
          } catch (error) {
            console.error(
              `Erro ao buscar veículo para o ano ${year.id}:`,
              error
            )
            return null
          }
        })
      )

      const validVehicles = vehiclesData.filter((vehicle) => vehicle !== null)
      setVehicles(validVehicles)
    } catch (error) {
      console.error('Erro ao buscar veículos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleYears = async () => {
    const { refId, typeId, brandId, modelId } = step

    try {
      const fetchedYears = await fetchData(
        `/api/anomodelo/${refId}/${typeId}/${brandId}/${modelId}`
      )
      setYears(fetchedYears)
      fetchAllVehicles(fetchedYears)
    } catch (error) {
      console.error('Erro ao buscar anos:', error)
    }
  }

  useEffect(() => {
    if (step.refId && step.typeId && step.brandId && step.modelId) {
      handleYears()
    }
  }, [step])

  if (loading) return <Skeleton />

  return (
    <div className="w-full mt-4">
      <div className="overflow-x-auto max-h-[450px] overflow-y-auto rounded-lg shadow-md ring-1 ring-bk-3 scrollbar-thin scrollbar-thumb-bk-3 scrollbar-track-bk-2">
        <table className="min-w-full divide-y divide-bk-3 bg-bk-1 text-sm">
          <caption className="text-left px-6 py-3 text-sm font-medium text-or-1 border-b border-bk-3">
            {vehicles.length > 0
              ? `Código FIPE: ${vehicles[0].fipe}`
              : 'Veículos'}
          </caption>
          <thead className="bg-bk-2 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-wt-1 uppercase tracking-wider">
                Ano
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-wt-1 uppercase tracking-wider">
                Combustível
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-wt-1 uppercase tracking-wider">
                Valor
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bk-3">
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <tr
                  key={vehicle.authentication}
                  className="hover:bg-bk-2 transition-colors"
                >
                  <td className="px-6 py-4 text-wt-1">
                    {vehicle.year === '32000' ? 'Zero Km' : vehicle.year}
                  </td>
                  <td className="px-6 py-4 text-wt-1">{vehicle.fuel}</td>
                  <td className="px-6 py-4 text-or-1 font-medium">
                    {vehicle.price}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-4 text-center text-gr-1 italic"
                >
                  Nenhum veículo encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Vehicles
