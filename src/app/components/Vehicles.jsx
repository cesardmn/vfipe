import { useFipe } from '../../store/fipeStore'
import { fetchAndCacheData } from '../../services/FetchData'
import { useEffect, useState } from 'react'

const Vehicles = () => {
  const {
    refId,
    typeId,
    brandId,
    modelId,
    modelYearsList,
    setVehicleList,
    setIsLoading,
  } = useFipe()

  const [fipeList, setFipeList] = useState([])
  const [copiedItem, setCopiedItem] = useState(null)

  useEffect(() => {
    setIsLoading('result', true)
    const fetchVehicles = async () => {
      try {
        const promises = modelYearsList.map((year) => {
          const url = `/api/vehicle/${refId}/${typeId}/${brandId}/${modelId}/${year.id}`
          return fetchAndCacheData(url, 'get vehicle')
        })

        const results = await Promise.all(promises)
        setVehicleList(results)
        setFipeList(results)
      } catch (error) {
        console.error('Erro ao buscar veículos:', error)
      }
    }

    if (modelYearsList.length > 0) {
      fetchVehicles()
    }
    setIsLoading('result', false)
  }, [
    refId,
    typeId,
    brandId,
    modelId,
    modelYearsList,
    setIsLoading,
    setVehicleList,
  ])

  const copyToClipboard = (text, id) => {
    const numericValue = text.replace(/[^\d,.]/g, '')
    const decimalValue = numericValue.replace('.', '')

    navigator.clipboard
      .writeText(decimalValue)
      .then(() => {
        setCopiedItem(id)
        setTimeout(() => setCopiedItem(null), 1500)
      })
      .catch((err) => {
        console.error('Falha ao copiar texto: ', err)
      })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho principal */}
      {fipeList.length > 0 && (
        <div className="bg-bk-2 p-4 rounded-md shadow border border-bk-3">
          <h3 className="text-xl font-semibold text-bk-12 mb-1">
            código fipe: {fipeList[0].data.fipe}
          </h3>
          <p className="text-bk-11">
            marca | modelo: {fipeList[0].data.brand} | {fipeList[0].data.model}
          </p>
        </div>
      )}

      {/* Tabela de veículos */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-bk-1 border border-bk-3 rounded-md text-sm">
          <thead className="bg-bk-2 text-bk-12 text-left">
            <tr>
              <th className="px-4 py-2 border-b border-bk-3">Ano</th>
              <th className="px-4 py-2 border-b border-bk-3">Combustível</th>
              <th className="px-4 py-2 border-b border-bk-3">Modelo</th>
              <th className="px-4 py-2 border-b border-bk-3">Preço</th>
            </tr>
          </thead>
          <tbody>
            {fipeList.map((fipe, index) => {
              const itemId = `${fipe.data.year}-${index}`
              return (
                <tr key={itemId} className="hover:bg-bk-2/30 transition">
                  <td className="px-4 py-2 border-b border-bk-3">
                    {String(fipe.data.year) === '32000'
                      ? '0 Km'
                      : fipe.data.year}
                  </td>
                  <td className="px-4 py-2 border-b border-bk-3">
                    {fipe.data.fuel}
                  </td>
                  <td className="px-4 py-2 border-b border-bk-3">
                    {fipe.data.model}
                  </td>
                  <td className="px-4 py-2 border-b border-bk-3 relative">
                    <div
                      className="text-green-600 font-medium cursor-pointer hover:underline"
                      onClick={() => copyToClipboard(fipe.data.price, itemId)}
                    >
                      {fipe.data.price}
                    </div>

                    {/* Tooltip que aparece apenas após clicar */}
                    {copiedItem === itemId && (
                      <div className=" bg-wt-1 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-bk-12 text-bk-1 text-xs px-2 py-1 rounded whitespace-nowrap">
                        Copiado!
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-bk-12 rotate-45"></div>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Vehicles
