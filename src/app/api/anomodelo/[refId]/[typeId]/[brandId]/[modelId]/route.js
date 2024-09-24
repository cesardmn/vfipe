export async function GET(params) {
  const baseUrl = process.env.BASE_URL;
  const resource = 'ConsultarAnoModelo';
  const url = params.url;
  const resources = url.split('/').filter(Boolean);
  const [
    codigoTabelaReferencia,
    codigoTipoVeiculo,
    codigoMarca,
    codigoModelo
  ] = resources.slice(-4);

  const queryParams = new URLSearchParams();
  queryParams.append('codigoTabelaReferencia', codigoTabelaReferencia);
  queryParams.append('codigoTipoVeiculo', codigoTipoVeiculo);
  queryParams.append('codigoMarca', codigoMarca);
  queryParams.append('codigoModelo', codigoModelo);

  const urlToFetch = `${baseUrl}/${resource}?${queryParams.toString()}`;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };

  try {
    const apiResponse = await fetch(urlToFetch, requestOptions);
    if (!apiResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await apiResponse.json();
    const formattedResponse = responseData.map(item => ({
      id: item.Value,
      year: item.Label.trim(),
    }));

    return Response.json(formattedResponse);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Bad Request!' });
  }
}
