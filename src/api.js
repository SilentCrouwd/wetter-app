const API_ENDPOINT =
  "https://api.weatherapi.com/v1/forecast.json?key=86a979bdd40a47c6b58140058260806&q=salzhemmendorf&lang=de";

export async function getWetherData() {
  const response = await fetch(API_ENDPOINT);
  const WetherDataCurrent = await response.json();
  return WetherDataCurrent;
}

export async function getFutureWetherData(date) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=86a979bdd40a47c6b58140058260806&q=salzhemmendorf&dt=${date}&lang=de`,
  );
  const WetherDataFuture = await response.json();

  return WetherDataFuture;
}

const wetherVariables = await getWetherData();
export const cityName = wetherVariables.location.name;
// console.log(cityName);
export const currDegrease = wetherVariables.current.temp_c;
// console.log(currDegrease);
export const currCondition = wetherVariables.current.condition.text;
// console.log(currCondition);
export const maxTemp = wetherVariables.forecast.forecastday[0].day.maxtemp_c;
// console.log(heatIndex);
export const minTemp = wetherVariables.forecast.forecastday[0].day.mintemp_c;
// console.log(dewpoint);
export const forecastHour = wetherVariables.forecast.forecastday[0].hour;
export const forecastday = wetherVariables.forecast.forecast;

export const conditionImg = wetherVariables.current.condition.icon;
export const maxWind = wetherVariables.forecast.forecastday[0].day.maxwind_kph;
export const isDay = wetherVariables.current.is_day;

export function getFutureDates(add) {
  const currDate = new Date();
  const day = currDate.getDate() + add;
  const month = currDate.getMonth() + 1;
  const year = currDate.getFullYear();

  const fullDate = `${year}-${month}-${day}`;

  return fullDate;
}
const newDateEL = await getFutureWetherData(getFutureDates(2));
console.log(newDateEL.forecast.forecastday[0].date);
