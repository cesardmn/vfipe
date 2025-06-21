export async function GET() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    cache: 'no-store',
  }

  const baseUrl = process.env.BASE_URL
  const resource = 'ConsultarTabelaDeReferencia'
  const urlToFetch = `${baseUrl}/${resource}`

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
