export const fetchData = async (url) => {
  try {
    const cachedData = localStorage.getItem(url);
    if (cachedData) {
      console.log('cache data')
      return JSON.parse(cachedData);
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('fetch data')
    const data = await response.json();
    localStorage.setItem(url, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
};