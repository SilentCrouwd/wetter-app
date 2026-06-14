import { getWetherData } from "./api";
import regenDay from "./assets/conditionImages/day/regen.jpg";
import sonnigDay from "./assets/conditionImages/day/sunny.jpg";
import schneeDay from "./assets/conditionImages/day/schnee.jpg";
import bewoelktDay from "./assets/conditionImages/day/cloudy.jpg";
import defaultDay from "./assets/conditionImages/day/default.jpg";

import regenNight from "./assets/conditionImages/night/regen.jpg";
import schneeNight from "./assets/conditionImages/night/schnee.jpg";
import bewoelktNight from "./assets/conditionImages/night/cloudy.jpg";
import defaultNight from "./assets/conditionImages/night/default.jpg";

export async function renderDetailView(city) {
  loadingSpinner("Lade Daten von" + city + "...");
  const wetherData = await getWetherData(city);
  const { current, forecast, location } = wetherData;
  const currForecast = forecast.forecastday[0];
  getAppContent();
  getCurrentInfo(
    location.name,
    current.temp_c,
    current.condition.text,
    currForecast.day.maxtemp_c,
    currForecast.day.mintemp_c,
  );
  setBackgroundImg(current.condition.text, current.is_day);
  getDailyForecast(
    current.condition.text,
    currForecast.day.maxwind_kph,
    currForecast.hour,
  );

  forecastThreeDays(forecast.forecastday);
  getAdditionalInfo(
    current.chance_of_rain,
    current.wind_dir,
    current.chance_of_snow,
    current.humidity,
    current.feelslike_c,
    current.uv,
  );
}
function loadingSpinner(loadingMessage) {
  const appEl = document.querySelector(".app");
  appEl.innerHTML = `
 <div class="ls-spinner__Container"> 
      <p class="lds-spinner--text">${loadingMessage}</p>
          <div class="lds-spinner">
            <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
  </div>
  `;
}
function getAppContent() {
  const appEl = document.querySelector(".app");
  appEl.innerHTML = `
   <div class="header">
        <button class="btn btn--back">
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            class="svg svg--back"
            viewBox="0 0 24 24"
          >
            <path
              d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
            />
          </svg>
        </button>

        <button class="btn btn--favorit">
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            class="svg svg--favorit"
            viewBox="0 0 24 24"
          >
            <path
              d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"
            />
          </svg>
        </button>
      </div>

      <div class="main">
       
        <div class="main__current-info"></div>
        <div class="main__daily-info">
          <p class="daily-info__today"></p>

          <div class="daily-info__card"></div>
        </div>

        <div class="main__forecast">
          <p class="forecast__headline">Vorhersage für die nächsten 3 Tage:</p>
          <div class="forecast__days"></div>
        </div>
        <div class="main__additional"></div>
      </div>
  `;
}
function getCurrentInfo(cityName, temp, currCondition, maxTemp, minTemp) {
  const currInfoContainer = document.querySelector(".main__current-info");

  let html = "";

  html = `

          <p class="current-info__city-name">${cityName}</p>
          <p class="current-info__temperature">
            ${Math.floor(temp)}<span class="span--deg">&deg;C</span>
          </p>
          <p class="current-info__wether-status">${currCondition}</p>
          <p class="current-info__average-temperatur">
            H:${Math.floor(maxTemp)}<span class="span--deg">&deg;C</span>---T:${Math.floor(minTemp)}<span
              class="span--deg"
              >&deg;C</span
            >
          </p>

  `;

  currInfoContainer.innerHTML = html;
}
function getDailyForecast(condition, maxWind, forecastHour) {
  const dailyOverviewCard = document.querySelector(".daily-info__card");
  const dailyOverviewBox = document.querySelector(".daily-info__today");

  dailyOverviewBox.textContent = `${condition}, Wind bis zu ${maxWind}km/h`;
  let html = "";
  for (let i = new Date().getHours(); i < forecastHour.length; i++) {
    html += `
   <div class="card">
              <p class="card__hour">${i === new Date().getHours() ? "jetzt" : new Date(forecastHour[i].time).getHours() + "uhr"} </p>
              <img class="card__img" src="${forecastHour[i].condition.icon}" alt="s" />
              <p class="card__temperature">
                ${Math.floor(forecastHour[i].temp_c)}<span class="span--deg">&deg;C</span>
              </p>
            </div>

  `;
    dailyOverviewCard.innerHTML = html;
  }
}

