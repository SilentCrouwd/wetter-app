const LOCAL_STORAGE_KEY = "CityArray";
const API_KEY = "key=86a979bdd40a47c6b58140058260806";
const API_ROOT = "https://api.weatherapi.com/v1";

export async function getWetherData(id, days = 3) {
  try {
    const response = await fetch(
      `${API_ROOT}/forecast.json?${API_KEY}&q=id:${id}&days=${days}&lang=de`,
    );
    if (!response.ok) throw new Error("Netzwerk-Antwort war nicht ok");
    const WetherDataCurrent = await response.json();

    return WetherDataCurrent;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
  }
}

export function getLocalStorage() {
  const cityArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  return cityArray;
}

export function setLocalStorage(insertedArray) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(insertedArray));
}

export async function serchApi(input) {
  const response = await fetch(`${API_ROOT}/search.json?${API_KEY}&q=${input}`);
  const searchCity = await response.json();

  return searchCity;
}
