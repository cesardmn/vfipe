export async function GET(requestParams) {
  const baseUrl = process.env.BASE_URL
  const resource = 'ConsultarMarcas'
  const requestUrl = requestParams.url
  const resources = requestUrl.split('/').filter(Boolean)

  const [codigoTabelaReferencia, codigoTipoVeiculo] = resources.slice(-2)

  const queryParams = new URLSearchParams()
  queryParams.append('codigoTabelaReferencia', codigoTabelaReferencia)
  queryParams.append('codigoTipoVeiculo', codigoTipoVeiculo)

  const urlToFetch = `${baseUrl}/${resource}?${queryParams.toString()}`

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }

  try {
    const apiResponse = await fetch(urlToFetch, requestOptions)
    if (!apiResponse.ok) {
      throw new Error('Network response was not ok')
    }

    const responseData = await apiResponse.json()
    const formattedResponse = responseData.map((item) => ({
      id: item.Value,
      brand: item.Label.trim(),
    }))

    return Response.json(formattedResponse)
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Bad Request!' })
  }
}
