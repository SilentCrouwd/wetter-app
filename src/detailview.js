import { getWetherData } from "./api";

export async function getCurrentInfo() {
  const currWetherData = await getWetherData();

  const currInfoContainer = document.querySelector(".main__current-info");
  let html = "";

  html = `

          <p class="current-info__city-name">${currWetherData.location.name}</p>
          <p class="current-info__temperature">
            ${currWetherData.current.temp_c}<span class="span--deg">&deg;</span>
          </p>
          <p class="current-info__wether-status">${currWetherData.current.condition.text}</p>
          <p class="current-info__average-temperatur">
            H:${currWetherData.current.heatindex_c}<span class="span--deg">&deg;</span>---T:${currWetherData.current.dewpoint_c}<span
              class="span--deg"
              >&deg;</span
            >
          </p>

  `;

  currInfoContainer.innerHTML = html;
}
