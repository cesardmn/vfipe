export async function GET(params) {
  const baseUrl = process.env.BASE_URL;
  const resource = 'ConsultarValorComTodosParametros';
  const url = params.url;
  const resources = url.split('/').filter(Boolean);
  const [
    codigoTabelaReferencia,
    codigoTipoVeiculo,
    codigoMarca,
    codigoModelo,
    ano
  ] = resources.slice(-5);

  const types = {
    1: 'carro',
    2: 'moto',
    3: 'caminhao'
  };

  const tipoVeiculo = types[codigoTipoVeiculo];
  const queryParams = new URLSearchParams();
  queryParams.append('codigoTabelaReferencia', codigoTabelaReferencia);
  queryParams.append('codigoTipoVeiculo', codigoTipoVeiculo);
  queryParams.append('codigoMarca', codigoMarca);
  queryParams.append('codigoModelo', codigoModelo);
  queryParams.append('ano', ano);
  queryParams.append('codigoTipoCombustivel', ano.slice(-1));
  queryParams.append('anoModelo', ano.slice(0, -2));
  queryParams.append('tipoVeiculo', tipoVeiculo);
  queryParams.append('tipoConsulta', 'tradicional');

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
    const formattedResponse = {
      fipe: responseData.CodigoFipe,
      reference: responseData.MesReferencia.trim(),
      type: types[responseData.TipoVeiculo],
      brand: responseData.Marca,
      model: responseData.Modelo,
      year: responseData.AnoModelo,
      fuel: responseData.Combustivel,
      price: responseData.Valor,
      authentication: responseData.Autenticacao,
      timeStamp: responseData.DataConsulta,
    }

    return Response.json(formattedResponse);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Bad Request!' });
  }
}
