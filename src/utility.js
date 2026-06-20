import { getLocalStorage, serchApi, setLocalStorage } from "./api";
import { renderDetailView } from "./detailview";

export function checkExist(cityInput) {
  const newCityArr = getLocalStorage();

  const exist = newCityArr.some(
    (city) => city.toUpperCase() === cityInput.toUpperCase(),
  );

  const favoritBtnEl = document.querySelector(".btn--favorit");

  exist
    ? favoritBtnEl.classList.add("hidden")
    : favoritBtnEl.classList.remove("hidden");
}
export function pushNewCity(newCity) {
  const favoritBtnEl = document.querySelector(".btn--favorit");
  let newCityArr = getLocalStorage();

  newCityArr.push(newCity);
  setLocalStorage(newCityArr);
  favoritBtnEl.classList.add("hidden");
}

export function deleteCity(index) {
  const cityArray = getLocalStorage();
  //nach dem data-Parameter suchen (city)
  const CityCardsEl = document.querySelectorAll(".city-card");

  const cityToDel = CityCardsEl[index].getAttribute("data-city");

  const result = cityArray.filter(
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
      <li class="city-search__value" >${element.name}</li>
  `;
  });
  inputCity.innerHTML = html;
}
