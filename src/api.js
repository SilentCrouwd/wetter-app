const LOCAL_STORAGE_KEY = "CityArray";

export async function getWetherData(id, days = 3) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=86a979bdd40a47c6b58140058260806&q=id:${id}&days=${days}&lang=de`,
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
  const response = await fetch(
    `https://api.weatherapi.com/v1/fsearch.json?key=86a979bdd40a47c6b58140058260806&q=${input}`,
  );
  const searchCity = await response.json();
  console.log(searchCity);
  return searchCity;
}
