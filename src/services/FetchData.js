export const fetchData = async (url) => {
  const getCachedData = (url) => {
    const cachedData = localStorage.getItem(url);
    return cachedData ? JSON.parse(cachedData) : null;
  };

  const cacheData = (url, data) => {
    if (!data.error) {
      localStorage.setItem(url, JSON.stringify(data));
    }
  };

  try {
    const cachedData = getCachedData(url);
    if (cachedData) {
      console.log('Using cached data');
      return cachedData;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || 'Network response was not ok');
    }

    cacheData(url, data);
    console.log('Fetched new data');
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
};

export const referenceUpdate = async () => {
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

  const cacheData = (data) => {
    if (!data.error) {
      localStorage.setItem('/api/referencia', JSON.stringify(data));
    }
  };

  const currentReference = getCurrentMonthAndYear();
  const referenceData = await fetchData('/api/referencia');

  if (!referenceData) return null;

  const lastReference = referenceData[0]?.description;

  if (currentReference !== lastReference) {
    try {
      const response = await fetch('/api/referencia');
      const newData = await response.json();

      if (!response.ok || newData.error) {
        throw new Error(newData.error || 'Network response was not ok');
      }

      cacheData(newData);
      console.log('Fetched updated reference data');
      return newData;
    } catch (error) {
      console.error('Failed to fetch updated reference data:', error);
      return null;
    }
  }

  return referenceData;
};
