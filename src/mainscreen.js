import {
  getLocalStorage,
  getWetherData,
  serchApi,
  setLocalStorage,
} from "./api";
import {
  loadingSpinner,
  renderDetailView,
  setBackgroundImg,
} from "./detailview";
import { checkExist, deleteCity, fillSearch } from "./utility";

export async function InitApp() {
  const appContainerEl = document.querySelector(".app");

  appContainerEl.innerHTML = getMainContent();

  const cityContainerEl = document.querySelector(
    ".main-screen__city-container",
  );

  loadingSpinner(cityContainerEl, "Lade daten für Übersicht...");
  await new Promise((resolve) => setTimeout(resolve, 100));
  const cityArr = getLocalStorage();
  try {
    cityContainerEl.innerHTML = "";

    await renderCityCards(cityArr);
  } catch (error) {
    // console.error("Error: " + error);
  } finally {
    applyListeners();
  }
}

export async function renderCityCards(cityArr) {
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
        <search>
        <input
        name="cityserch"
          class="main-screen__input"
          type="search"
          autocomplete="off"
          placeholder="Nach Stadt Suchen"
        />
        <ul class="searchList">
        <li></li>
        </ul>
        </search>
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
<div class="city-wrapper hidden">
        <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          class="svg svg--delete"
          viewBox="0 0 24 24"
        >
          <path
            d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M16,10V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V10H16M13.5,6L14.5,7H17V9H7V7H9.5L10.5,6H13.5Z"
          />
        </svg>
      </div>
      <div class="city-card" data-city="${city}">
        <div class="city-card__header">
          <div class="city-card__header city-card__header--left">
            <p class="city-card__header__city">${city}</p>
            <p class="city-card__header__country">${country}</p>
          </div>
          <p class="city-card__header__temp">${Math.floor(currTemp)}&deg;C</p>
        </div>
        <div class="city-card__footer">
          <p class="city-card__footer__condition" data-isDay="${isDay}">
            ${crurrCondition}
          </p>
          <p class="city-card__footer__average-temp">
            <span class="average-temp--max">H${Math.floor(maxTemp)}&deg;C </span
            ><span class="average-temp--min"
              >T${Math.floor(minTemp)}&deg;C</span
            >
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
  inputCity.addEventListener("keyup", () => {
    const newCity = inputCity.value;
    fillSearch(newCity);
  });

  const editBtnEl = document.querySelector(".btn--edit");

  editBtnEl.addEventListener("click", () => {
    const delelteBtnEl = document.querySelectorAll(".city-wrapper");
    const mainCityContainer = document.querySelector(
      ".main-screen__city-container",
    );
    if (editBtnEl.innerHTML === "Bearbeiten") {
      editBtnEl.innerHTML = "Fertig";
    } else {
      editBtnEl.innerHTML = "Bearbeiten";
    }
    mainCityContainer.classList.toggle("showDelete");
    delelteBtnEl.forEach((elm) => {
      elm.classList.toggle("hidden");
    });
  });
  const deleteBtnEl = document.querySelectorAll(".svg--delete");
  deleteBtnEl.forEach((delBtn, index) => {
    delBtn.addEventListener("click", async () => {
      deleteCity(index);
      InitApp();
    });
  });
}

function backgroundCards(elm) {
  const conditionElm = elm.querySelector(".city-card__footer__condition");
  const isDay = Number(conditionElm.getAttribute("data-isDay"));
  setBackgroundImg(conditionElm.innerHTML, isDay, elm);
}

//serch andere api /serch https://api.weatherapi.com/v1/fsearch.json?key=86a979bdd40a47c6b58140058260806&q=salz
// liste soll beim raus klicken verschwinden im input wenn wieder rein dann wider angezeigt
//Stadt über Id einlesen nicht mehr über Namen
//debouncing warten bis fertig mit tippen
