import {
  cityName,
  conditionImg,
  currCondition,
  forecastHour,
  getTimeHour,
  getWetherData,
  maxTemp,
  maxWind,
  minTemp,
} from "./api";

export function getCurrentInfo() {
  const currInfoContainer = document.querySelector(".main__current-info");
  const appContainerEL = document.querySelector(".app");

  // Hier noch variable übergeben und automatisch bild setzen

  appContainerEL.style.backgroundImage = ` url("wetter-app/src/assets/conditionImages/day/${currCondition.replace(/\s+/g, "")}.jpg")`;

  let html = "";

  html = `

          <p class="current-info__city-name">${cityName}</p>
          <p class="current-info__temperature">
            ${maxTemp}<span class="span--deg">&deg;</span>
          </p>
          <p class="current-info__wether-status">${currCondition}</p>
          <p class="current-info__average-temperatur">
            H:${minTemp}<span class="span--deg">&deg;</span>---T:${minTemp}<span
              class="span--deg"
              >&deg;</span
            >
          </p>

  `;

  currInfoContainer.innerHTML = html;
}
export function getDailyForecast() {
  const dailyOverviewCard = document.querySelector(".daily-info__card");
  const dailyOverviewBox = document.querySelector(".daily-info__today");

  const forecastHours = getTimeHour();

  dailyOverviewBox.textContent = `${currCondition}, Wind bis zu ${maxWind}km/h`;
  let html = "";

  forecastHour.forEach((element, index) => {
    html += `
   <div class="card">
              <p class="card__hour">${forecastHours[index]} Uhr</p>
              <img class="card__img" src="${element.condition.icon}" alt="s" />
              <p class="card__temperature">
                ${element.temp_c}<span class="span--deg">&deg;</span>
              </p>
            </div>
  
  
  `;
    dailyOverviewCard.innerHTML = html;
  });
}

function formatTime() {}
