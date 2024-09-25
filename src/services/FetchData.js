export const fetchData = async (url) => {
  const getCachedData = (url) => {
    const cachedData = localStorage.getItem(url);
    return cachedData ? JSON.parse(cachedData) : null;
  };

  const cacheData = (url, data) => {
    localStorage.setItem(url, JSON.stringify(data));
  };

  try {
    const cachedData = getCachedData(url);
    if (cachedData) {
      console.log('Using cached data');
      return cachedData;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    cacheData(url, data);
    console.log('Fetched new data');
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
};

export const referenceUpdate = async (url) => {
  const getCurrentMonthAndYear = () => {
    const months = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    const currentDate = new Date();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return `${month}/${year}`;
  };

  const cacheData = (url, data) => {
    localStorage.setItem(url, JSON.stringify(data));
  };

  const currentReference = getCurrentMonthAndYear();
  const referenceData = await fetchData('/api/referencia');

  if (!referenceData) return null;

  const lastReference = referenceData[0]?.description;

  if (currentReference !== lastReference) {
    try {
      const response = await fetch('/api/referencia');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newData = await response.json();
      cacheData(url, newData);
      console.log('Fetched updated reference data');
      return newData;
    } catch (error) {
      console.error('Failed to fetch updated reference data:', error);
      return null;
    }
  }

  return referenceData;
};