function setBackgroundImg(condition, isDay) {
  const formatedCondition = condition.toLowerCase();
  const appContainerEL = document.querySelector(".app");
  const dayTime = isDay === 1;
  if (
    formatedCondition.includes("bewölkt") ||
    formatedCondition.includes("bedeckt")
  ) {
    appContainerEL.style.backgroundImage = dayTime
      ? `url(${defaultDay})`
      : `url(${defaultNight})`;
  } else if (
    formatedCondition.includes("klar") ||
    formatedCondition.includes("sonnig")
  ) {
    appContainerEL.style.backgroundImage = dayTime
      ? `url(${sonnigDayDay})`
      : `url(${defaultNight})`;
  } else if (formatedCondition.includes("gewitter")) {
    appContainerEL.style.backgroundImage = dayTime
      ? `url(${bewoelktDay})`
      : `url(${bewoelktNight})`;
  } else if (formatedCondition.includes("schnee")) {
    appContainerEL.style.backgroundImage = dayTime
      ? `url(${schneeDay})`
      : `url(${schneeNight})`;
  } else if (
    formatedCondition.includes("regen") ||
    formatedCondition.includes("niesel")
  ) {
    appContainerEL.style.backgroundImage = dayTime
      ? `url(${regenDay})`
      : `url(${regenNight})`;
  } else {
    appContainerEL.style.backgroundImage = `url(${defaultDay})`;
  }
}

function forecastThreeDays(dayForecast) {
  const forecastContainerEL = document.querySelector(".forecast__days");

  let html = "";
  dayForecast.forEach((elm) => {
    html += `

<div class="forecast__card">
              <p class="forecast__day">${new Date(elm.date).toLocaleDateString("de-DE", { weekday: "short" })}</p>
              <img src="${elm.day.condition.icon}" alt="s" class="card__img" />
              <p class="forecast__average-temp">
                <span
                  class="forecast__average-temp forecast__average-temp--heigh"
                  >H:${Math.floor(elm.day.maxtemp_c)}&deg;C</span
                >
                <span class="forecast__average-temp forecast__average-temp--low"
                  >T:${Math.floor(elm.day.mintemp_c)}&deg;C</span
                >
              </p>
              <p class="forecast__wind">Wind: ${elm.day.maxwind_kph} Km/h</p>
            </div>

`;
  });
  forecastContainerEL.innerHTML = html;
}

function getAdditionalInfo(
  rainChance,
  windDir,
  snowChance,
  humidity,
  feelLike,
  uvFactor,
) {
  const additionalContainerEl = document.querySelector(".main__additional");

  const additionalData = {
    rainChance: { value: ` ${rainChance}&percnt;`, name: "Chance auf Regen" },

    wind: { value: windDir, name: "Windrichtung" },
    snowChance: {
      value: `${snowChance}&percnt; `,
      name: "Chance auf Schnee",
    },
    humidity: { value: `${humidity}&percnt;`, name: "Luftfeuchtigkeit" },

    feelLike: { value: `${Math.floor(feelLike)}&deg;C`, name: "gefühlt" },
    uvFactor: { value: uvFactor, name: "UV Factor" },
  };

  let html = "";

  Object.values(additionalData).forEach((elm) => {
    html += `
   <div class="additional">
              <p class="additional__headline">${elm.name}</p>
              <p class="additional__body">
                <span class="additional__body--value">${elm.value} </span>
              </p>
            </div>
  `;

    additionalContainerEl.innerHTML = html;
  });
}
