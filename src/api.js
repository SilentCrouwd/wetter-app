const API_ENDPOINT =
  "https://api.weatherapi.com/v1/current.json?key=86a979bdd40a47c6b58140058260806&q=hannover";

export async function getWetherData() {
  const response = await fetch(API_ENDPOINT);
  const WetherDataCurrent = await response.json();
  console.log(WetherDataCurrent);
}

