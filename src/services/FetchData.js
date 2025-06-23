export async function fetchAndCacheData(url, resource, maxRetries = 3, delay = 500) {

  const cachedData = localStorage.getItem(url)
  if (cachedData) {
    console.log(`${resource} from cache`)
    return {
      ok: true,
      status: 200,
      statusText: `${resource} from cache`,
      data: JSON.parse(cachedData),
    }
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url)
      const { ok, status, statusText } = response
      const responseApi = await response.json()

      if (ok) {
        console.log(`${resource} from fipe`)
        localStorage.setItem(url, JSON.stringify(responseApi.data))
      }

      return {
        ok,
        status,
        statusText,
        data: responseApi.data,
      }

    } catch (error) {
      console.error(`Erro na tentativa ${attempt}:`, error)

      if (attempt === maxRetries) {
        return {
          ok: false,
          status: 502,
          statusText: 'Erro ao consultar serviço externo',
          data: null,
        }
      }

      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}


export const referenceUpdate = async () => {
  const getCurrentMonthAndYear = () => {
    const months = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ]

    const currentDate = new Date()
    const month = months[currentDate.getMonth()]
    const year = currentDate.getFullYear()

    return `${month}/${year}`
  }

  const cacheData = (data) => {
    if (!data.error) {
      localStorage.setItem('/api/referencia', JSON.stringify(data))
    }
  }

  const currentReference = getCurrentMonthAndYear()
  const referenceData = await fetchData('/api/referencia')

  if (!referenceData) return null

  const lastReference = referenceData[0]?.description

  if (currentReference !== lastReference) {
    try {
      const response = await fetch('/api/referencia')
      const newData = await response.json()

      if (!response.ok || newData.error) {
        throw new Error(newData.error || 'Network response was not ok')
      }

      cacheData(newData)
      console.log('Fetched updated reference data')
      return newData
    } catch (error) {
      console.error('Failed to fetch updated reference data:', error)
      return null
    }
  }

  return referenceData
}
