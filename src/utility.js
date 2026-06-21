import { getLocalStorage, serchApi, setLocalStorage } from "./api";
import { renderDetailView } from "./detailview";

export function checkExist(cityObj) {
  const { id } = cityObj;
  const cityObjArr = getLocalStorage();

  const exist = cityObjArr.some((city) => city.id === id);

  const favoritBtnEl = document.querySelector(".btn--favorit");

  exist
    ? favoritBtnEl.classList.add("hidden")
    : favoritBtnEl.classList.remove("hidden");
}
export function pushNewCity(cityObj) {
  const favoritBtnEl = document.querySelector(".btn--favorit");
  let cityObjArr = getLocalStorage();
  cityObjArr.push(cityObj);
  setLocalStorage(cityObjArr);

  favoritBtnEl.classList.add("hidden");
}

export function deleteCity(cityObj) {
  const cityArray = getLocalStorage();

  const result = cityArray.filter((city) => {
    return city.id !== cityObj.id;
  });
  setLocalStorage(result);
}

export async function fillSearch(input) {
  let html = "";
  const citySearch = await serchApi(input);
  const inputCity = document.querySelector(".city-search__list");

  citySearch.forEach((element) => {
    html += `
      <li class="city-search__value" data-cityId="${element.id}" >${element.name}</li>
  <li class="city-search__country" >${element.region}</li>
      `;
  });
  inputCity.innerHTML = html;
}
