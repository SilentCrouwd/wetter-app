import { getLocalStorage, getWetherData, setLocalStorage } from "./api";
import {
  loadingSpinner,
  renderDetailView,
  setBackgroundImg,
} from "./detailview";

export async function InitApp() {
  const appContainerEl = document.querySelector(".app");
  const cityArr = getLocalStorage();
  if (!appContainerEl) return;

  appContainerEl.innerHTML = getMainContent();

  const cityContainerEl = appContainerEl.querySelector(
    ".main-screen__city-container",
  );
  if (!cityContainerEl) return;

  loadingSpinner(cityContainerEl, "Lade daten für Übersicht...");
  await new Promise((resolve) => setTimeout(resolve, 100));

  try {
    cityContainerEl.innerHTML = "";

    await getCityCards(cityArr);
  } catch (error) {
    // console.error("Error: " + error);
  } finally {
    applyListeners();
  }
}
export async function getCityCards(cityArr) {
  for (const city of cityArr) {
    const wetherData = await getWetherData(city, 1);
    const { current, forecast, location } = wetherData;

    const currforecast = forecast.forecastday[0].day;
    const mainScreenCityContainerEL = document.querySelector(
      ".main-screen__city-container",
    );

    mainScreenCityContainerEL.innerHTML += getCityCard(
      location.name,
      location.region,
      current.temp_c,
      current.is_day,
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
        name="cityserch"
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
  isDay,
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
              <p class="city-card__footer__condition"data-isDay="${isDay}">${crurrCondition}</p>
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
    backgroundCards(card);
    card.addEventListener("click", () => {
      const city = card.getAttribute("data-city");

      renderDetailView(city);
    });
  });

  const inputCity = document.querySelector(".main-screen__input");
  inputCity.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const newCity = inputCity.value;
      renderDetailView(newCity);
    }
  });
}

function backgroundCards(elm) {
  const conditionElm = elm.querySelector(".city-card__footer__condition");
  const isDay = Number(conditionElm.getAttribute("data-isDay"));
  setBackgroundImg(conditionElm.innerHTML, isDay, elm);

  console.log(isDay);
}
