export async function GET(params) {
  const baseUrl = process.env.BASE_URL
  const resource = 'ConsultarModelos'
  const url = params.url
  const resources = url.split('/').filter(Boolean)
  const [codigoTabelaReferencia, codigoTipoVeiculo, codigoMarca] =
    resources.slice(-3)

  const queryParams = new URLSearchParams()
  queryParams.append('codigoTabelaReferencia', codigoTabelaReferencia)
  queryParams.append('codigoTipoVeiculo', codigoTipoVeiculo)
  queryParams.append('codigoMarca', codigoMarca)

  const urlToFetch = `${baseUrl}/${resource}?${queryParams.toString()}`
  console.log(urlToFetch)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }

  try {
    const apiResponse = await fetch(urlToFetch, requestOptions)
    const { ok, status, statusText } = apiResponse
    const data = await apiResponse.json()

    return Response.json({ ok, status, statusText, data })
  } catch (error) {
    console.error('Erro ao consultar API externa:', error)

    return Response.json({
      ok: false,
      status: 502,
      statusText: 'Erro ao consultar serviço externo',
      data: null
    })
  }
}
