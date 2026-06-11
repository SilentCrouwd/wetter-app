import {
  cityName,
  conditionImg,
  currCondition,
  forecastHour,
  getWetherData,
  isDay,
  maxTemp,
  maxWind,
  minTemp,
} from "./api";

export function getCurrentInfo() {
  const currInfoContainer = document.querySelector(".main__current-info");
  // const currCondition = "Teilweise bewölkt";
  setBackgroundImg();

  let html = "";

  html = `

          <p class="current-info__city-name">${cityName}</p>
          <p class="current-info__temperature">
            ${maxTemp}<span class="span--deg">&deg;</span>
          </p>
          <p class="current-info__wether-status">${currCondition}</p>
          <p class="current-info__average-temperatur">
            H:${maxTemp}<span class="span--deg">&deg;</span>---T:${minTemp}<span
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

  dailyOverviewBox.textContent = `${currCondition}, Wind bis zu ${maxWind}km/h`;
  let html = "";
  for (let i = new Date().getHours(); i < forecastHour.length; i++) {
    html += `
   <div class="card">
              <p class="card__hour">${new Date(forecastHour[i].time).getHours()} Uhr</p>
              <img class="card__img" src="${forecastHour[i].condition.icon}" alt="s" />
              <p class="card__temperature">
                ${forecastHour[i].temp_c}<span class="span--deg">&deg;</span>
              </p>
            </div>
  
  
  `;
    dailyOverviewCard.innerHTML = html;
  }
}

function setBackgroundImg() {
  const appContainerEL = document.querySelector(".app");

  let path = "";
  if (isDay) {
    path = "day";
    console.log(path);
  } else {
    path = "night";
    console.log(path);
  }

  if (currCondition.includes("Teilweise bewölkt")) {
    appContainerEL.style.backgroundImage = ` url("wetter-app/src/assets/conditionImages/${path}/default.jpg")`;
  } else if (["Sonnig", "Klar"].includes(currCondition)) {
    appContainerEL.style.backgroundImage = ` url("wetter-app/src/assets/conditionImages/${path}/sunny.jpg")`;
  } else if (["Gewitter", "bedeckt"].includes(currCondition)) {
    appContainerEL.style.backgroundImage = ` url("wetter-app/src/assets/conditionImages/${path}/cloudy.jpg")`;
  } else if (currCondition.includes("Schnee")) {
    appContainerEL.style.backgroundImage = ` url("wetter-app/src/assets/conditionImages/${path}/schnee.jpg")`;
  } else if (currCondition.includes("Regen")) {
    appContainerEL.style.backgroundImage = ` url("wetter-app/src/assets/conditionImages/${path}/regen.jpg")`;
  } else {
    appContainerEL.style.backgroundImage = ` url("wetter-app/src/assets/conditionImages/${path}/default.jpg")`;
  }
}
