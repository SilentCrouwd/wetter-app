import { getLocalStorage, setLocalStorage } from "./api";
import { renderDetailView } from "./detailview";

export function checkExist(cityInput) {
  const newCityArr = getLocalStorage();

  const exist = newCityArr.some(
    (city) => city.toLowerCase() === cityInput.toLowerCase(),
  );

  console.log(newCityArr);
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
