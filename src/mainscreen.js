import { getWetherData } from "./api";
import { loadingSpinner, renderDetailView } from "./detailview";
import { appEl } from "./main";

const cityArr = ["lauenau", "Lauenstein", "mannheim", "Coppenbrügge"];
//background dynamisch übergeben
InitApp();

async function InitApp() {
  loadingSpinner("Lade daten für Übersicht...");
  appEl.innerHTML = getMainContent();
  await getCityCards(cityArr);
  applyListeners();
}
export async function getCityCards(cityArr) {
  for (const city of cityArr) {
    const wetherData = await getWetherData(city);
    const { current, forecast, location } = wetherData;

    const currforecast = forecast.forecastday[0].day;

    const mainScreenCityContainerEL = document.querySelector(
      ".main-screen__city-container",
    );

    mainScreenCityContainerEL.innerHTML += getCityCard(
      location.name,
      location.region,
      current.temp_c,
      current.condition.text,
      currforecast.maxtemp_c,
      currforecast.mintemp_c,
    );
  }
}

function getMainContent() {
  return `
  
        <div class="main-screen">
        <div class="main-screen__main-screen-header">
          <p class="main-screen-header__headline">Wetter</p>
          <button class="btn btn--edit">Bearbeiten</button>
        </div>
        <input
          class="main-screen__input"
          type="text"
          placeholder="Nach Stadt Suchen"
        />
        <div class="main-screen__city-container"></div>
      </div>
  

  `;
}

function getCityCard(
  city,
  country,
  currTemp,
  crurrCondition,
  maxTemp,
  minTemp,
) {
  return `

 <div class="city-card"data-city="${city}" >
            <div class="city-card__header">
              <div class="city-card__header city-card__header--left">
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

function applyListeners(city) {
  const cardElments = document.querySelectorAll(".city-card");

  cardElments.forEach((card) => {
    card.addEventListener("click", () => {
      const city = card.getAttribute("data-city");

      renderDetailView(city);
    });
  });
}
