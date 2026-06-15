import { getWetherData } from "./api";
import { renderDetailView, setBackgroundImg } from "./detailview";

import "./style.scss";

const mainScreenCityContainerEL = document.querySelector(
  ".main-screen__city-container",
);

const cityArray = ["lauenstein"];

renderMain();
function renderMain() {
  cityArray.forEach((city) => {
    getCityCardInfo(city);
  });
}

async function getCityCardInfo(city) {
  const wetherData = await getWetherData(city);
  const { current, forecast, location } = wetherData;
  const currforecast = forecast.forecastday[0].day;

  mainScreenCityContainerEL.innerHTML += renderCityCard(
    location.name,
    location.region,
    current.temp_c,
    current.condition.text,
    currforecast.maxtemp_c,
    currforecast.mintemp_c,
  );
}

function renderCityCard(
  city,
  country,
  currTemp,
  crurrCondition,
  maxTemp,
  minTemp,
) {
  return `

 <div class="city-card">
            <div class="city-card__header">
              <div class="city card__header city card__header--left">
                <p class="city-card__header__city">${city}</p>
                <p class="city-card__header__country">${country}</p>
              </div>
              <p class="city-card__header__temp">${Math.floor(currTemp)}&deg;C</p>
            </div>
            <div class="city-card__footer">
              <p class="city-card__footer__condition">${crurrCondition}</p>
              <p class="city-card__footer__average-temp">
                <span class="average-temp--max">H${Math.floor(maxTemp)}&deg;C </span
                ><span class="average-temp--min">T${Math.floor(minTemp)}&deg;C</span>
              </p>
            </div>
          </div>

`;
}
