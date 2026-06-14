import {
  cityName,
  conditionImg,
  currCondition,
  feelLike,
  forecastday,
  forecastHour,
  getFutureDates,
  getFutureWetherData,
  getWetherData,
  humidity,
  isDay,
  maxTemp,
  maxWind,
  minTemp,
  rainChance,
  snowChance,
  uvFactor,
  windDir,
} from "./api";
import regenDay from "./assets/conditionImages/day/regen.jpg";
import sonnigDay from "./assets/conditionImages/day/sunny.jpg";
import schneeDay from "./assets/conditionImages/day/schnee.jpg";
import bewoelktDay from "./assets/conditionImages/day/cloudy.jpg";
import defaultDay from "./assets/conditionImages/day/default.jpg";

import regenNight from "./assets/conditionImages/night/regen.jpg";
import schneeNight from "./assets/conditionImages/night/schnee.jpg";
import bewoelktNight from "./assets/conditionImages/night/cloudy.jpg";
import defaultNight from "./assets/conditionImages/night/default.jpg";

export function getCurrentInfo() {
  const currInfoContainer = document.querySelector(".main__current-info");
  // const currCondition = "Teilweise bewölkt";
  setBackgroundImg();

  let html = "";

  html = `

          <p class="current-info__city-name">${cityName}</p>
          <p class="current-info__temperature">
            ${maxTemp}<span class="span--deg">&deg;C</span>
          </p>
          <p class="current-info__wether-status">${currCondition}</p>
          <p class="current-info__average-temperatur">
            H:${maxTemp}<span class="span--deg">&deg;C</span>---T:${minTemp}<span
              class="span--deg"
              >&deg;C</span
            >
          </p>

  `;

  currInfoContainer.innerHTML = html;
}
export function getDailyForecast() {
  const dailyOverviewCard = document.querySelector(".daily-info__card");
  const dailyOverviewBox = document.querySelector(".daily-info__today");

  dailyOverviewBox.textContent = `${currCondition}, Wind bis zu ${maxWind}km/h`;
  let html = "";
  for (let i = new Date().getHours(); i < forecastHour.length; i++) {
    html += `
   <div class="card">
              <p class="card__hour">${new Date(forecastHour[i].time).getHours()} Uhr</p>
              <img class="card__img" src="${forecastHour[i].condition.icon}" alt="s" />
              <p class="card__temperature">
                ${forecastHour[i].temp_c}<span class="span--deg">&deg;C</span>
              </p>
            </div>
  
  
  `;
    dailyOverviewCard.innerHTML = html;
  }
}

function setBackgroundImg() {
  const appContainerEL = document.querySelector(".app");
  const dayTime = isDay === 1;
  if (currCondition.includes("Teilweise bewölkt")) {
    appContainerEL.style.backgroundImage = dayTime
      ? `url(${defaultDay})`
      : `url(${defaultNight})`;
  } else if (["Sonnig", "Klar"].includes(currCondition)) {
    appContainerEL.style.backgroundImage = dayTime
      ? `url(${sonnigDayDay})`
      : `url(${defaultNight})`;
  } else if (["Gewitter", "bedeckt"].includes(currCondition)) {
    appContainerEL.style.backgroundImage = dayTime
      ? `url(${bewoelktDay})`
      : `url(${bewoelktNight})`;
  } else if (currCondition.includes("Schnee")) {
    appContainerEL.style.backgroundImage = dayTime
      ? `url(${schneeDay})`
      : `url(${schneeNight})`;
  } else if (currCondition.includes("Regen")) {
    appContainerEL.style.backgroundImage = dayTime
      ? `url(${regenDay})`
      : `url(${regenNight})`;
  } else {
    appContainerEL.style.backgroundImage = `url(${defaultDay})`;
  }
}

export async function forecastThreeDays() {
  const forecastContainerEL = document.querySelector(".forecast__days");

  let html = "";

  for (let i = 0; i < 3; i++) {
    1;
    const newDateEL = await getFutureWetherData(getFutureDates(i));
    console.log(newDateEL);
    html += `

<div class="forecast__card">
              <p class="forecast__day">${new Date(newDateEL.forecast.forecastday[0].date).toLocaleDateString("de-DE", { weekday: "short" })}</p>
              <img src="${newDateEL.forecast.forecastday[0].day.condition.icon}" alt="s" class="card__img" />
              <p class="forecast__average-temp">
                <span
                  class="forecast__average-temp forecast__average-temp--heigh"
                  >H:${newDateEL.forecast.forecastday[0].day.maxtemp_c}&deg;C</span
                >
                <span class="forecast__average-temp forecast__average-temp--low"
                  >T:${newDateEL.forecast.forecastday[0].day.mintemp_c}&deg;C</span
                >
              </p>
              <p class="forecast__wind">Wind: ${newDateEL.forecast.forecastday[0].day.maxwind_kph} Km/h</p>
            </div>

`;

    forecastContainerEL.innerHTML = html;
  }
}

export function getAdditionalInfo() {
  const additionalContainerEl = document.querySelector(".main__additional");

  const additionalData = {
    rainChance: { value: ` ${rainChance}&percnt;`, name: "Chance auf Regen" },

    wind: { value: windDir, name: "Windrichtung" },
    snowChance: {
      value: `${snowChance}&percnt; `,
      name: "Chance auf Schnee",
    },
    humidity: { value: `${humidity}&percnt;`, name: "Luftfeuchtigkeit" },

    feelLike: { value: `${feelLike}&deg;C`, name: "gefühlt" },
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
