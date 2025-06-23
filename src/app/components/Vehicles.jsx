import { useFipe } from '../../store/fipeStore'
import { fetchAndCacheData } from '../../services/FetchData'
import { useEffect, useState } from 'react'

const Vehicles = () => {
  const {
    refId,
    typeId,
    brandId,
    modelId,
    modelYearsList
  } = useFipe()

  const [fipeList, setFipeList] = useState([])

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const promises = modelYearsList.map(year => {
          const url = `/api/vehicle/${refId}/${typeId}/${brandId}/${modelId}/${year.id}`
          return fetchAndCacheData(url)
        })

        const results = await Promise.all(promises)
        setFipeList(results)
      } catch (error) {
        console.error('Erro ao buscar veículos:', error)
      }
    }

    if (modelYearsList.length > 0) {
      fetchVehicles()
    }
  }, [refId, typeId, brandId, modelId, modelYearsList])

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho principal */}
      {fipeList.length > 0 && (
        <div className="bg-bk-2 p-4 rounded-md shadow border border-bk-3">
          <h3 className="text-xl font-semibold text-bk-12 mb-1">
            {fipeList[0].data.fipe}
          </h3>
          <p className="text-bk-11">
            {fipeList[0].data.brand} • {fipeList[0].data.model}
          </p>
        </div>
      )}

      {/* Tabela de veículos */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-bk-1 border border-bk-3 rounded-md">
          <thead className="bg-bk-2 text-bk-12 text-left">
            <tr>
              <th className="px-4 py-2 border-b border-bk-3">Ano</th>
              <th className="px-4 py-2 border-b border-bk-3">Modelo</th>
              <th className="px-4 py-2 border-b border-bk-3">Preço</th>
            </tr>
          </thead>
          <tbody>
            {fipeList.map((fipe, index) => (
              <tr key={`${fipe.data.year}-${index}`} className="hover:bg-bk-2/30 transition">
                <td className="px-4 py-2 border-b border-bk-3">{fipe.data.year}</td>
                <td className="px-4 py-2 border-b border-bk-3">{fipe.data.model}</td>
                <td className="px-4 py-2 border-b border-bk-3 text-green-600 font-medium">
                  {fipe.data.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Vehicles
