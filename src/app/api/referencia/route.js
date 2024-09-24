export async function GET(requestParams) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };

  const baseUrl = process.env.BASE_URL;
  const resource = 'ConsultarTabelaDeReferencia'
  const urlToFetch = `${baseUrl}/${resource}`

  try {
    const apiResponse = await fetch(urlToFetch, requestOptions);
    if (!apiResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await apiResponse.json();
    const formattedResponse = responseData.map(item => ({
      id: item.Codigo,
      description: item.Mes.trim(),
    }));

    return Response.json(formattedResponse);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Bad Request!' });
  }
}
