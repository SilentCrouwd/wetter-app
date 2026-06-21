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
  console.log(cityObjArr);
  favoritBtnEl.classList.add("hidden");
}

export function deleteCity(index) {
  const cityArray = getLocalStorage();
  //nach dem data-Parameter suchen (city)
  const CityCardsEl = document.querySelectorAll(".city-card");

  const cityToDel = CityCardsEl[index].getAttribute("data-city");

  const result = cityArray.name.filter(
    (city) => city.toUpperCase() !== cityToDel.toLocaleUpperCase(),
  );

  setLocalStorage(result);
}

export async function fillSearch(input) {
  let html = "";
  const citySearch = await serchApi(input);
  const inputCity = document.querySelector(".city-search__list");
  console.log(citySearch);

  citySearch.forEach((element) => {
    html += `
      <li class="city-search__value" data-cityId="${element.id}" >${element.name}</li>
  `;
  });
  inputCity.innerHTML = html;
}
