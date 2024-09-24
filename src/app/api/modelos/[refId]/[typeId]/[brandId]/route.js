export async function GET(params) {
  const baseUrl = process.env.BASE_URL;
  const resource = 'ConsultarModelos';
  const url = params.url;
  const resources = url.split('/').filter(Boolean);
  const [
    codigoTabelaReferencia,
    codigoTipoVeiculo,
    codigoMarca
  ] = resources.slice(-3);

  const queryParams = new URLSearchParams();
  queryParams.append('codigoTabelaReferencia', codigoTabelaReferencia);
  queryParams.append('codigoTipoVeiculo', codigoTipoVeiculo);
  queryParams.append('codigoMarca', codigoMarca);

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
    const formattedResponse = responseData.Modelos.map(item => ({
      id: item.Value,
      model: item.Label.trim(),
    }));

    return Response.json(formattedResponse);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Bad Request!' });
  }
}
